import Link from "next/link";
import Script from "next/script";
import { Suspense } from "react";

import ImageToolWorkspace from "@/components/ImageToolWorkspace";
import AuthorBio from "@/components/AuthorBio";
import SeoRichContentBlock from "@/components/SeoRichContent";
import { SITE_NAME, SITE_URL } from "@/constants";
import { buildArticleAuthorSchema, buildPublisherSchema } from "@/seo/author";
import { parseToolHref } from "@/lib/parseToolHref";
import type { IntentPage } from "@/lib/intentPages";
import { buildIntentSeoContext, buildSeoRichContent } from "@/lib/seoRichContent";

type IntentLandingPageProps = {
  page: IntentPage;
};

export default function IntentLandingPage({ page }: IntentLandingPageProps) {
  const parsedTool = parseToolHref(page.toolHref);
  const seoContext = buildIntentSeoContext(page);
  const seoContent = buildSeoRichContent(seoContext);
  const allFaqs = [...page.faqList, ...seoContent.extendedFaqs];

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
      {
        "@type": "ListItem",
        position: 2,
        name: page.heroTitle,
        item: `${SITE_URL}/${page.slug}`,
      },
    ],
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: page.title.split("|")[0].trim(),
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web Browser",
    url: `${SITE_URL}/${page.slug}`,
    description: page.description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: page.heroTitle,
    description: page.description,
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
    headline: page.title,
    description: page.description,
    author: buildArticleAuthorSchema(),
    publisher: buildPublisherSchema(),
    wordCount: seoContent.wordCount,
  };

  return (
    <>
      <Script id={`${page.slug}-faq`} type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqSchema)}
      </Script>
      <Script id={`${page.slug}-breadcrumbs`} type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(breadcrumbSchema)}
      </Script>
      <Script id={`${page.slug}-software`} type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(softwareSchema)}
      </Script>
      <Script id={`${page.slug}-howto`} type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(howToSchema)}
      </Script>
      <Script id={`${page.slug}-article`} type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(articleSchema)}
      </Script>

      <main className="landing tool-page tool-page-upload-first">
        {parsedTool && (
          <section className="tool-upload-hero" aria-label={`${page.heroTitle} upload workspace`}>
            <div className="section-content">
              <Suspense fallback={<div className="tool-surface">Loading workspace...</div>}>
                <ImageToolWorkspace
                  mode={parsedTool.mode}
                  defaultTargetKB={parsedTool.defaultTargetKB}
                  initialWidth={parsedTool.initialWidth}
                  initialHeight={parsedTool.initialHeight}
                  initialFormat={parsedTool.initialFormat}
                  toolTitle={page.heroTitle}
                  toolBadge="Intent-focused image tool"
                />
              </Suspense>
              <div className="tool-page-meta-below">
                <p className="tool-page-lead">{page.heroCopy}</p>
                <div className="hero-stats intent-highlight-row">
                  {page.highlights.map((highlight) => (
                    <div key={highlight} className="hero-stat compact-stat">
                      <strong>{SITE_NAME}</strong>
                      <p>{highlight}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {!parsedTool && (
          <section className="tool-page-header intent-tool-header">
            <div className="section-content">
              <span className="badge-pill">Intent-focused image tool</span>
              <h1 className="tool-page-title">{page.heroTitle}</h1>
              <p className="tool-page-lead">{page.heroCopy}</p>
            </div>
          </section>
        )}

        <section className="section section-alt">
          <div className="section-content seo-block">
            <h2 className="section-heading">{page.introTitle}</h2>
            <p>{page.introCopy}</p>
          </div>
        </section>

        <section className="section">
          <div className="section-content">
            <h2 className="section-heading">Why this workflow works</h2>
            <div className="grid features-grid">
              {page.benefits.map((benefit) => (
                <article key={benefit.title} className="feature-card">
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-alt">
          <div className="section-content">
            <h2 className="section-heading">Common scenarios</h2>
            <div className="use-cases-grid">
              {page.useCases.map((useCase) => (
                <article key={useCase.title} className="use-case-card">
                  <h3>{useCase.title}</h3>
                  <p>{useCase.description}</p>
                </article>
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
            <AuthorBio />
          </div>
        </section>

        <section className="section section-compact">
          <div className="section-content">
            <h2 className="section-heading">Frequently asked questions</h2>
            <p className="section-subtitle">
              {allFaqs.length} answers about {page.heroTitle.toLowerCase()}, privacy, and upload tips.
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

        <section className="section trust-section">
          <div className="section-content">
            <h2 className="section-heading">Related tools and guides</h2>
            <div className="intent-link-grid">
              {page.relatedLinks.map((link) => (
                <Link key={link.href} href={link.href} className="intent-link-card">
                  <strong>{link.label}</strong>
                  <span>Explore this workflow</span>
                </Link>
              ))}
            </div>
            <div className="hero-cta" style={{ marginTop: 32 }}>
              <Link href={page.toolHref} className="btn btn-primary">
                {page.ctaLabel}
              </Link>
              <Link href="/blog" className="btn btn-ghost">
                Read more guides
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
