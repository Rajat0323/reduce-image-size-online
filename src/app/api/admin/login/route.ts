import { NextResponse } from "next/server";

import {
  createAdminSessionCookie,
  getSafeAdminRedirectPath,
  isAdminAuthConfigured,
  verifyAdminPassword,
} from "@/lib/adminAuth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const password = String(formData.get("password") || "");
  const nextPath = getSafeAdminRedirectPath(String(formData.get("next") || "/admin/seo"));
  const redirectUrl = new URL(nextPath, request.url);

  if (!isAdminAuthConfigured()) {
    redirectUrl.pathname = "/admin/login";
    redirectUrl.searchParams.set("error", "config");
    return NextResponse.redirect(redirectUrl);
  }

  if (!verifyAdminPassword(password)) {
    redirectUrl.pathname = "/admin/login";
    redirectUrl.searchParams.set("error", "invalid");
    redirectUrl.searchParams.set("next", nextPath);
    return NextResponse.redirect(redirectUrl);
  }

  const sessionCookie = createAdminSessionCookie();
  const response = NextResponse.redirect(redirectUrl);
  response.cookies.set({
    name: sessionCookie.name,
    value: sessionCookie.value,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: sessionCookie.expires,
    path: "/",
  });

  return response;
}
