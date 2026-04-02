"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

type StatsItem = {
  value: string;
  label: string;
};

type FeatureItem = {
  icon: string;
  title: string;
  description: string;
};

type StepItem = {
  title: string;
  description: string;
};

type UseCase = {
  icon: string;
  title: string;
  description: string;
};

type TrustItem = {
  title: string;
  copy: string;
};

type FAQ = {
  question: string;
  answer: string;
};

type LandingSectionsProps = {
  heroStats: StatsItem[];
  features: FeatureItem[];
  stats: StatsItem[];
  steps: StepItem[];
  useCases: UseCase[];
  seoHighlights: string[];
  faqList: FAQ[];
  trustItems: TrustItem[];
};

export default function LandingSections({
  heroStats,
  features,
  stats,
  steps,
  useCases,
  seoHighlights,
  faqList,
  trustItems,
}: LandingSectionsProps) {
  return (
    <>
      <motion.section
        className="hero"
        aria-labelledby="hero-title"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
      >
        <div className="hero-inner section-content">
          <span className="badge-pill">Trusted by creators and teams</span>
          <h1 id="hero-title" className="hero-title">
            Compress, resize, and ship lighter images without leaving your browser.
          </h1>
          <p className="hero-subtitle">
            Reduce image size online in seconds. Batch-ready, mobile-optimized, and always privacy-first.
          </p>

          <div className="hero-cta">
            <Link href="/image-compressor" className="btn btn-primary">
              Launch Compressor
            </Link>
            <Link href="/blog" className="btn btn-ghost">
              Read optimization guides
            </Link>
          </div>

          <div className="hero-stats">
            {heroStats.map((stat) => (
              <motion.div
                key={stat.label}
                className="hero-stat"
                variants={cardVariant}
                transition={{ duration: 0.4 }}
              >
                <strong>{stat.value}</strong>
                <p>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="hero-illustration" aria-hidden="true" />
      </motion.section>

      <motion.section
        className="section section-alt"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <div className="section-content">
          <p className="section-heading">Professional compressor built for modern creators</p>
          <p className="section-subtitle">
            Every section of the compressor is tuned for high Core Web Vitals while keeping the
            experience intuitive across desktop and mobile.
          </p>
          <div className="grid features-grid">
            {features.map((feature) => (
              <motion.article
                key={feature.title}
                className="feature-card"
                variants={cardVariant}
                whileHover={{ y: -8, boxShadow: "0 25px 45px rgba(15, 23, 42, 0.5)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="icon" aria-hidden="true">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        className="section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <div className="section-content stats-grid">
          {stats.map((stat) => (
            <motion.article key={stat.label} className="stat-card" variants={cardVariant}>
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="section section-alt"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <div className="section-content">
          <p className="section-heading">How the compressor works</p>
          <div className="grid steps-grid">
            {steps.map((step, index) => (
              <motion.article
                key={step.title}
                className="step-card"
                variants={cardVariant}
                transition={{ delay: index * 0.1 }}
              >
                <span className="badge-pill">Step {index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        className="section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <div className="section-content">
          <p className="section-heading">Built for real teams and creators</p>
          <div className="use-cases-grid">
            {useCases.map((useCase) => (
              <motion.article key={useCase.title} className="use-case-card" variants={cardVariant}>
                <div className="icon" aria-hidden="true">
                  {useCase.icon}
                </div>
                <h3>{useCase.title}</h3>
                <p>{useCase.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        className="section section-alt"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <div className="section-content seo-block">
          <p className="section-heading">Reduce image size without sacrificing SEO</p>
          <ul>
            {seoHighlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
          <p className="footnote">
            A lighter image library improves Core Web Vitals (LCP, CLS, INP) and boosts crawl budgets.
          </p>
        </div>
      </motion.section>

      <motion.section
        className="section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <div className="section-content">
          <p className="section-heading">Frequently asked questions</p>
          <div className="grid faq-grid">
            {faqList.map((faq) => (
              <motion.article className="faq-card" key={faq.question} variants={cardVariant}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        className="section trust-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <div className="section-content">
          <p className="section-heading">Trusted by teams who care about speed</p>
          <div className="trust-grid">
            {trustItems.map((item) => (
              <motion.article key={item.title} className="trust-card" variants={cardVariant}>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </motion.article>
            ))}
          </div>
          <div className="hero-cta" style={{ marginTop: 32 }}>
            <Link href="/image-compressor" className="btn btn-primary">
              Launch Compressor
            </Link>
            <Link href="/blog/how-to-reduce-image-size" className="btn btn-ghost">
              Read the step-by-step guide
            </Link>
          </div>
        </div>
      </motion.section>
    </>
  );
}
