import Link from "next/link";
import Script from "next/script";
import { Suspense } from "react";

import AdSlot from "@/components/AdSlot";
import ImageToolWorkspace from "@/components/ImageToolWorkspace";
import SeoRichContentBlock from "@/components/SeoRichContent";
import type { ToolPage } from "@/lib/toolCatalog";
import { buildSeoRichContent, buildToolSeoContext } from "@/lib/seoRichContent";

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
  { href: "/compress-image-to-50kb", label: "Compress Image to 50KB" },
  { href: "/compress-image-to-100kb", label: "Compress Image to 100KB" },
];

export default function ToolPageTemplate({ tool }: ToolPageTemplateProps) {
  const seoContext = buildToolSeoContext(tool);
  const seoContent = buildSeoRichContent(seoContext);
  const allFaqs = [...tool.faqList, ...seoContent.extendedFaqs];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to ${tool.name.toLowerCase()}`,
    description: tool.description,
    step: seoContent.sections
      .flatMap((section) => section.steps || [])
      .map((step, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: step.title,
        text: step.body,
      })),
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: tool.title,
    description: tool.description,
    author: {
      "@type": "Organization",
      name: "ReduceImageSize",
    },
    wordCount: seoContent.wordCount,
  };

  return (
    <>
      <Script id={`${tool.slug}-faq`} type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqSchema)}
      </Script>
      <Script id={`${tool.slug}-howto`} type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(howToSchema)}
      </Script>
      <Script id={`${tool.slug}-article`} type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(articleSchema)}
      </Script>

      <main className="hub-page tool-page">
        <section className="tool-page-header">
          <div className="section-content">
            <span className="badge-pill">{tool.badge}</span>
            <h1 className="tool-page-title">{tool.heroTitle}</h1>
            <p className="tool-page-lead">{tool.heroCopy}</p>
            <div className="tool-feature-chips">
              {tool.featureList.map((feature) => (
                <span key={feature} className="tool-feature-chip">
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="tool-first-section">
          <div className="section-content tool-layout tool-layout-priority">
            <div className="tool-layout-main">
              <Suspense fallback={<div className="tool-surface">Loading workspace...</div>}>
                <ImageToolWorkspace mode={tool.mode} defaultTargetKB={tool.defaultTargetKB} />
              </Suspense>
            </div>

            <aside className="tool-layout-sidebar tool-layout-sidebar-sticky">
              <div className="tool-surface sidebar-list">
                <h3>Quick tips</h3>
                <ul className="feature-list">
                  <li>Upload JPG, PNG, WebP, or HEIC</li>
                  <li>Processing stays private in your browser</li>
                  <li>Compare size and quality before download</li>
                  <li>No account or installation required</li>
                </ul>
              </div>
              <AdSlot label="Sidebar ad slot" compact />
            </aside>
          </div>
        </section>

        <section className="section section-alt">
          <div className="section-content">
            <h2 className="section-heading">More image tools</h2>
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

        <section className="section seo-rich-section-wrap">
          <div className="section-content">
            <SeoRichContentBlock content={seoContent} />
          </div>
        </section>

        <section className="section section-alt ad-band">
          <div className="section-content">
            <AdSlot label="Footer banner ad" compact />
          </div>
        </section>

        <section className="section">
          <div className="section-content">
            <h2 className="section-heading">Tool FAQ</h2>
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
