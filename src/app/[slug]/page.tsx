import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import "../../styles/landing.css";
import IntentLandingPage from "@/components/IntentLandingPage";
import ToolPageTemplate from "@/components/ToolPageTemplate";
import { SITE_NAME, SITE_URL } from "@/constants";
import { getIntentPage, intentPages } from "@/lib/intentPages";
import { getToolPage, toolPages } from "@/lib/toolCatalog";
import { clampMetaText } from "@/seo/metaUtils";
import { buildSeoRichContent, buildToolSeoContext, buildIntentSeoContext } from "@/lib/seoRichContent";

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

const legacyRedirects: Record<string, string> = {
  "compress-to-20kb": "/compress-image-to-20kb",
  "compress-to-50kb": "/compress-image-to-50kb",
  "compress-to-100kb": "/compress-image-to-100kb",
  "compress-to-200kb": "/compress-image-to-200kb",
};

const indiaOnlySlugs = new Set([
  "compress-image-for-ssc-form",
  "compress-image-for-upsc-form",
]);

export function generateStaticParams() {
  return [...intentPages, ...toolPages].map((page) => ({
    slug: page.slug,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  if (legacyRedirects[params.slug]) {
    return {
      alternates: {
        canonical: legacyRedirects[params.slug],
      },
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const tool = getToolPage(params.slug);

  if (tool) {
    const seoContext = buildToolSeoContext(tool);
    const seoContent = buildSeoRichContent(seoContext);
    const title = clampMetaText(tool.title, 60);
    const description = clampMetaText(tool.description, 155);
    const keywords = Array.from(new Set([...(tool.keywords || []), ...seoContext.keywords]));

    return {
      title,
      description,
      keywords,
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

  const page = getIntentPage(params.slug);

  if (!page) {
    return {};
  }

  const seoContext = buildIntentSeoContext(page);
  const seoContent = buildSeoRichContent(seoContext);
  const title = clampMetaText(page.title, 60);
  const description = clampMetaText(page.description, 155);
  const keywords = Array.from(new Set([...seoContext.keywords, page.slug.replace(/-/g, " ")]));

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `/${page.slug}`,
    },
    robots: indiaOnlySlugs.has(page.slug)
      ? { index: false, follow: true }
      : { index: true, follow: true, googleBot },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${page.slug}`,
      siteName: SITE_NAME,
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${page.heroTitle} by ${SITE_NAME}`,
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

export default function IntentPage({ params }: Props) {
  if (legacyRedirects[params.slug]) {
    redirect(legacyRedirects[params.slug]);
  }

  const tool = getToolPage(params.slug);

  if (tool) {
    return <ToolPageTemplate tool={tool} />;
  }

  const page = getIntentPage(params.slug);

  if (!page) {
    notFound();
  }

  return <IntentLandingPage page={page} />;
}
