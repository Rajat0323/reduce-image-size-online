import Script from "next/script";

import MlToOzCalculator from "@/components/MlToOzCalculator";

const faqList = [
  {
    question: "How many oz is 100 ml?",
    answer: "100 ml equals about 3.3814 US fluid ounces.",
  },
  {
    question: "Is 30 ml equal to 1 oz?",
    answer: "30 ml is about 1.0144 US fluid ounces, so it is slightly more than 1 oz.",
  },
  {
    question: "What is the formula to convert ml to oz?",
    answer: "Multiply milliliters by 0.033814 to convert to US fluid ounces.",
  },
  {
    question: "Should I use US oz or UK oz?",
    answer: "For most US recipe, nutrition, and bottle conversions, use US fluid ounces.",
  },
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

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "ML to Oz Calculator",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "Free ml to oz calculator for converting milliliters to US fluid ounces, UK fluid ounces, cups, tablespoons, and teaspoons.",
};

export default function MlToOzPage() {
  return (
    <>
      <Script id="ml-to-oz-faq" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqSchema)}
      </Script>
      <Script id="ml-to-oz-software" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(softwareSchema)}
      </Script>

      <main className="hub-page">
        <section className="hero hero-compact">
          <div className="hero-inner section-content">
            <span className="badge-pill">US conversion calculator</span>
            <h1 className="hero-title">ML to Oz Calculator</h1>
            <p className="hero-subtitle">
              Convert milliliters to ounces instantly with a clean US-focused calculator for
              recipes, drinks, bottles, nutrition labels, and packaging measurements.
            </p>
          </div>
          <div className="hero-illustration" aria-hidden="true" />
        </section>

        <section className="section">
          <div className="section-content tool-layout">
            <div className="tool-layout-main">
              <MlToOzCalculator />
            </div>

            <aside className="tool-layout-sidebar">
              <div className="tool-surface sidebar-list">
                <h3>Why users choose this calculator</h3>
                <ul className="feature-list">
                  <li>Fast ml to oz conversion for US search intent</li>
                  <li>Shows US fluid ounces and UK fluid ounces</li>
                  <li>Includes cups, tablespoons, and teaspoons</li>
                  <li>Helpful for cooking, bottles, and packaging</li>
                </ul>
              </div>
            </aside>
          </div>
        </section>

        <section className="section section-alt">
          <div className="section-content seo-block">
            <p className="section-heading">How to convert ml to oz</p>
            <p>
              Multiply milliliters by 0.033814 to get US fluid ounces. This is the most useful
              formula for US recipes, drink measurements, supplement bottles, and product labels.
            </p>
            <p>
              Common conversions include 30 ml to oz, 50 ml to oz, 100 ml to oz, 250 ml to oz, and
              500 ml to oz. This calculator helps users check those values instantly without doing
              manual math.
            </p>
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
      </main>
    </>
  );
}
