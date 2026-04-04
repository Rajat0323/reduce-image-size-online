import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import "../../styles/landing.css";
import IntentLandingPage from "@/components/IntentLandingPage";
import ToolPageTemplate from "@/components/ToolPageTemplate";
import { SITE_NAME, SITE_URL } from "@/constants";
import { getIntentPage, intentPages } from "@/lib/intentPages";
import { getToolPage, toolPages } from "@/lib/toolCatalog";

type Props = {
  params: { slug: string };
};

const legacyRedirects: Record<string, string> = {
  "compress-to-20kb": "/compress-image-to-20kb",
  "compress-to-50kb": "/compress-image-to-50kb",
  "compress-to-100kb": "/compress-image-to-100kb",
  "compress-to-200kb": "/compress-image-to-200kb",
};

function clampMetaText(value: string, maxLength: number) {
  if (value.length <= maxLength) {
    return value;
  }

  const trimmed = value.slice(0, maxLength - 1);
  const lastSpace = trimmed.lastIndexOf(" ");
  return `${trimmed.slice(0, lastSpace > 40 ? lastSpace : trimmed.length).trim()}...`;
}

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
    const title = clampMetaText(tool.title, 60);
    const description = clampMetaText(tool.description, 155);

    return {
      title,
      description,
      keywords: tool.keywords,
      alternates: {
        canonical: `/${tool.slug}`,
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
    };
  }

  const page = getIntentPage(params.slug);

  if (!page) {
    return {};
  }

  const title = clampMetaText(page.title, 60);
  const description = clampMetaText(page.description, 155);

  return {
    title,
    description,
    alternates: {
      canonical: `/${page.slug}`,
    },
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
