import Link from "next/link";
import Script from "next/script";

import ReduceImageSizeClient from "@/components/ReduceImageSizeClient";
import "../../styles/landing.css";

const benefitDetails = [
  {
    icon: "🚀",
    title: "Faster websites",
    body: "Compressing images trims render-blocking weight so Lighthouse scores and Core Web Vitals improve instantly.",
  },
  {
    icon: "🔐",
    title: "Privacy-first",
    body: "All processing happens on your device. Nothing is uploaded to servers or stored in the cloud.",
  },
  {
    icon: "🧠",
    title: "SEO boost",
    body: "Smaller assets help crawlers, reduce CLS, and keep mobile-first indexing smooth.",
  },
  {
    icon: "📦",
    title: "Batch ready",
    body: "Process unlimited images, tweak settings, and download as ZIP or single files.",
  },
];

const processSteps = [
  {
    title: "Upload",
    detail: "Drop files, pick from device, or paste images directly into the uploader.",
  },
  {
    title: "Adjust",
    detail: "Choose presets, tweak quality, resize, and select JPG/PNG/WEBP results.",
  },
  {
    title: "Download",
    detail: "Grab optimized outputs individually or download a ZIP bundle instantly.",
  },
];

const comparisonExamples = [
  { title: "Photography", original: "4.2 MB", compressed: "320 KB", reduction: "92% smaller" },
  { title: "Graphics & Screenshots", original: "1.8 MB", compressed: "145 KB", reduction: "92% smaller" },
  { title: "Web Images", original: "890 KB", compressed: "62 KB", reduction: "93% smaller" },
];

const seoParagraphs = [
  "Reduce image size in KB or MB without giving up detail. Smaller assets mean faster downloads, lower bandwidth, and happier visitors.",
  "Target specific sizes, maintain aspect ratios, and convert between JPG, PNG, and WEBP for the perfect balance of quality and speed.",
];

const faqList = [
  { question: "Can I compress multiple images simultaneously?", answer: "Yes. Upload unlimited images and download together or individually." },
  { question: "Is the compressor secure?", answer: "100% secure. Compression happens in your browser — no uploads." },
  { question: "What formats are supported?", answer: "JPG, PNG, and WEBP plus format conversion inside the tool." },
  { question: "Can I control the output size?", answer: "Adjust quality, resize dimensions, and preview savings before downloading." },
  { question: "Is there a limit?", answer: "Each file can be up to 10 MB locally, but typical web images are smaller." },
  { question: "Do I need an account?", answer: "No signups or payments. The tool is entirely free." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqList.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export const metadata = {
  title: "Reduce Image Size Online Free - Fast JPG, PNG, WEBP Compressor | No Upload",
  description:
    "Free online image compressor built for marketers, agencies, and developers. Reduce image size without sacrificing quality.",
  keywords: [
    "reduce image size online",
    "compress image online",
    "image compressor free",
    "reduce image size in kb",
    "reduce image size in mb",
    "compress jpg online",
    "compress png online",
    "compress webp",
    "online image compression",
    "batch image compressor",
    "image size reducer",
  ],
  alternates: {
    canonical: "/reduce-image-size",
  },
  openGraph: {
    title: "Free Online Image Compressor - Reduce Image Size Instantly",
    description: "Compress images fast without losing quality. No upload needed, 100% secure.",
    url: "https://www.reduceimagesizeonline.com/reduce-image-size",
    type: "website",
  },
};

export default function ReduceImagePage() {
  return (
    <>
      <Script id="reduce-page-faq" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqSchema)}
      </Script>

      <ReduceImageSizeClient />

      <section className="section section-alt">
        <div className="section-content">
          <p className="section-heading">Why reduce image size online?</p>
          <div className="grid features-grid">
            {benefitDetails.map((item) => (
              <article key={item.title} className="feature-card">
                <div className="icon" aria-hidden="true">
                  {item.icon}
                </div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-content">
          <p className="section-heading">How the tool works</p>
          <div className="grid steps-grid">
            {processSteps.map((step, index) => (
              <article key={step.title} className="step-card">
                <span className="badge-pill">Step {index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="section-content">
          <p className="section-heading">Perfect for the following scenarios</p>
          <div className="use-cases-grid">
            {benefitDetails.map((item) => (
              <article key={item.title} className="use-case-card">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-content">
          <p className="section-heading">Typical compression results</p>
          <div className="grid features-grid">
            {comparisonExamples.map((example) => (
              <article key={example.title} className="feature-card">
                <h3>{example.title}</h3>
                <p>
                  <strong>Original:</strong> {example.original}
                </p>
                <p>
                  <strong>Compressed:</strong> {example.compressed}
                </p>
                <p>{example.reduction}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="section-content seo-block">
          {seoParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="hero-cta" style={{ marginTop: 20 }}>
            <Link href="/blog/how-to-reduce-image-size" className="btn btn-ghost">
              Read the guide
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-content">
          <p className="section-heading">Frequently asked questions</p>
          <div className="grid faq-grid">
            {faqList.map((faq) => (
              <article key={faq.question} className="faq-card">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section trust-section">
        <div className="section-content">
          <p className="section-heading">Why teams trust this free tool</p>
          <div className="trust-grid">
            {comparisonExamples.map((example) => (
              <article key={example.title} className="trust-card">
                <h3>{example.title}</h3>
                <p>{example.reduction}</p>
              </article>
            ))}
          </div>
          <div className="hero-cta" style={{ marginTop: 28 }}>
            <Link href="/reduce-image-size" className="btn btn-primary">
              Compress more images
            </Link>
            <Link href="/contact" className="btn btn-ghost">
              Contact support
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
