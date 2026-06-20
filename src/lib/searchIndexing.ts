import { SITE_URL } from "@/constants";
import {
  getAllIndexableUrls,
  getIndexNowKeyLocation,
  getSitemapUrl,
  INDEXNOW_KEY,
} from "@/lib/indexableUrls";

type SubmitResult = {
  totalUrls: number;
  sitemapPing: { google: string; bing: string };
  indexNow: { ok: boolean; status: number; message: string };
  googleIndexingApi?: { submitted: number; skipped: boolean; message: string };
};

async function pingSitemap(endpoint: string) {
  const sitemapUrl = encodeURIComponent(getSitemapUrl());
  const response = await fetch(`${endpoint}${sitemapUrl}`, { method: "GET" });
  return `${response.status} ${response.statusText}`;
}

export async function submitAllPagesForIndexing(): Promise<SubmitResult> {
  const urls = getAllIndexableUrls().map((entry) => entry.url);
  const host = new URL(SITE_URL).host;

  const [googlePing, bingPing] = await Promise.all([
    pingSitemap("https://www.google.com/ping?sitemap="),
    pingSitemap("https://www.bing.com/ping?sitemap="),
  ]);

  const indexNowResponse = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host,
      key: INDEXNOW_KEY,
      keyLocation: getIndexNowKeyLocation(),
      urlList: urls,
    }),
  });

  const indexNowMessage = indexNowResponse.ok
    ? `Submitted ${urls.length} URLs`
    : await indexNowResponse.text().catch(() => indexNowResponse.statusText);

  let googleIndexingApi: SubmitResult["googleIndexingApi"];

  const credentialsJson = process.env.GOOGLE_INDEXING_CREDENTIALS_JSON;
  if (credentialsJson) {
    try {
      googleIndexingApi = await submitGoogleIndexingApi(urls, credentialsJson);
    } catch (error) {
      googleIndexingApi = {
        submitted: 0,
        skipped: false,
        message: error instanceof Error ? error.message : "Google Indexing API failed",
      };
    }
  } else {
    googleIndexingApi = {
      submitted: 0,
      skipped: true,
      message: "Set GOOGLE_INDEXING_CREDENTIALS_JSON to enable Google Indexing API",
    };
  }

  return {
    totalUrls: urls.length,
    sitemapPing: { google: googlePing, bing: bingPing },
    indexNow: {
      ok: indexNowResponse.ok,
      status: indexNowResponse.status,
      message: indexNowMessage,
    },
    googleIndexingApi,
  };
}

async function getGoogleAccessToken(credentialsJson: string) {
  const credentials = JSON.parse(credentialsJson) as {
    client_email: string;
    private_key: string;
  };

  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
  const claimSet = Buffer.from(
    JSON.stringify({
      iss: credentials.client_email,
      scope: "https://www.googleapis.com/auth/indexing",
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now,
    })
  ).toString("base64url");

  const crypto = await import("crypto");
  const signature = crypto
    .createSign("RSA-SHA256")
    .update(`${header}.${claimSet}`)
    .sign(credentials.private_key, "base64url");

  const jwt = `${header}.${claimSet}.${signature}`;
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!tokenResponse.ok) {
    throw new Error(`Token exchange failed: ${tokenResponse.status}`);
  }

  const tokenPayload = (await tokenResponse.json()) as { access_token: string };
  return tokenPayload.access_token;
}

async function submitGoogleIndexingApi(urls: string[], credentialsJson: string) {
  const accessToken = await getGoogleAccessToken(credentialsJson);
  let submitted = 0;

  for (const url of urls) {
    const response = await fetch("https://indexing.googleapis.com/v3/urlNotifications:publish", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url, type: "URL_UPDATED" }),
    });

    if (response.ok) {
      submitted += 1;
    }

    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  return {
    submitted,
    skipped: false,
    message: `Submitted ${submitted}/${urls.length} URLs via Google Indexing API`,
  };
}
