const siteUrl = "https://www.reduceimagesizeonline.com";

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ReduceImageSize",
  url: siteUrl,
  inLanguage: "en-IN",
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ReduceImageSize",
  url: siteUrl,
  logo: `${siteUrl}/images/logo.svg`,
  sameAs: [],
};

export const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "ReduceImageSize",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Web Browser",
  description:
    "ReduceImageSize is an India-focused image tool hub for compression, resizing, conversion, cropping, rotate and flip edits, background removal, and image upscaling.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Compress JPG, PNG, and WEBP images",
    "Resize by dimensions, percentage, and presets",
    "Convert between JPG, PNG, and WebP",
    "Crop image with aspect presets",
    "Bulk image compression",
    "Rotate and flip image",
    "Background remover",
    "Image upscaler",
    "Download single image or ZIP file",
    "Browser-based processing",
    "Image compressor to 20KB online",
  ],
};
