import type { Metadata } from "next";
import Link from "next/link";

import { SITE_AUTHOR } from "@/seo/author";

export const metadata: Metadata = {
  title: "About",
  description: "About ReduceImageSize — free PDF to image converter.",
  alternates: {
    canonical: "/about",
  },
};

export default function About() {
  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px" }}>
      <h1>About</h1>
      <p>
        ReduceImageSize is a free browser tool for converting PDF pages to images (PNG, JPG, or
        WEBP). Built by {SITE_AUTHOR.name}.
      </p>
      <p>
        Questions? <Link href="/contact">Contact</Link> · <Link href="/">Open converter</Link>
      </p>
    </main>
  );
}
