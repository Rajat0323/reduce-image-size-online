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
    "Rajat Gupta built ReduceImageSize after repeatedly hitting strict upload limits on forms, marketplaces, and CMS dashboards. He writes practical guides based on real testing in the browser.",
  bioLong:
    "Rajat Gupta is the founder and developer behind ReduceImageSize. He has spent years building browser-based image tools for sellers, students, and website owners who need reliable compression, resizing, and format conversion without installing desktop software. Every guide on this site is written from hands-on testing with the live tools — not generic AI filler.",
  experience: [
    "Built 60+ live image tool pages with in-browser processing (no server uploads for standard editing)",
    "Tested upload workflows for Amazon, LinkedIn, WordPress, Instagram, passport portals, and exact-KB government forms",
    "Maintains ReduceImageSize guides, FAQ content, and tool documentation for USA, UK, and global users",
  ],
  expertise: [
    "Image compression and exact-KB targeting",
    "Format conversion (JPG, PNG, WebP, HEIC)",
    "Resize, crop, and background removal workflows",
    "Website image performance and Core Web Vitals",
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
