import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import "../../styles/landing.css";
import ToolPageTemplate from "@/components/ToolPageTemplate";
import { SITE_NAME, SITE_URL } from "@/constants";
import { getToolPage, toolPages } from "@/lib/toolCatalog";
import { clampMetaText } from "@/seo/metaUtils";
import { buildSeoRichContent, buildToolSeoContext } from "@/lib/seoRichContent";

// Shared with next.config.js — CommonJS module
// eslint-disable-next-line @typescript-eslint/no-require-imports
const {
  getConsolidationRedirect,
  KEPT_SPECIALTY_SLUGS,
} = require("@/lib/consolidationRedirects.js") as {
  getConsolidationRedirect: (slug: string) => string | null;
  KEPT_SPECIALTY_SLUGS: Set<string>;
};

const googleBot = {
  index: true,
  follow: true,
  "max-snippet": -1,
  "max-image-preview": "large" as const,
  "max-video-preview": -1,
};

type Props = {
  params: { slug: string };
};

const specialtyTools = toolPages.filter((tool) => KEPT_SPECIALTY_SLUGS.has(tool.slug));

export function generateStaticParams() {
  return specialtyTools.map((page) => ({
    slug: page.slug,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const consolidated = getConsolidationRedirect(params.slug);
  if (consolidated) {
    return {
      alternates: { canonical: consolidated.split("?")[0] || "/" },
      robots: { index: false, follow: true },
    };
  }

  const tool = getToolPage(params.slug);
  if (!tool || !KEPT_SPECIALTY_SLUGS.has(tool.slug)) {
    return {
      robots: { index: false, follow: true },
    };
  }

  const seoContext = buildToolSeoContext(tool);
  const seoContent = buildSeoRichContent(seoContext);
  const title = clampMetaText(tool.title, 60);
  const description = clampMetaText(tool.description, 155);

  return {
    title,
    description,
    alternates: {
      canonical: `/${tool.slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${tool.slug}`,
      siteName: SITE_NAME,
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${tool.name} by ${SITE_NAME}`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/og-image.png`],
    },
    other: {
      "word-count": String(seoContent.wordCount),
    },
  };
}

export default function SpecialtyToolPage({ params }: Props) {
  const consolidated = getConsolidationRedirect(params.slug);
  if (consolidated) {
    redirect(consolidated);
  }

  const tool = getToolPage(params.slug);
  if (!tool || !KEPT_SPECIALTY_SLUGS.has(tool.slug)) {
    notFound();
  }

  return <ToolPageTemplate tool={tool} />;
}
