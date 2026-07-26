import type { Metadata } from "next";
import Link from "next/link";

import { SITE_AUTHOR } from "@/seo/author";
import { SITE_URL } from "@/constants";

export const metadata: Metadata = {
  title: "About ReduceImageSize",
  description:
    "Why ReduceImageSize exists: a focused, privacy-first PDF to image converter maintained by Rajat Gupta.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About ReduceImageSize",
    description:
      "A focused PDF to image converter built for private, browser-based conversion — not a bloated tool directory.",
    url: `${SITE_URL}/about`,
    siteName: "ReduceImageSize",
    type: "profile",
  },
  twitter: {
    card: "summary",
    title: "About ReduceImageSize",
    description:
      "A focused PDF to image converter built for private, browser-based conversion.",
  },
};

export default function About() {
  return (
    <main className="home-page" style={{ padding: "48px 24px 80px" }}>
      <article className="home-content" style={{ paddingTop: 0 }}>
        <h1 style={{ fontFamily: "var(--font-home-display), Georgia, serif" }}>About</h1>
        <p>
          ReduceImageSize is a small product with one job: convert PDF pages into images you can
          download. It is maintained by {SITE_AUTHOR.name}.
        </p>

        <h2>Why it was created</h2>
        <p>
          Most “converter hubs” push you through accounts, ads, or uploads before you get a file
          back. I wanted the opposite: open the page, drop a PDF, get PNG/JPG/WEBP, leave.
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
          <li>Browser-first processing so files stay on the user’s device during conversion</li>
          <li>Plain language about limits — passwords, large scans, flat image output</li>
          <li>Features only when they help PDF → image, not when they pad a directory</li>
        </ul>

        <h2>Privacy-first approach</h2>
        <p>
          Conversion is built to run locally in the browser. Your PDF is not treated as content for
          us to keep. See the <Link href="/privacy-policy">Privacy Policy</Link> for the short
          version in plain English.
        </p>

        <h2>Continuous improvement</h2>
        <p>
          Updates focus on reliability, clearer controls, and honest documentation. If you find a
          broken PDF case or a confusing step, email me and I will reproduce it before changing the
          tool.
        </p>

        <p>
          <Link href="/">Open the PDF to Image Converter</Link>
        </p>
      </article>
    </main>
  );
}
