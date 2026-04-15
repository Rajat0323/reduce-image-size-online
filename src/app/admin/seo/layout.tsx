import { redirect } from "next/navigation";

import { isAdminAuthConfigured, isAdminAuthenticated } from "@/lib/adminAuth";

export default function SeoAdminLayout({ children }: { children: React.ReactNode }) {
  if (!isAdminAuthConfigured()) {
    redirect("/admin/login?error=config");
  }

  if (!isAdminAuthenticated()) {
    redirect("/admin/login?next=/admin/seo");
  }

  return <>{children}</>;
}
