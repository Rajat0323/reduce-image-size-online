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
    "ReduceImageSize is a global image tool hub for compression, resizing, conversion, cropping, background removal, metadata stripping, HEIC conversion, and platform-specific uploads.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Compress JPG, PNG, and WebP images",
    "Convert HEIC to JPG in the browser",
    "Resize by dimensions, percentage, and presets",
    "Convert between JPG, PNG, and WebP",
    "Crop image with aspect presets",
    "Bulk image compression",
    "Rotate and flip image",
    "Background remover",
    "Image upscaler",
    "Remove image metadata and EXIF",
    "Platform presets for Instagram, WhatsApp, Shopify, and more",
    "Browser-based private processing",
  ],
};
