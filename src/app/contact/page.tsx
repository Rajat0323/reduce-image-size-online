import type { Metadata } from "next";
import Link from "next/link";

import { SITE_AUTHOR } from "@/seo/author";
import { SITE_URL } from "@/constants";

export const metadata: Metadata = {
  title: {
    absolute: "Contact — PDF to Image Converter",
  },
  description:
    "Contact ReduceImageSize for PDF converter support, privacy questions, or product feedback. Email vivgup64@gmail.com — we reply when we can.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact — PDF to Image Converter",
    description:
      "Reach Rajat Gupta for PDF to image converter support, privacy questions, or product feedback.",
    url: `${SITE_URL}/contact`,
    siteName: "ReduceImageSize",
    images: [`${SITE_URL}/og-image.png`],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact — PDF to Image Converter",
    description:
      "Reach Rajat Gupta for PDF to image converter support, privacy questions, or product feedback.",
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function Contact() {
  return (
    <main className="home-page" style={{ padding: "48px 24px 80px" }}>
      <article className="home-content" style={{ paddingTop: 0 }}>
        <h1 style={{ fontFamily: "var(--font-home-display), Georgia, serif" }}>Contact</h1>
        <p>For support, privacy questions, or product feedback, email:</p>
        <p>
          <a href={`mailto:${SITE_AUTHOR.email}`}>{SITE_AUTHOR.email}</a>
        </p>
        <p>
          Maintainer: <Link href="/about">{SITE_AUTHOR.name}</Link>, {SITE_AUTHOR.jobTitle}
        </p>
        <p>
          <Link href="/">Back to PDF to Image Converter</Link>
        </p>
      </article>
    </main>
  );
}
