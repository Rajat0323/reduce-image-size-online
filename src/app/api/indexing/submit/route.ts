import { NextResponse } from "next/server";

import { submitAllPagesForIndexing } from "@/lib/searchIndexing";

export async function POST(request: Request) {
  const secret = process.env.INDEXING_SUBMIT_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "INDEXING_SUBMIT_SECRET is not configured on the server." },
      { status: 503 }
    );
  }

  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await submitAllPagesForIndexing();
  return NextResponse.json(result);
}

export async function GET() {
  return NextResponse.json({
    message: "POST with Authorization: Bearer <INDEXING_SUBMIT_SECRET> to submit all pages for indexing.",
  });
}
