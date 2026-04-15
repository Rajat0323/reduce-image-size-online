import "server-only";

import crypto from "crypto";

import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "seo_admin_session";

const SESSION_DURATION_MS = 1000 * 60 * 60 * 12;

function getDashboardPassword() {
  return process.env.ADMIN_DASHBOARD_PASSWORD || "";
}

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || "";
}

function createSignature(payload: string) {
  return crypto.createHmac("sha256", getSessionSecret()).update(payload).digest("hex");
}

export function isAdminAuthConfigured() {
  return Boolean(getDashboardPassword() && getSessionSecret());
}

export function verifyAdminPassword(password: string) {
  const expected = getDashboardPassword();
  if (!expected) {
    return false;
  }

  const providedBuffer = Buffer.from(password);
  const expectedBuffer = Buffer.from(expected);

  if (providedBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(providedBuffer, expectedBuffer);
}

export function createAdminSessionCookie() {
  const expiresAt = Date.now() + SESSION_DURATION_MS;
  const payload = `admin.${expiresAt}`;
  const signature = createSignature(payload);

  return {
    name: ADMIN_SESSION_COOKIE,
    value: `${payload}.${signature}`,
    expires: new Date(expiresAt),
  };
}

export function clearAdminSessionCookie() {
  return {
    name: ADMIN_SESSION_COOKIE,
    value: "",
    expires: new Date(0),
  };
}

export function verifyAdminSessionValue(value: string | undefined) {
  if (!value || !getSessionSecret()) {
    return false;
  }

  const [scope, expiresAtRaw, signature] = value.split(".");
  if (scope !== "admin" || !expiresAtRaw || !signature) {
    return false;
  }

  const payload = `${scope}.${expiresAtRaw}`;
  const expectedSignature = createSignature(payload);
  const providedBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (providedBuffer.length !== expectedBuffer.length) {
    return false;
  }

  if (!crypto.timingSafeEqual(providedBuffer, expectedBuffer)) {
    return false;
  }

  return Number(expiresAtRaw) > Date.now();
}

export function getSafeAdminRedirectPath(value: string | null) {
  if (!value || !value.startsWith("/admin")) {
    return "/admin/seo";
  }

  return value;
}

export function isAdminAuthenticated() {
  if (!isAdminAuthConfigured()) {
    return false;
  }

  const cookieStore = cookies();
  return verifyAdminSessionValue(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);
}
