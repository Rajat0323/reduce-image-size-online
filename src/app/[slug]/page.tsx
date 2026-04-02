import type { Metadata } from "next";
import { notFound } from "next/navigation";

import "../../styles/landing.css";
import IntentLandingPage from "@/components/IntentLandingPage";
import ToolPageTemplate from "@/components/ToolPageTemplate";
import { SITE_NAME, SITE_URL } from "@/constants";
import { getIntentPage, intentPages } from "@/lib/intentPages";
import { getToolPage, toolPages } from "@/lib/toolCatalog";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return [...intentPages, ...toolPages].map((page) => ({
    slug: page.slug,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const tool = getToolPage(params.slug);

  if (tool) {
    return {
      title: tool.title,
      description: tool.description,
      alternates: {
        canonical: `/${tool.slug}`,
      },
      openGraph: {
        title: tool.title,
        description: tool.description,
        url: `${SITE_URL}/${tool.slug}`,
        siteName: SITE_NAME,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: tool.title,
        description: tool.description,
      },
    };
  }

  const page = getIntentPage(params.slug);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `/${page.slug}`,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${SITE_URL}/${page.slug}`,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
    },
  };
}

export default function IntentPage({ params }: Props) {
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
