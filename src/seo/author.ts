import { SITE_NAME, SITE_URL } from "@/constants";

export const SITE_AUTHOR = {
  name: "Rajat Gupta",
  jobTitle: "Founder & Developer",
  organization: SITE_NAME,
  organizationUrl: SITE_URL,
  email: "rajat0323@gmail.com",
  github: "https://github.com/rajat0323",
  aboutUrl: `${SITE_URL}/about`,
  contactUrl: `${SITE_URL}/contact`,
  image: `${SITE_URL}/og-image.png`,
  bioShort:
    "Rajat Gupta built ReduceImageSize as a private, browser-based PDF to image converter.",
  bioLong:
    "Rajat Gupta is the founder and developer behind ReduceImageSize — a free browser tool for converting PDF pages to PNG, JPG, or WEBP without uploading files to a server.",
  experience: [
    "Built browser-based PDF to image conversion with local processing",
    "Maintains ReduceImageSize as a focused single-purpose converter",
  ],
  expertise: [
    "PDF to image conversion",
    "Browser-based file processing",
    "PNG, JPG, and WEBP export",
  ],
} as const;

export function buildPersonAuthorSchema(options?: { url?: string }) {
  return {
    "@type": "Person" as const,
    "@id": `${SITE_URL}/#author`,
    name: SITE_AUTHOR.name,
    jobTitle: SITE_AUTHOR.jobTitle,
    url: options?.url || SITE_AUTHOR.aboutUrl,
    email: SITE_AUTHOR.email,
    sameAs: [SITE_AUTHOR.github],
    worksFor: {
      "@type": "Organization",
      name: SITE_AUTHOR.organization,
      url: SITE_AUTHOR.organizationUrl,
    },
  };
}

export function buildArticleAuthorSchema() {
  return buildPersonAuthorSchema();
}

export function buildPublisherSchema() {
  return {
    "@type": "Organization" as const,
    name: SITE_AUTHOR.organization,
    url: SITE_AUTHOR.organizationUrl,
    logo: {
      "@type": "ImageObject" as const,
      url: `${SITE_URL}/images/logo.svg`,
    },
  };
}
