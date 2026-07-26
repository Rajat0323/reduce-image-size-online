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

const HomeCompressorStudio = dynamic(() => import("@/components/HomeCompressorStudio"), {
  ssr: false,
  loading: () => (
    <div className="home-studio-shell">
      <div className="home-studio-empty">
        <p className="home-studio-lead">Loading compressor…</p>
      </div>
    </div>
  ),
});

export const metadata: Metadata = {
  title: "Image Compressor Online — Reduce Image Size Free",
  description:
    "Compress images online in your browser. Reduce JPG, PNG, and WebP file size to exact KB or MB targets, convert formats, and resize — free, private, no upload to a server.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Image Compressor Online — Reduce Image Size Free | ReduceImageSize",
    description:
      "One free browser tool to compress, convert, and resize images. Pick a target size, preview the result, download — files stay on your device.",
    url: `${SITE_URL}/`,
    siteName: SITE_NAME,
    type: "website",
    images: [`${SITE_URL}/og-image.png`],
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Compressor Online — Reduce Image Size Free",
    description:
      "Compress images to exact KB targets, convert formats, and resize — privately in your browser.",
    images: [`${SITE_URL}/og-image.png`],
  },
};

const homeFaq = [
  {
    question: "Is this image compressor free?",
    answer:
      "Yes. You can compress, convert, and resize images without creating an account. There is no paywall on the core tool.",
  },
  {
    question: "Do you upload my photos to a server?",
    answer:
      "No. Compression runs in your browser with local processing. Your file is not stored on our servers while you edit.",
  },
  {
    question: "Can I compress an image to 20KB, 50KB, or 100KB?",
    answer:
      "Yes. Choose a preset under Target file size, or pick Custom and type any KB or MB value. The compressor aims for that size while keeping the preview readable.",
  },
  {
    question: "Which formats can I upload?",
    answer:
      "JPG, JPEG, PNG, WEBP, HEIC (converted in-browser), plus common formats like BMP, GIF, TIFF, and AVIF when your browser can decode them. Output is JPG, PNG, or WEBP.",
  },
  {
    question: "Will compression ruin image quality?",
    answer:
      "It depends on how small you go. Auto Optimize keeps a practical balance. Strict targets like 20KB need smaller dimensions or more compression — always check the After preview at full zoom before you download.",
  },
  {
    question: "Can I convert and resize at the same time?",
    answer:
      "Yes. Set Convert to for the output format, open Advanced options for width and height, then compress. Everything happens on this page without reloading.",
  },
  {
    question: "Does this remove EXIF and GPS data?",
    answer:
      "Yes when you download a re-exported file. Drawing through the canvas and saving a new file strips camera metadata from the output.",
  },
  {
    question: "Who built ReduceImageSize?",
    answer: `${SITE_AUTHOR.name}, founder of ${SITE_NAME}. The tool and guides are maintained from real browser testing — see the About page for details.`,
  },
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": ["SoftwareApplication", "WebApplication"],
  name: `${SITE_NAME} Image Compressor`,
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Web Browser",
  url: SITE_URL,
  description:
    "Free online image compressor that reduces JPG, PNG, and WebP file size in the browser with target KB presets, format conversion, and resize controls.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Compress images to exact KB or MB targets",
    "Convert between JPG, PNG, and WebP",
    "Resize width and height with aspect lock",
    "Browser-based private processing",
    "Live before and after preview",
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

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
  ],
};

const websiteSearchSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/blog?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
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
      <Script id="home-breadcrumb" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(breadcrumbSchema)}
      </Script>
      <Script id="home-website" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(websiteSearchSchema)}
      </Script>

      <main className={`home-page ${homeDisplay.variable} ${homeBody.variable}`}>
        <section className="home-stage">
          <div className="home-stage-inner">
            <div className="home-hero-copy">
              <div className="home-brand-mark">
                <strong>ReduceImageSize</strong>
                <span>Image compressor</span>
              </div>
              <h1>Make any image smaller — on one clean page</h1>
              <p>
                Upload once. Set format and target size. Preview before and after. Download. No tool
                hub. No lookalike KB pages.
              </p>
              <div className="home-trust-row">
                <span>Private browser processing</span>
                <span>Exact KB / MB targets</span>
                <span>Free · no account</span>
              </div>
            </div>

            <Suspense
              fallback={
                <div className="home-studio-shell">
                  <div className="home-studio-empty">
                    <p className="home-studio-lead">Loading compressor…</p>
                  </div>
                </div>
              }
            >
              <HomeCompressorStudio />
            </Suspense>
          </div>
        </section>

        <div className="home-content">
          <section>
            <h2>How it works</h2>
            <p>
              I built this as a single workspace because jumping between “compress to 20KB” and
              “compress to 100KB” pages never helped anyone finish a form faster. Same tool, one
              place: upload, set the output you need, compress, download.
            </p>
            <div className="home-flow">
              <article>
                <em>Step 01</em>
                <strong>Upload</strong>
                <p>Drag & drop, browse, or paste. Phone and desktop both work.</p>
              </article>
              <article>
                <em>Step 02</em>
                <strong>Choose output</strong>
                <p>Pick JPG, PNG, WebP, or Auto. Set a target size or leave Auto on.</p>
              </article>
              <article>
                <em>Step 03</em>
                <strong>Compress</strong>
                <p>Processing stays in your browser. Watch the After panel update.</p>
              </article>
              <article>
                <em>Step 04</em>
                <strong>Download</strong>
                <p>Check the new size and preview, then save the file to your device.</p>
              </article>
            </div>
          </section>

          <section>
            <h2>Privacy and browser processing</h2>
            <p>
              Your image does not need to leave the device for standard compression. The work
              happens locally with browser APIs. That matters for ID photos, product shots that are
              not public yet, and anything you would rather not park on a random upload server.
            </p>
            <p>
              If your workplace has strict rules about web tools, follow those rules. For everyday
              uploads, local processing is the reason I keep this site focused and free of account
              requirements.
            </p>
          </section>

          <section>
            <h2>Image quality that still looks usable</h2>
            <p>
              Small file size and sharp detail fight each other. Auto Optimize aims for a sensible
              middle. When a portal demands 20KB or 50KB, resize the dimensions first in Advanced
              options, then compress — cutting pixels usually protects faces better than crushing
              quality alone.
            </p>
            <p>
              Always zoom the After preview. If text or edges look soft, raise quality a notch or
              bump the target size. The download button waits until you are ready.
            </p>
          </section>

          <section>
            <h2>Supported formats</h2>
            <p>
              Upload JPG, JPEG, PNG, WEBP, HEIC from iPhones, and other common types your browser
              can decode (BMP, GIF, TIFF, AVIF). Output focuses on what websites and forms actually
              accept: JPG, PNG, and WEBP. HEIC files are converted in the browser before compression.
            </p>
          </section>

          <section>
            <h2>Real situations this page is for</h2>
            <ul>
              <li>Form and portal uploads that reject files over a fixed KB limit</li>
              <li>Website heroes and blog images that should load quickly on mobile</li>
              <li>Product photos for marketplaces before they get re-compressed again</li>
              <li>Email attachments and chat apps that struggle with multi‑MB phone photos</li>
              <li>Profile pictures that need a smaller file without a desktop editor</li>
            </ul>
          </section>

          <section>
            <h2>Best practices</h2>
            <ul>
              <li>Start from the original camera file when you can, not a WhatsApp forward</li>
              <li>Match pixel dimensions if the destination publishes them</li>
              <li>Use JPG for photos, PNG when you need transparency, WebP for modern sites</li>
              <li>Aim a little under a hard KB cap so rounding does not fail the upload</li>
              <li>Keep a copy of the original until the portal accepts the file</li>
            </ul>
          </section>

          <section>
            <h2>If something fails</h2>
            <p>
              Still rejected after compression? Check three things in order: file size, width and
              height, then format. A perfect 50KB file at the wrong dimensions still fails. Open
              Advanced options, set the pixel box, compress again, and re-check the After panel.
            </p>
            <p>
              HEIC from newer iPhones should convert automatically. If a rare format will not open,
              export it once as JPG from your phone Photos app, then drop it here.
            </p>
          </section>

          <section>
            <h2>Specialty tools (optional)</h2>
            <p>
              Compression, conversion, and resize live on this homepage. A few separate utilities
              remain for tasks that are not the same job:
            </p>
            <div className="home-specialty">
              <Link href="/background-remover">Background remover</Link>
              <Link href="/crop-image">Crop image</Link>
              <Link href="/image-upscaler">Image upscaler</Link>
              <Link href="/remove-image-metadata">Remove metadata</Link>
              <Link href="/rotate-flip-image">Rotate &amp; flip</Link>
              <Link href="/blog">Guides</Link>
            </div>
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
        </div>
      </main>
    </>
  );
}
