import Script from "next/script";

import { SITE_NAME, SITE_URL } from "@/constants";
import type { SeoRichContent } from "@/lib/seoRichContent";

type FaqItem = { question: string; answer: string };

type ToolPageSchemasProps = {
  slug: string;
  title: string;
  name: string;
  description: string;
  heroTitle: string;
  faqs: FaqItem[];
  seoContent: SeoRichContent & { wordCount: number };
};

export default function ToolPageSchemas({
  slug,
  title,
  name,
  description,
  heroTitle,
  faqs,
  seoContent,
}: ToolPageSchemasProps) {
  const pageUrl = `${SITE_URL}/${slug}`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
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
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: heroTitle, item: pageUrl },
    ],
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web Browser",
    url: pageUrl,
    description,
    browserRequirements: "Requires JavaScript. Works in Chrome, Firefox, Safari, and Edge.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
      "Local browser processing",
      "No account required",
      "JPG, PNG, WebP, HEIC support",
      "Instant preview and download",
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to ${name.toLowerCase()}`,
    description,
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
    headline: title,
    description,
    url: pageUrl,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    wordCount: seoContent.wordCount,
    inLanguage: "en",
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: heroTitle,
    description,
    url: pageUrl,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    primaryImageOfPage: { "@type": "ImageObject", url: `${SITE_URL}/og-image.png` },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".tool-page-title", ".seo-rich-article h2", ".faq-card h3"],
    },
  };

  return (
    <>
      <Script id={`${slug}-faq`} type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqSchema)}
      </Script>
      <Script id={`${slug}-breadcrumbs`} type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(breadcrumbSchema)}
      </Script>
      <Script id={`${slug}-software`} type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(softwareSchema)}
      </Script>
      <Script id={`${slug}-howto`} type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(howToSchema)}
      </Script>
      <Script id={`${slug}-article`} type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(articleSchema)}
      </Script>
      <Script id={`${slug}-webpage`} type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(webPageSchema)}
      </Script>
    </>
  );
}
