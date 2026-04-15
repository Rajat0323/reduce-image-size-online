import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/adminAuth";
import { publishAdminSeoArticle, revalidateSeoAdminPages } from "@/lib/seoAdminApi";

type RouteContext = {
  params: {
    slug: string;
  };
};

export async function POST(_: Request, { params }: RouteContext) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ detail: "Admin login required" }, { status: 401 });
  }

  try {
    const article = await publishAdminSeoArticle(params.slug);
    revalidateSeoAdminPages(article.slug);
    return NextResponse.json(article);
  } catch (error) {
    return NextResponse.json(
      { detail: error instanceof Error ? error.message : "Publishing failed." },
      { status: 500 }
    );
  }
}
