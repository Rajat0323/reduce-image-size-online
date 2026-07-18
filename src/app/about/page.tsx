import type { Metadata } from "next";
import Link from "next/link";

import AuthorBio from "@/components/AuthorBio";
import { SITE_AUTHOR } from "@/seo/author";

export const metadata: Metadata = {
  title: "About Rajat Gupta & ReduceImageSize",
  description:
    "Meet Rajat Gupta, founder of ReduceImageSize. Learn about his experience building browser-based image tools for compression, resizing, and format conversion.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Rajat Gupta & ReduceImageSize",
    description:
      "Meet Rajat Gupta, founder of ReduceImageSize — privacy-first image tools built and tested in the browser.",
    url: "https://www.reduceimagesizeonline.com/about",
    siteName: "ReduceImageSize",
    images: ["https://www.reduceimagesizeonline.com/og-image.png"],
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Rajat Gupta & ReduceImageSize",
    description:
      "Meet Rajat Gupta, founder of ReduceImageSize — privacy-first image tools built and tested in the browser.",
    images: ["https://www.reduceimagesizeonline.com/og-image.png"],
  },
};

export default function About() {
  return (
    <main className="blog-shell landing">
      <div className="section-content blog-stack">
        <article className="article-shell">
          <div className="article-copy">
            <h1 className="article-title">About {SITE_AUTHOR.name}</h1>
            <p className="article-summary">{SITE_AUTHOR.bioLong}</p>
          </div>

          <div className="article-prose">
            <h2>Why I built ReduceImageSize</h2>
            <p>
              I kept running into the same problem: a photo looked fine on my phone, but a
              government form, marketplace listing, or job portal rejected it because of file size,
              dimensions, or format. Desktop software worked, but it was slow for quick one-off
              uploads — especially on a laptop I did not have with me.
            </p>
            <p>
              ReduceImageSize started as a personal fix. I wanted tools that run in the browser,
              keep files on your device during editing, and match real upload rules people search
              for every day — compress to 50KB, resize for LinkedIn, convert HEIC from an iPhone,
              and similar tasks.
            </p>

            <h2>Experience you can trust</h2>
            <ul>
              {SITE_AUTHOR.experience.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2>What I write about</h2>
            <p>
              Every blog post and tool guide on this site is tied to a live page you can open and
              test. I do not publish unrelated calculators or filler topics. If a guide mentions
              Amazon, LinkedIn, WordPress, or passport photos, there is a working tool behind it.
            </p>
            <ul>
              {SITE_AUTHOR.expertise.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2>How this site handles your files</h2>
            <p>
              Standard tools process images locally in your browser. That matters for ID scans,
              profile photos, and unreleased product shots. I built the site this way on purpose —
              privacy should not be an upgrade tier.
            </p>

            <h2>Get in touch</h2>
            <p>
              Email:{" "}
              <a href={`mailto:${SITE_AUTHOR.email}`}>{SITE_AUTHOR.email}</a>
              <br />
              GitHub:{" "}
              <a href={SITE_AUTHOR.github} rel="noopener noreferrer" target="_blank">
                @rajat0323
              </a>
            </p>
            <p>
              Found a broken workflow or outdated portal limit?{" "}
              <Link href="/contact">Send a note</Link> — I update guides when platforms change
              their rules.
            </p>
          </div>

          <AuthorBio variant="full" />
        </article>
      </div>
    </main>
  );
}
