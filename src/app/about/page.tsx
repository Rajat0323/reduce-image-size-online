import type { Metadata } from "next";
import Link from "next/link";

import { SITE_AUTHOR } from "@/seo/author";
import { SITE_URL } from "@/constants";

export const metadata: Metadata = {
  title: {
    absolute: "About — PDF to Image Converter",
  },
  description:
    "About ReduceImageSize: a focused PDF to image converter for private browser conversion. Built and maintained by Rajat Gupta with clear product limits.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About — PDF to Image Converter",
    description:
      "Why ReduceImageSize exists: one PDF to image tool, browser-local conversion, and clear limits.",
    url: `${SITE_URL}/about`,
    siteName: "ReduceImageSize",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "About ReduceImageSize PDF to image converter",
      },
    ],
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "About — PDF to Image Converter",
    description:
      "Why ReduceImageSize exists: one PDF to image tool, browser-local conversion, and clear limits.",
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function About() {
  return (
    <main className="home-page" style={{ padding: "48px 24px 80px" }}>
      <article className="home-content" style={{ paddingTop: 0 }}>
        <h1 style={{ fontFamily: "var(--font-home-display), Georgia, serif" }}>
          About ReduceImageSize
        </h1>
        <p>
          ReduceImageSize is a small product with one job: convert PDF pages into images you can
          download. It is maintained by {SITE_AUTHOR.name}.
        </p>

        <h2>Why it was created</h2>
        <p>
          Most converter hubs push accounts, ads, or uploads before you get a file back. I wanted
          the opposite: open the page, drop a PDF, get PNG/JPG/WEBP, leave.
        </p>

        <h2>Who maintains it</h2>
        <p>
          I design, build, and update the converter myself. When something breaks, the fix goes into
          the same codebase that runs the homepage tool. Contact:{" "}
          <a href={`mailto:${SITE_AUTHOR.email}`}>{SITE_AUTHOR.email}</a>
        </p>

        <h2>Design philosophy</h2>
        <ul>
          <li>One clear workflow instead of dozens of near-duplicate pages</li>
          <li>Browser-first processing so files stay on your device during conversion</li>
          <li>Plain language about limits — passwords, large scans, flat image output</li>
          <li>Features only when they help PDF → image</li>
        </ul>

        <h2>Privacy-first approach</h2>
        <p>
          Conversion is built to run locally in the browser. Your PDF is not treated as content for
          us to keep. See the <Link href="/privacy-policy">Privacy Policy</Link> for details.
        </p>

        <h2>Continuous improvement</h2>
        <p>
          Updates focus on reliability, clearer controls, and honest documentation. An Ahrefs Site
          Audit of this domain (Health 99, July 2026) is used as a checklist: sitemap URLs must
          return 200, public pages keep short titles and a clear H1, and old tool/blog URLs redirect
          home instead of creating thin indexable pages.
        </p>

        <p>
          <Link href="/">Open the PDF to Image Converter</Link>
        </p>
      </article>
    </main>
  );
}
