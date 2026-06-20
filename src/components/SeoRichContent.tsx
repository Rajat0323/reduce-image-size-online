import Link from "next/link";

import type { SeoRichContent } from "@/lib/seoRichContent";

type SeoRichContentProps = {
  content: SeoRichContent;
  toolAnchorId?: string;
};

export default function SeoRichContentBlock({ content, toolAnchorId = "tool-workspace" }: SeoRichContentProps) {
  return (
    <article className="seo-rich-article">
      {content.sections.map((section) => {
        const HeadingTag = section.level === 2 ? "h2" : "h3";
        return (
          <section key={section.heading} className="seo-rich-section">
            <HeadingTag className={section.level === 2 ? "section-heading" : "seo-rich-h3"}>
              {section.heading}
            </HeadingTag>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
            {section.bullets && (
              <ul className="seo-rich-list">
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            {section.steps && (
              <ol className="seo-rich-steps">
                {section.steps.map((step, index) => (
                  <li key={step.title}>
                    <strong>
                      Step {index + 1}: {step.title}
                    </strong>
                    <p>{step.body}</p>
                  </li>
                ))}
              </ol>
            )}
          </section>
        );
      })}

      <section className="seo-rich-section">
        <h2 className="section-heading">Extended FAQ</h2>
        <div className="grid faq-grid">
          {content.extendedFaqs.map((faq) => (
            <article key={faq.question} className="faq-card">
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
        <p className="seo-rich-cta">
          Ready to process your image?{" "}
          <Link href={`#${toolAnchorId}`} className="seo-inline-link">
            Jump to the tool
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
