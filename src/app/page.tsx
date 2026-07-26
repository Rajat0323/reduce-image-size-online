import dynamic from "next/dynamic";
import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { Suspense } from "react";

import AuthorBio from "@/components/AuthorBio";
import { SITE_NAME, SITE_URL } from "@/constants";
import { SITE_AUTHOR } from "@/seo/author";
import "../styles/home-studio.css";

const homeDisplay = Fraunces({
  subsets: ["latin"],
  variable: "--font-home-display",
  display: "swap",
});

const homeBody = Outfit({
  subsets: ["latin"],
  variable: "--font-home-body",
  display: "swap",
});

const HomePdfToImageStudio = dynamic(() => import("@/components/HomePdfToImageStudio"), {
  ssr: false,
  loading: () => (
    <div className="home-studio-shell">
      <div className="home-studio-empty">
        <p className="home-studio-lead">Loading converter…</p>
      </div>
    </div>
  ),
});

export const metadata: Metadata = {
  title: {
    absolute: "PDF to Image Converter — Free Online Tool",
  },
  description:
    "Convert PDF pages to PNG, JPG, or WEBP in your browser. Private local processing, multi-page support, and free download — no account required.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "PDF to Image Converter — Free Online Tool",
    description:
      "Turn PDF pages into PNG, JPG, or WEBP without uploading files to a server. Built for quick, private conversion.",
    url: `${SITE_URL}/`,
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "ReduceImageSize PDF to image converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF to Image Converter — Free Online Tool",
    description:
      "Convert PDF pages to PNG, JPG, or WEBP in your browser. Private local processing, multi-page support, and free download.",
    images: [`${SITE_URL}/og-image.png`],
  },
};

const homeFaq = [
  {
    question: "Is my PDF uploaded to a server?",
    answer:
      "No. Conversion runs in your browser. The PDF is read on your device and rendered to images locally. We do not store your file on our servers for conversion.",
  },
  {
    question: "Can I convert a multi-page PDF?",
    answer:
      "Yes. Convert every page, or set a page range. Each page becomes its own image. Multiple pages download as a ZIP.",
  },
  {
    question: "Does image quality drop when I convert?",
    answer:
      "You control quality and resolution scale before converting. Higher scale means sharper output and larger files. Preview the result before you download.",
  },
  {
    question: "Can I convert password-protected PDFs?",
    answer:
      "Not in the current version. Remove the password in a PDF reader first, then convert the unlocked file here.",
  },
  {
    question: "Will layout and fonts look the same?",
    answer:
      "Each page is rendered as a flat image of what the PDF viewer draws. Text stays readable when resolution is high enough, but you cannot edit the text afterward.",
  },
  {
    question: "Can I use this on my phone?",
    answer:
      "Yes. It works in modern mobile browsers. Large PDFs may take longer on older phones because rendering uses your device CPU.",
  },
  {
    question: "How long does conversion take?",
    answer:
      "Short digital PDFs usually finish in a few seconds. Scanned or very large files take longer because every page is drawn to a canvas on your device.",
  },
  {
    question: "What output formats are supported?",
    answer: "PNG, JPG, and WEBP. Pick the format before you convert.",
  },
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": ["SoftwareApplication", "WebApplication"],
  name: `${SITE_NAME} PDF to Image Converter`,
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Web Browser",
  url: SITE_URL,
  description:
    "Free online PDF to image converter. Convert PDF pages to PNG, JPG, or WEBP in the browser with private local processing.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Convert PDF to PNG, JPG, or WEBP",
    "Choose all pages or a page range",
    "Browser-based private processing",
    "Download single images or ZIP",
  ],
  creator: {
    "@type": "Person",
    name: SITE_AUTHOR.name,
    url: `${SITE_URL}/about`,
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaq.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function Home() {
  return (
    <>
      <Script id="home-software" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(softwareSchema)}
      </Script>
      <Script id="home-faq" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqSchema)}
      </Script>

      <main className={`home-page ${homeDisplay.variable} ${homeBody.variable}`}>
        <section className="home-stage">
          <div className="home-stage-inner">
            <div className="home-hero-copy">
              <div className="home-brand-mark">
                <strong>ReduceImageSize</strong>
                <span>PDF to image</span>
              </div>
              <h1>PDF to Image Converter</h1>
              <p>
                Convert PDF pages to PNG, JPG, or WEBP on your device. No account. No server upload
                for conversion.
              </p>
            </div>

            <Suspense
              fallback={
                <div className="home-studio-shell">
                  <div className="home-studio-empty">
                    <p className="home-studio-lead">Loading converter…</p>
                  </div>
                </div>
              }
            >
              <HomePdfToImageStudio />
            </Suspense>
          </div>
        </section>

        <div className="home-content">
          <section>
            <h2>Why this tool exists</h2>
            <p>
              I built this because I kept needing a single page out of a PDF as a normal image —
              for a form, a slide, a chat upload, or a quick preview — and I did not want to install
              desktop software or send the file to a random upload service.
            </p>
            <p>
              So the product is intentionally small: drop a PDF, pick an output format, convert,
              download. One job. Done in the browser.
            </p>
          </section>

          <section>
            <h2>How conversion works</h2>
            <p>
              Your browser reads the PDF, draws each page onto a canvas, then exports that drawing
              as PNG, JPG, or WEBP. That is why the file never needs to leave your device for the
              conversion step.
            </p>
            <div className="home-flow">
              <article>
                <em>Step 01</em>
                <strong>Upload</strong>
                <p>Drop a PDF or choose one from your device.</p>
              </article>
              <article>
                <em>Step 02</em>
                <strong>Choose output</strong>
                <p>Pick PNG, JPG, or WEBP. Set all pages or a range.</p>
              </article>
              <article>
                <em>Step 03</em>
                <strong>Convert</strong>
                <p>Pages render locally. Watch progress as each page finishes.</p>
              </article>
              <article>
                <em>Step 04</em>
                <strong>Download</strong>
                <p>Save one image, or download every page as a ZIP.</p>
              </article>
            </div>

            <figure className="home-shot">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/converter/upload-screen.png"
                alt="Upload screen with Choose PDF button and PDF to PNG, JPG, or WEBP options"
                width={1200}
                height={720}
                loading="lazy"
              />
              <figcaption>
                <strong>Upload screen</strong>
                <p>
                  You should see a large drop area, a Choose PDF button, and a short note that
                  conversion stays on your device.
                </p>
              </figcaption>
            </figure>
            <figure className="home-shot">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/converter/conversion-progress.png"
                alt="Conversion progress showing Converting percent on the Convert to image button"
                width={1200}
                height={720}
                loading="lazy"
              />
              <figcaption>
                <strong>Conversion progress</strong>
                <p>
                  After you start conversion, the button shows progress while each page is rendered.
                </p>
              </figcaption>
            </figure>
            <figure className="home-shot">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/converter/converted-preview.png"
                alt="Converted image preview thumbnails with page numbers and file sizes"
                width={1200}
                height={720}
                loading="lazy"
              />
              <figcaption>
                <strong>Converted image preview</strong>
                <p>
                  Finished pages appear as thumbnails with page numbers and file sizes so you can
                  check the result before downloading.
                </p>
              </figcaption>
            </figure>
            <figure className="home-shot">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/converter/download-screen.png"
                alt="Download screen with page thumbnails and Download ZIP button"
                width={1200}
                height={720}
                loading="lazy"
              />
              <figcaption>
                <strong>Download screen</strong>
                <p>
                  Download a single page by clicking its thumbnail, or use Download / Download ZIP
                  for the full set.
                </p>
              </figcaption>
            </figure>
          </section>

          <section>
            <h2>When to use it</h2>
            <ul>
              <li>You need one PDF page as a JPG or PNG for a form or email</li>
              <li>You want quick previews of a multi-page PDF without opening desktop software</li>
              <li>You prefer converting a file locally instead of uploading it to a third-party host</li>
              <li>You need WEBP for a lighter web asset from a PDF page</li>
            </ul>
          </section>

          <section>
            <h2>Limitations (read this first)</h2>
            <p>
              Honest boundaries matter more than marketing claims. This converter is good at page
              snapshots. It is not a full PDF editor.
            </p>
            <ul>
              <li>Password-protected PDFs are not supported yet</li>
              <li>Very large or heavily scanned PDFs can be slow on older phones</li>
              <li>Output is a flat image — text is not selectable after conversion</li>
              <li>Complex print-ready PDFs may need a higher resolution scale for small type</li>
              <li>Current upload limit is 40 MB</li>
            </ul>
          </section>

          <section>
            <h2>Privacy</h2>
            <p>
              Conversion is designed to run in your browser. Your PDF is not stored on our servers
              as part of the convert step. If you leave the page, the working images in memory are
              gone with the session.
            </p>
            <p>
              We may use basic analytics to understand page visits. That is separate from your PDF
              file. Details are on the <Link href="/privacy-policy">Privacy Policy</Link> page.
            </p>
          </section>

          <section>
            <h2>Supported formats and output choices</h2>
            <p>
              <strong>Input:</strong> PDF.
              <br />
              <strong>Output:</strong> PNG (clean for screenshots and text), JPG (smaller for
              photos), WEBP (good balance for web use).
            </p>
            <p>
              Use a higher resolution scale when the page has small text. Use a lower scale when you
              only need a quick preview.
            </p>
          </section>

          <section>
            <h2>How we test the converter</h2>
            <p>
              Before shipping changes, I run the same path a user takes: open the homepage, drop a
              PDF, convert, check page order, download a single page, then download a ZIP for
              multi-page files.
            </p>
            <p>
              Digital text PDFs usually convert quickly. Scanned pages take longer because every
              page is drawn at the selected scale on your device. If a file fails, the usual causes
              are password protection, a damaged PDF, or a format the browser cannot decode.
            </p>
            <h3>Site quality checks (Ahrefs)</h3>
            <p>
              An Ahrefs Site Audit of reduceimagesizeonline.com (July 2026) scored Health 99. The
              crawl flagged one sitemap error (a 3XX URL listed in sitemap.xml) plus warnings from
              the older multi-page structure: long titles, missing H1s on thin/redirect URLs, and
              internal links that hit redirects.
            </p>
            <p>
              Those issues are addressed by keeping the public site to five indexable URLs (
              <Link href="/">home</Link>, <Link href="/about">about</Link>,{" "}
              <Link href="/contact">contact</Link>, <Link href="/privacy-policy">privacy</Link>,{" "}
              <Link href="/terms">terms</Link>), listing only final 200 OK URLs in the sitemap,
              using short absolute titles (no brand suffix doubling), and giving every public page a
              clear H1. Legacy tool, blog, and article URLs still 301 to home on purpose so old
              links do not 404. Admin routes stay noindex.
            </p>
            <p className="home-meta-line">
              Last reviewed: July 26, 2026 · Maintainer: {SITE_AUTHOR.name}
            </p>
          </section>

          <section>
            <h2>Best practices</h2>
            <ul>
              <li>Start with an unlocked PDF</li>
              <li>Use PNG when sharp text matters</li>
              <li>Raise resolution scale before converting small print</li>
              <li>Convert a page range when you only need part of a long document</li>
              <li>Check the preview thumbnails before downloading the ZIP</li>
            </ul>
          </section>

          <section>
            <h2>Troubleshooting</h2>
            <ul>
              <li>
                <strong>Nothing happens after upload:</strong> confirm the file ends in .pdf and is
                under 40 MB
              </li>
              <li>
                <strong>Conversion fails immediately:</strong> the PDF may be password-protected or
                corrupted — open it in a reader first
              </li>
              <li>
                <strong>Text looks soft:</strong> increase resolution scale and convert again
              </li>
              <li>
                <strong>Phone feels slow:</strong> convert fewer pages at a time, or use a laptop
                for large scanned files
              </li>
            </ul>
          </section>

          <section>
            <h2>Why trust this tool</h2>
            <div className="home-trust-grid">
              <article>
                <h3>Privacy commitment</h3>
                <p>Conversion is built around browser-local processing. Your PDF is not our archive.</p>
              </article>
              <article>
                <h3>Quality standards</h3>
                <p>
                  Preview before download. You choose format, quality, and scale — no hidden
                  recompression after export.
                </p>
              </article>
              <article>
                <h3>Continuous improvements</h3>
                <p>
                  The product stays focused on PDF → image. Features are added when they help that
                  job, not to pad a tool directory.
                </p>
              </article>
              <article>
                <h3>Supported browsers</h3>
                <p>Current Chrome, Edge, Firefox, and Safari. JavaScript must be enabled.</p>
              </article>
              <article>
                <h3>Editorial standards</h3>
                <p>
                  This page describes what the tool actually does. If a limit exists, it is listed
                  here instead of buried.
                </p>
              </article>
              <article>
                <h3>Version history</h3>
                <p>
                  Current public version focuses on PDF → PNG / JPG / WEBP, page ranges, and ZIP
                  download. Updated July 26, 2026.
                </p>
              </article>
            </div>
          </section>

          <section>
            <h2>Who this is for</h2>
            <p>
              Students, office workers, sellers, and anyone who needs a PDF page as a regular image
              without installing software. If you need OCR, form filling, or PDF editing, use a
              dedicated editor — this tool is for conversion only.
            </p>
          </section>

          <section>
            <h2>Frequently asked questions</h2>
            <div className="home-faq-grid">
              {homeFaq.map((faq) => (
                <article key={faq.question} className="home-faq-item">
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </article>
              ))}
            </div>
          </section>

          <AuthorBio />
          <p className="home-meta-line">
            Questions or corrections:{" "}
            <a href={`mailto:${SITE_AUTHOR.email}`}>{SITE_AUTHOR.email}</a> ·{" "}
            <Link href="/about">About</Link> · <Link href="/privacy-policy">Privacy</Link>
          </p>
        </div>
      </main>
    </>
  );
}
