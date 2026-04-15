import { redirect } from "next/navigation";

import { isAdminAuthConfigured, isAdminAuthenticated } from "@/lib/adminAuth";

type Props = {
  searchParams?: {
    error?: string;
    next?: string;
  };
};

const errorMessages: Record<string, string> = {
  invalid: "That password did not match the admin password. Please try again.",
  config: "Admin protection is enabled in code, but the dashboard password is not configured yet.",
};

export const metadata = {
  title: "Admin Login",
  description: "Protected login for the ReduceImageSizeOnline SEO dashboard.",
};

export default function AdminLoginPage({ searchParams }: Props) {
  if (isAdminAuthenticated()) {
    redirect("/admin/seo");
  }

  const nextPath = searchParams?.next?.startsWith("/admin") ? searchParams.next : "/admin/seo";
  const errorMessage = searchParams?.error ? errorMessages[searchParams.error] : "";

  return (
    <main className="blog-shell landing">
      <div className="section-content blog-stack">
        <section className="blog-hero-card admin-login-card">
          <div className="blog-hero-copy">
            <span className="eyebrow-link">Protected area</span>
            <h1 className="blog-title">Admin dashboard login</h1>
            <p className="blog-summary">
              Use the private password to unlock your SEO automation dashboard, draft review tools,
              and manual publishing controls.
            </p>
            <div className="blog-chip-row">
              <span className="blog-chip">Protected manual run</span>
              <span className="blog-chip">Draft-first workflow</span>
              <span className="blog-chip">Private review space</span>
            </div>
          </div>

          <div className="blog-card admin-login-form-shell">
            <h2>Sign in</h2>
            <p>
              {isAdminAuthConfigured()
                ? "Enter the dashboard password you set in Vercel."
                : "Add ADMIN_DASHBOARD_PASSWORD and ADMIN_SESSION_SECRET in Vercel to activate admin protection."}
            </p>

            <form action="/api/admin/login" method="POST" className="admin-login-form">
              <input type="hidden" name="next" value={nextPath} />
              <label>
                <span className="field-label">Password</span>
                <input
                  className="tool-input"
                  type="password"
                  name="password"
                  placeholder="Enter admin password"
                  autoComplete="current-password"
                  disabled={!isAdminAuthConfigured()}
                  required
                />
              </label>

              {errorMessage ? <p className="admin-error">{errorMessage}</p> : null}

              <button className="btn btn-primary" type="submit" disabled={!isAdminAuthConfigured()}>
                Unlock dashboard
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
