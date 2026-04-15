import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/adminAuth";
import { revalidateSeoAdminPages, syncAdminSeoRankings } from "@/lib/seoAdminApi";

export async function POST() {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ detail: "Admin login required" }, { status: 401 });
  }

  try {
    const response = await syncAdminSeoRankings();
    revalidateSeoAdminPages();
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { detail: error instanceof Error ? error.message : "Ranking sync failed." },
      { status: 500 }
    );
  }
}
