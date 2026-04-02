import Link from "next/link";
import Script from "next/script";
import { Suspense } from "react";

import AdSlot from "@/components/AdSlot";
import ImageToolWorkspace from "@/components/ImageToolWorkspace";
import type { ToolPage } from "@/lib/toolCatalog";

type ToolPageTemplateProps = {
  tool: ToolPage;
};

const relatedLinks = [
  { href: "/image-compressor", label: "Image Compressor" },
  { href: "/image-resizer", label: "Image Resizer" },
  { href: "/image-converter", label: "Image Converter" },
  { href: "/crop-image", label: "Crop Image Tool" },
  { href: "/bulk-image-compressor", label: "Bulk Image Compressor" },
  { href: "/background-remover", label: "Background Remover" },
  { href: "/image-upscaler", label: "Image Upscaler" },
  { href: "/compress-image-to-20kb", label: "Compress Image to 20KB" },
  { href: "/compress-image-to-30kb", label: "Compress Image to 30KB" },
  { href: "/compress-image-to-50kb", label: "Compress Image to 50KB" },
];

export default function ToolPageTemplate({ tool }: ToolPageTemplateProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.faqList.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <Script id={`${tool.slug}-faq`} type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqSchema)}
      </Script>

      <main className="hub-page">
        <section className="hero hero-compact">
          <div className="hero-inner section-content">
            <span className="badge-pill">{tool.badge}</span>
            <h1 className="hero-title">{tool.heroTitle}</h1>
            <p className="hero-subtitle">{tool.heroCopy}</p>
            <div className="hero-cta">
              <Link href="/image-compressor" className="btn btn-primary">
                Open main tool
              </Link>
              <Link href="/" className="btn btn-ghost">
                Explore tool hub
              </Link>
            </div>
          </div>
          <div className="hero-illustration" aria-hidden="true" />
        </section>

        <section className="section section-alt ad-band">
          <div className="section-content">
            <AdSlot label="Header banner ad" compact />
          </div>
        </section>

        <section className="section">
          <div className="section-content tool-layout">
            <div className="tool-layout-main">
              <Suspense fallback={<div className="tool-surface">Loading workspace...</div>}>
                <ImageToolWorkspace mode={tool.mode} defaultTargetKB={tool.defaultTargetKB} />
              </Suspense>
            </div>

            <aside className="tool-layout-sidebar">
              <AdSlot label="Sidebar ad slot" />
              <div className="tool-surface sidebar-list">
                <h3>Why users choose this tool</h3>
                <ul className="feature-list">
                  {tool.featureList.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </section>

        <section className="section section-alt">
          <div className="section-content">
            <p className="section-heading">More image tools</p>
            <div className="intent-link-grid">
              {relatedLinks
                .filter((link) => link.href !== `/${tool.slug}`)
                .slice(0, 8)
                .map((link) => (
                  <Link key={link.href} href={link.href} className="intent-link-card">
                    <strong>{link.label}</strong>
                    <span>Continue with another image workflow</span>
                  </Link>
                ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-content">
            <p className="section-heading">Frequently asked questions</p>
            <div className="grid faq-grid">
              {tool.faqList.map((faq) => (
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
