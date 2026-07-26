import { buildPersonAuthorSchema, SITE_AUTHOR } from "./author";

const siteUrl = "https://www.reduceimagesizeonline.com";

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: "ReduceImageSize",
  url: siteUrl,
  inLanguage: "en",
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "ReduceImageSize",
  url: siteUrl,
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/images/logo.svg`,
  },
  founder: buildPersonAuthorSchema({ url: `${siteUrl}/about` }),
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: SITE_AUTHOR.email,
    availableLanguage: "English",
  },
};

export const personSchema = {
  "@context": "https://schema.org",
  ...buildPersonAuthorSchema({ url: `${siteUrl}/about` }),
  description: SITE_AUTHOR.bioLong,
  knowsAbout: SITE_AUTHOR.expertise,
};

export const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${siteUrl}/#software`,
  name: "ReduceImageSize",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Web Browser",
  url: siteUrl,
  image: `${siteUrl}/og-image.png`,
  description:
    "ReduceImageSize is a free browser-based PDF to image converter. Convert PDF pages to PNG, JPG, or WEBP privately on your device.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Convert PDF to PNG",
    "Convert PDF to JPG",
    "Convert PDF to WEBP",
    "Choose all pages or a page range",
    "Download single images or ZIP",
    "Browser-based private processing",
  ],
};
