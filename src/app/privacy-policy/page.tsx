import type { Metadata } from "next";
import Link from "next/link";

import { SITE_AUTHOR } from "@/seo/author";
import { SITE_URL } from "@/constants";

export const metadata: Metadata = {
  title: {
    absolute: "Privacy Policy — PDF to Image Converter",
  },
  description:
    "How ReduceImageSize handles PDFs: browser-based conversion, no server storage of your files during convert, and how site analytics works.",
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy — PDF to Image Converter",
    description:
      "Plain-English privacy details: local PDF conversion, what we do not store, and analytics.",
    url: `${SITE_URL}/privacy-policy`,
    siteName: "ReduceImageSize",
    images: [`${SITE_URL}/og-image.png`],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy — PDF to Image Converter",
    description:
      "Plain-English privacy details: local PDF conversion, what we do not store, and analytics.",
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="home-page" style={{ padding: "48px 24px 80px" }}>
      <article className="home-content" style={{ paddingTop: 0 }}>
        <h1 style={{ fontFamily: "var(--font-home-display), Georgia, serif" }}>Privacy Policy</h1>
        <p className="home-meta-line">Last updated: July 26, 2026</p>

        <h2>How files are processed</h2>
        <p>
          When you convert a PDF on this site, the file is read and rendered in your browser. The
          conversion step is designed to stay on your device.
        </p>

        <h2>Do we upload your PDF?</h2>
        <p>
          No. The converter does not send your PDF to our servers for processing. If that ever
          changes for a specific feature, this page will say so before the feature ships.
        </p>

        <h2>Do we store your files?</h2>
        <p>
          We do not keep a library of converted PDFs or images from the converter. Temporary image
          previews live in your browser session. Closing the tab clears that working state.
        </p>

        <h2>How long do files exist on our side?</h2>
        <p>
          For standard conversion: they do not. There is no server-side file retention step in the
          current tool.
        </p>

        <h2>Analytics</h2>
        <p>
          We may use Google Analytics to understand traffic (pages viewed, device type, approximate
          region). Analytics is about site usage, not the contents of your PDF.
        </p>

        <h2>Contact</h2>
        <p>
          Privacy questions:{" "}
          <a href={`mailto:${SITE_AUTHOR.email}`}>{SITE_AUTHOR.email}</a>
          <br />
          Product home: <Link href="/">PDF to Image Converter</Link>
        </p>
      </article>
    </main>
  );
}
