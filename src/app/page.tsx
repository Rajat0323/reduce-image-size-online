import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";

import "../styles/landing.css";
import AdSlot from "@/components/AdSlot";
import { homeTools } from "@/lib/toolCatalog";

export const metadata: Metadata = {
  title: "Image Compressor to 20KB Online India | ReduceImageSize",
  description:
    "Use an image compressor to 20KB online for forms, KYC, passport photos, mobile uploads, and ml to oz conversions.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Image Compressor to 20KB Online India | ReduceImageSize",
    description:
      "Compress images to 20KB online for Indian forms, exam portals, KYC uploads, and mobile-friendly image workflows.",
    url: "https://www.reduceimagesizeonline.com/",
    siteName: "ReduceImageSize",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Compressor to 20KB Online India | ReduceImageSize",
    description:
      "Compress, resize, and convert images with exact-KB workflows for Indian uploads, plus ml to oz conversion.",
    images: ["https://www.reduceimagesizeonline.com/og-image.png"],
  },
};

const benefits = [
  {
    title: "Free to use",
    description: "Use the image tools without sign-up friction or gated workflows.",
  },
  {
    title: "No sign-up required",
    description: "Open a tool, drop an image, and get to work immediately.",
  },
  {
    title: "Fast browser processing",
    description: "Most tools run directly in the browser for quick results and lighter infrastructure.",
  },
  {
    title: "Secure files",
    description: "Images stay local while you compress, resize, convert, crop, and enhance them.",
  },
];

const indiaUseCases = [
  {
    title: "Government forms and exam portals",
    description: "Target exact KB sizes for applications, hall tickets, and portal photo uploads.",
  },
  {
    title: "KYC and mobile document uploads",
    description: "Prepare lighter images that upload faster on mobile data and lower-bandwidth connections.",
  },
  {
    title: "Passport photos and job applications",
    description: "Resize and compress profile images while keeping the subject clear and readable.",
  },
];

const homeFaq = [
  {
    question: "What tools are available in ReduceImageSize?",
    answer: "ReduceImageSize includes image compressor, resizer, converter, crop, bulk compression, rotate and flip, background remover, image upscaler, and ml to oz calculator pages.",
  },
  {
    question: "Can I compress image files to 50KB, 100KB, or 200KB?",
    answer: "Yes. The hub includes dedicated SEO-friendly pages and presets for common exact-KB image targets.",
  },
  {
    question: "Does ReduceImageSize store uploaded files?",
    answer: "No. The tools are designed around browser-based processing and do not store images on a server.",
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
    case "ml-to-oz-calculator":
      return "OZ";
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
            <span className="badge-pill">ReduceImageSize tool hub</span>
            <h1 className="hero-title">Image Compressor to 20KB Online for India - Free and Fast</h1>
            <p className="hero-subtitle">
              Use one professional image platform for Indian form uploads, KYC photos, passport
              images, website optimization, and everyday compression, resizing, conversion,
              cropping, background removal, and upscaling.
            </p>
            <div className="hero-cta">
              <Link href="/compress-image-to-20kb" className="btn btn-primary">
                Compress to 20KB
              </Link>
              <Link href="/image-resizer" className="btn btn-ghost">
                Try Image Resizer
              </Link>
            </div>
          </div>
          <div className="hero-illustration" aria-hidden="true" />
        </section>

        <section className="section section-alt ad-band">
          <div className="section-content">
            <AdSlot label="Top banner ad slot" compact />
          </div>
        </section>

        <section className="section">
          <div className="section-content">
            <p className="section-heading">Popular Tools</p>
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

        <section className="section section-alt ad-band">
          <div className="section-content">
            <AdSlot label="Mid-page ad slot" compact />
          </div>
        </section>

        <section className="section section-alt">
          <div className="section-content">
            <p className="section-heading">Background Remover and AI Tools</p>
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
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-content">
            <p className="section-heading">Benefits</p>
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
            <p className="section-heading">Built for real India upload workflows</p>
            <div className="hub-benefit-grid">
              {indiaUseCases.map((item) => (
                <article key={item.title} className="hub-benefit-card reveal-fade">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-alt">
          <div className="section-content">
            <p className="section-heading">Popular exact-size pages</p>
            <div className="intent-link-grid">
              <Link href="/compress-image-to-20kb" className="intent-link-card">
                <strong>Compress image to 20KB</strong>
                <span>Helpful for signatures, IDs, and strict upload limits</span>
              </Link>
              <Link href="/compress-image-to-30kb" className="intent-link-card">
                <strong>Compress image to 30KB</strong>
                <span>Useful for compact profile photos and portal uploads</span>
              </Link>
              <Link href="/compress-image-to-50kb" className="intent-link-card">
                <strong>Compress image to 50KB</strong>
                <span>For forms, profile photos, and compact uploads</span>
              </Link>
              <Link href="/compress-image-to-100kb" className="intent-link-card">
                <strong>Compress image to 100KB</strong>
                <span>Great for avatars, portals, and lightweight images</span>
              </Link>
              <Link href="/compress-image-to-200kb" className="intent-link-card">
                <strong>Compress image to 200KB</strong>
                <span>Useful for blogs, stores, and web publishing</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-content">
            <p className="section-heading">Frequently asked questions</p>
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
