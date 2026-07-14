import Link from "next/link";
import { Suspense } from "react";

import ImageToolWorkspace from "@/components/ImageToolWorkspace";
import SeoRichContentBlock from "@/components/SeoRichContent";
import ToolPageSchemas from "@/components/ToolPageSchemas";
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

  return (
    <>
      <ToolPageSchemas
        slug={tool.slug}
        title={tool.title}
        name={tool.name}
        description={tool.description}
        heroTitle={tool.heroTitle}
        faqs={allFaqs}
        seoContent={seoContent}
      />

      <main className="hub-page tool-page tool-page-upload-first">
        <section className="tool-upload-hero" aria-label={`${tool.name} upload workspace`}>
          <div className="section-content">
            <div className="tool-layout tool-layout-priority">
              <div className="tool-layout-main">
                <Suspense fallback={<div className="tool-surface">Loading workspace...</div>}>
                  <ImageToolWorkspace
                    mode={tool.mode}
                    defaultTargetKB={tool.defaultTargetKB}
                    toolTitle={tool.heroTitle}
                    toolBadge={tool.badge}
                  />
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
                <div className="tool-surface sidebar-list">
                  <h3>Features</h3>
                  <ul className="feature-list">
                    {tool.featureList.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>

            <div className="tool-page-meta-below">
              <p className="tool-page-lead">{tool.heroCopy}</p>
            </div>
          </div>
        </section>

        <section className="section section-compact section-alt">
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

        <section className="section section-compact">
          <div className="section-content">
            <h2 className="section-heading">Frequently asked questions</h2>
            <p className="section-subtitle">
              {allFaqs.length} answers about {tool.name.toLowerCase()}, privacy, formats, and upload tips.
            </p>
            <div className="grid faq-grid">
              {allFaqs.map((faq) => (
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
