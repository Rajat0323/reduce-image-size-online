import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";

import "../styles/landing.css";
import { homeTools, toolPages } from "@/lib/toolCatalog";
import { intentPages } from "@/lib/intentPages";

export const metadata: Metadata = {
  title: "Free Online Image Compressor, Converter & Resizer",
  description:
    "Free online image tools for global users — compress to exact KB sizes, convert JPG PNG WebP HEIC, resize for social media, and remove backgrounds in your browser.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Free Online Image Compressor, Converter & Resizer | ReduceImageSize",
    description:
      "Compress, convert, and resize images online for websites, email, Instagram, WhatsApp, Shopify, WordPress, and more.",
    url: "https://www.reduceimagesizeonline.com/",
    siteName: "ReduceImageSize",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Image Compressor, Converter & Resizer | ReduceImageSize",
    description:
      "50+ free image tools — compress to exact KB, convert formats, resize for social platforms, and optimize for the web.",
    images: ["https://www.reduceimagesizeonline.com/og-image.png"],
  },
};

const benefits = [
  {
    title: "Free to use",
    description: "Use every image tool without sign-up friction or gated workflows.",
  },
  {
    title: "No sign-up required",
    description: "Open a tool, drop an image, and get to work immediately.",
  },
  {
    title: "Fast browser processing",
    description: "Most tools run directly in the browser for quick results worldwide.",
  },
  {
    title: "Secure files",
    description: "Images stay local while you compress, resize, convert, crop, and enhance them.",
  },
];

const globalUseCases = [
  {
    title: "Website and CMS publishing",
    description: "Compress hero images, blog visuals, and product photos before WordPress or Shopify upload.",
  },
  {
    title: "Social media workflows",
    description: "Prepare Instagram, Facebook, LinkedIn, WhatsApp, and Discord images with exact sizes.",
  },
  {
    title: "Email and messaging",
    description: "Reduce attachment size for Gmail, Outlook, and mobile chat apps.",
  },
];

const homeFaq = [
  {
    question: "What tools are available on ReduceImageSize?",
    answer: "ReduceImageSize includes image compressor, resizer, converter, crop, bulk compression, rotate and flip, background remover, image upscaler, metadata remover, and 50+ SEO-friendly workflow pages.",
  },
  {
    question: "Can I compress images to exact KB sizes?",
    answer: "Yes. Dedicated pages cover 10KB through 1MB targets including 20KB, 50KB, 100KB, 200KB, 500KB, and more.",
  },
  {
    question: "Does ReduceImageSize store uploaded files?",
    answer: "No. The tools use browser-based processing and do not store images on a server.",
  },
];

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

const exactKbPages = toolPages.filter((tool) => tool.slug.startsWith("compress-image-to-"));
const converterPages = intentPages.filter((page) => page.slug.includes("converter"));
const platformPages = intentPages.filter((page) => page.slug.startsWith("compress-image-for-"));
const resizePages = intentPages.filter((page) => page.slug.startsWith("resize-image"));

const imageTools = homeTools.filter((tool) => tool.category === "image");
const aiTools = homeTools.filter((tool) => tool.category === "ai");

function iconForTool(slug: string) {
  switch (slug) {
    case "image-compressor":
      return "CP";
    case "image-resizer":
      return "RS";
    case "image-converter":
      return "CV";
    case "crop-image":
      return "CR";
    case "bulk-image-compressor":
      return "BK";
    case "rotate-flip-image":
      return "RF";
    case "background-remover":
      return "BG";
    case "image-upscaler":
      return "UP";
    default:
      return "IM";
  }
}

export default function Home() {
  return (
    <>
      <Script id="home-faq" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqSchema)}
      </Script>

      <main className="landing hub-page">
        <section className="hero">
          <div className="hero-inner section-content">
            <span className="badge-pill">50+ free image tools worldwide</span>
            <h1 className="hero-title">Free Online Image Compressor, Converter and Resizer</h1>
            <p className="hero-subtitle">
              Compress images to exact KB sizes, convert JPG PNG WebP HEIC, resize for Instagram,
              WhatsApp, WordPress, Shopify, and optimize photos for websites, email, and social
              media — all in your browser.
            </p>
            <div className="hero-cta">
              <Link href="/image-compressor" className="btn btn-primary">
                Open Image Compressor
              </Link>
              <Link href="/image-converter" className="btn btn-ghost">
                Try Image Converter
              </Link>
            </div>
          </div>
          <div className="hero-illustration" aria-hidden="true" />
        </section>

        <section className="section">
          <div className="section-content">
            <h2 className="section-heading">Core Image Tools</h2>
            <div className="hub-grid">
              {imageTools.map((tool) => (
                <Link key={tool.slug} href={`/${tool.slug}`} className="hub-card">
                  <span className="hub-card-icon">{iconForTool(tool.slug)}</span>
                  <div>
                    <h3>{tool.name}</h3>
                    <p>{tool.description}</p>
                  </div>
                  <span className="hub-card-footer">Open tool</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-alt">
          <div className="section-content">
            <h2 className="section-heading">Exact KB Compression Pages</h2>
            <div className="intent-link-grid">
              {exactKbPages.map((page) => (
                <Link key={page.slug} href={`/${page.slug}`} className="intent-link-card">
                  <strong>{page.name}</strong>
                  <span>{page.heroCopy}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-content">
            <h2 className="section-heading">Format Converters</h2>
            <div className="intent-link-grid">
              {converterPages.map((page) => (
                <Link key={page.slug} href={`/${page.slug}`} className="intent-link-card">
                  <strong>{page.title.split("|")[0].trim()}</strong>
                  <span>{page.description}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-alt">
          <div className="section-content">
            <h2 className="section-heading">Platform and Use-Case Tools</h2>
            <div className="intent-link-grid">
              {platformPages.map((page) => (
                <Link key={page.slug} href={`/${page.slug}`} className="intent-link-card">
                  <strong>{page.title.split("|")[0].trim()}</strong>
                  <span>{page.description}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-content">
            <h2 className="section-heading">Resize by Pixel Size</h2>
            <div className="intent-link-grid">
              {resizePages.map((page) => (
                <Link key={page.slug} href={`/${page.slug}`} className="intent-link-card">
                  <strong>{page.title.split("|")[0].trim()}</strong>
                  <span>{page.description}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-alt">
          <div className="section-content">
            <h2 className="section-heading">AI and Specialty Tools</h2>
            <div className="hub-grid">
              {aiTools.map((tool) => (
                <Link key={tool.slug} href={`/${tool.slug}`} className="hub-card">
                  <span className="hub-card-icon">{iconForTool(tool.slug)}</span>
                  <div>
                    <h3>{tool.name}</h3>
                    <p>{tool.description}</p>
                  </div>
                  <span className="hub-card-footer">Open AI tool</span>
                </Link>
              ))}
              <Link href="/remove-image-metadata" className="hub-card">
                <span className="hub-card-icon">EX</span>
                <div>
                  <h3>Remove Image Metadata</h3>
                  <p>Strip EXIF and GPS data from photos privately in your browser.</p>
                </div>
                <span className="hub-card-footer">Open tool</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-content">
            <h2 className="section-heading">Benefits</h2>
            <div className="hub-benefit-grid">
              {benefits.map((benefit) => (
                <article key={benefit.title} className="hub-benefit-card">
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-alt">
          <div className="section-content">
            <h2 className="section-heading">Built for global upload workflows</h2>
            <div className="hub-benefit-grid">
              {globalUseCases.map((item) => (
                <article key={item.title} className="hub-benefit-card reveal-fade">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-content">
            <h2 className="section-heading">Frequently asked questions</h2>
            <div className="grid faq-grid">
              {homeFaq.map((faq) => (
                <article key={faq.question} className="faq-card">
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
