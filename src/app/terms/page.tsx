import type { Metadata } from "next";
import Link from "next/link";

import { SITE_URL } from "@/constants";

export const metadata: Metadata = {
  title: {
    absolute: "Terms of Service — PDF to Image Converter",
  },
  description:
    "Terms for using the ReduceImageSize PDF to image converter, including acceptable use, liability limits, and how these terms may update.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms of Service — PDF to Image Converter",
    description:
      "Terms for using the ReduceImageSize PDF to image converter, including acceptable use and liability.",
    url: `${SITE_URL}/terms`,
    siteName: "ReduceImageSize",
    images: [`${SITE_URL}/og-image.png`],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service — PDF to Image Converter",
    description:
      "Terms for using the ReduceImageSize PDF to image converter, including acceptable use and liability.",
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function TermsPage() {
  return (
    <main className="home-page" style={{ padding: "48px 24px 80px" }}>
      <article className="home-content" style={{ paddingTop: 0 }}>
        <h1 style={{ fontFamily: "var(--font-home-display), Georgia, serif" }}>
          Terms of Service
        </h1>
        <p className="home-meta-line">Last updated: July 26, 2026</p>

        <p>
          By using ReduceImageSize, you agree to these terms. The site provides a browser-based PDF
          to image converter.
        </p>

        <h2>Use of the service</h2>
        <p>
          You may convert PDF files you have the right to use. Do not use the tool for illegal
          content or to violate someone else’s rights. Conversion runs in your browser; you are
          responsible for the files you process.
        </p>

        <h2>No warranty</h2>
        <p>
          The tool is provided as-is. Output quality depends on the source PDF, your device, and
          the settings you choose. We do not guarantee that every PDF will convert successfully.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          We are not liable for data loss, failed conversions, or damages arising from use of the
          service.
        </p>

        <h2>Changes</h2>
        <p>
          These terms may be updated as the product changes. The date at the top of this page shows
          the latest revision.
        </p>

        <p>
          <Link href="/">Back to PDF to Image Converter</Link>
        </p>
      </article>
    </main>
  );
}
