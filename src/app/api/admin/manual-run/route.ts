import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/adminAuth";
import { revalidateSeoAdminPages, runAdminSeoPipeline } from "@/lib/seoAdminApi";

export async function POST(request: Request) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ detail: "Admin login required" }, { status: 401 });
  }

  try {
    const payload = await request.json();
    const response = await runAdminSeoPipeline(payload);

    response.published_articles.forEach((article) => {
      revalidateSeoAdminPages(article.slug);
    });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { detail: error instanceof Error ? error.message : "Manual pipeline failed." },
      { status: 500 }
    );
  }
}
