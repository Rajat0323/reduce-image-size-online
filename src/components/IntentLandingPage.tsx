import Link from "next/link";
import Script from "next/script";

import { SITE_NAME, SITE_URL } from "@/constants";
import type { IntentPage } from "@/lib/intentPages";

type IntentLandingPageProps = {
  page: IntentPage;
};

export default function IntentLandingPage({ page }: IntentLandingPageProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqList.map((faq) => ({
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

  return (
    <>
      <Script id={`${page.slug}-faq`} type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqSchema)}
      </Script>
      <Script id={`${page.slug}-breadcrumbs`} type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(breadcrumbSchema)}
      </Script>

      <main className="landing">
        <section className="hero">
          <div className="hero-inner section-content">
            <span className="badge-pill">Intent-focused image tool</span>
            <h1 className="hero-title">{page.heroTitle}</h1>
            <p className="hero-subtitle">{page.heroCopy}</p>
            <div className="hero-cta">
              <Link href={page.toolHref} className="btn btn-primary">
                {page.ctaLabel}
              </Link>
              <Link href="/image-compressor" className="btn btn-ghost">
                Open full compressor
              </Link>
            </div>
            <div className="hero-stats">
              {page.highlights.map((highlight) => (
                <div key={highlight} className="hero-stat">
                  <strong>{SITE_NAME}</strong>
                  <p>{highlight}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-illustration" aria-hidden="true" />
        </section>

        <section className="section section-alt">
          <div className="section-content seo-block">
            <p className="section-heading">{page.introTitle}</p>
            <p>{page.introCopy}</p>
          </div>
        </section>

        <section className="section">
          <div className="section-content">
            <p className="section-heading">Why this workflow works</p>
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
            <p className="section-heading">Common scenarios</p>
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

        <section className="section">
          <div className="section-content">
            <p className="section-heading">Frequently asked questions</p>
            <div className="grid faq-grid">
              {page.faqList.map((faq) => (
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
            <p className="section-heading">Related tools and guides</p>
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
