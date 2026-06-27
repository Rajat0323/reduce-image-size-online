import { SITE_URL } from "@/constants";

export type BlogTopic = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  h1: string;
  primaryTool: { slug: string; label: string };
  relatedTools: { slug: string; label: string }[];
  regions: string[];
  searchIntent: string;
  audience: string;
};

export const blogTopicQueue: BlogTopic[] = [
  {
    slug: "compress-image-for-amazon-listings-usa-guide",
    title: "Compress Images for Amazon Listings USA | Free Online Guide 2026",
    description:
      "Compress product photos for Amazon USA listings. Free browser tool guide for sellers — hit file-size limits, improve load speed, and pass upload checks.",
    keywords: [
      "compress image for amazon",
      "amazon product photo size",
      "image compressor usa",
      "reduce image size online",
      "amazon listing photo requirements",
    ],
    h1: "How to Compress Images for Amazon Listings in the USA",
    primaryTool: { slug: "compress-image-for-amazon", label: "Compress for Amazon" },
    relatedTools: [
      { slug: "image-compressor", label: "Image Compressor" },
      { slug: "compress-image-to-200kb", label: "Compress to 200KB" },
      { slug: "background-remover", label: "Background Remover" },
      { slug: "png-to-jpg-converter", label: "PNG to JPG" },
      { slug: "compress-image-for-shopify", label: "Compress for Shopify" },
    ],
    regions: ["USA", "Global"],
    searchIntent: "Amazon sellers in the United States need fast, compliant product photos",
    audience: "Amazon FBA sellers, ecommerce teams, and marketplace photographers",
  },
  {
    slug: "linkedin-profile-photo-compress-guide-uk-usa",
    title: "LinkedIn Profile Photo Size Guide | Compress for UK & USA Uploads",
    description:
      "Compress and resize LinkedIn profile photos for UK and USA users. Free online guide with exact workflows, SEO tips, and browser-based tools.",
    keywords: [
      "linkedin profile photo size",
      "compress image for linkedin",
      "profile photo compressor",
      "image resizer online uk",
      "linkedin photo requirements 2026",
    ],
    h1: "LinkedIn Profile Photo Compression Guide for UK and USA Professionals",
    primaryTool: { slug: "compress-image-for-linkedin", label: "Compress for LinkedIn" },
    relatedTools: [
      { slug: "compress-image-to-100kb", label: "Compress to 100KB" },
      { slug: "resize-image-to-400x400", label: "Resize to 400×400" },
      { slug: "crop-image", label: "Crop Image" },
      { slug: "background-remover", label: "Background Remover" },
      { slug: "image-resizer", label: "Image Resizer" },
    ],
    regions: ["USA", "UK", "Global"],
    searchIntent: "Professionals uploading headshots to LinkedIn across the US and UK",
    audience: "Job seekers, recruiters, consultants, and remote workers",
  },
  {
    slug: "wordpress-image-compression-seo-guide-global",
    title: "WordPress Image Compression SEO Guide | Faster Sites USA & Global",
    description:
      "Compress images for WordPress before upload. Improve Core Web Vitals, Lighthouse scores, and Google rankings with free browser tools.",
    keywords: [
      "compress image for wordpress",
      "wordpress image seo",
      "reduce image size website",
      "core web vitals images",
      "webp wordpress guide",
    ],
    h1: "WordPress Image Compression for SEO: USA and Global Publisher Guide",
    primaryTool: { slug: "compress-image-for-wordpress", label: "Compress for WordPress" },
    relatedTools: [
      { slug: "jpg-to-webp-converter", label: "JPG to WebP" },
      { slug: "compress-image-for-website", label: "Compress for Website" },
      { slug: "compress-image-to-200kb", label: "Compress to 200KB" },
      { slug: "image-compressor", label: "Image Compressor" },
      { slug: "remove-image-metadata", label: "Remove Metadata" },
    ],
    regions: ["USA", "UK", "Global"],
    searchIntent: "Bloggers and agencies optimizing WordPress sites for Google",
    audience: "WordPress developers, content marketers, and small business owners",
  },
  {
    slug: "jpg-to-webp-converter-seo-performance-guide",
    title: "JPG to WebP Converter Guide | Website Speed & Google SEO 2026",
    description:
      "Convert JPG to WebP for faster websites in the USA, UK, and worldwide. Free browser converter guide with SEO, Core Web Vitals, and upload tips.",
    keywords: [
      "jpg to webp converter",
      "convert jpg to webp online",
      "webp seo benefits",
      "faster website images",
      "image format converter free",
    ],
    h1: "JPG to WebP Conversion for Website Speed and Google SEO",
    primaryTool: { slug: "jpg-to-webp-converter", label: "JPG to WebP Converter" },
    relatedTools: [
      { slug: "image-converter", label: "Image Converter" },
      { slug: "png-to-webp-converter", label: "PNG to WebP" },
      { slug: "webp-to-jpg-converter", label: "WebP to JPG" },
      { slug: "compress-image-for-website", label: "Compress for Website" },
      { slug: "image-compressor", label: "Image Compressor" },
    ],
    regions: ["USA", "UK", "Global"],
    searchIntent: "Developers and marketers converting hero images to WebP",
    audience: "Web developers, SEO specialists, and performance engineers",
  },
  {
    slug: "instagram-photo-compress-usa-uk-guide",
    title: "Compress Photos for Instagram USA & UK | Free Online Guide",
    description:
      "Compress and resize Instagram photos for USA and UK creators. Keep quality after platform re-compression with free browser tools.",
    keywords: [
      "compress image for instagram",
      "instagram photo size 2026",
      "resize image 1080x1080",
      "instagram compressor online",
      "social media image guide",
    ],
    h1: "Compress and Resize Instagram Photos for USA and UK Creators",
    primaryTool: { slug: "compress-image-for-instagram", label: "Compress for Instagram" },
    relatedTools: [
      { slug: "resize-image-to-1080x1080", label: "Resize to 1080×1080" },
      { slug: "crop-image", label: "Crop Image" },
      { slug: "compress-image-to-200kb", label: "Compress to 200KB" },
      { slug: "image-resizer", label: "Image Resizer" },
      { slug: "compress-image-for-facebook", label: "Compress for Facebook" },
    ],
    regions: ["USA", "UK", "Global"],
    searchIntent: "Creators preparing feed posts and ads for Instagram",
    audience: "Influencers, social media managers, and small brands",
  },
  {
    slug: "heic-to-jpg-iphone-usa-upload-guide",
    title: "HEIC to JPG Converter Guide for iPhone Users in the USA",
    description:
      "Convert iPhone HEIC photos to JPG for USA forms, job portals, and websites. Free private browser conversion — no upload to servers.",
    keywords: [
      "heic to jpg converter",
      "convert iphone photo to jpg",
      "heic upload rejected",
      "image converter usa",
      "iphone photo format fix",
    ],
    h1: "HEIC to JPG for iPhone Users: USA Upload and Form Guide",
    primaryTool: { slug: "heic-to-jpg-converter", label: "HEIC to JPG Converter" },
    relatedTools: [
      { slug: "heic-to-png-converter", label: "HEIC to PNG" },
      { slug: "image-converter", label: "Image Converter" },
      { slug: "compress-image-to-100kb", label: "Compress to 100KB" },
      { slug: "compress-image-for-job-application", label: "Compress for Job Application" },
      { slug: "image-compressor", label: "Image Compressor" },
    ],
    regions: ["USA", "Global"],
    searchIntent: "iPhone users blocked by portals that reject HEIC",
    audience: "Students, job applicants, and mobile-first uploaders",
  },
  {
    slug: "shopify-product-image-compress-global-guide",
    title: "Shopify Product Image Compression Guide | USA & Global Stores",
    description:
      "Compress Shopify product images for faster stores in the USA, UK, and worldwide. Free tools, SEO tips, and collection grid workflows.",
    keywords: [
      "compress image for shopify",
      "shopify product photo size",
      "ecommerce image optimization",
      "shopify page speed",
      "product image compressor",
    ],
    h1: "Shopify Product Image Compression for USA and Global Stores",
    primaryTool: { slug: "compress-image-for-shopify", label: "Compress for Shopify" },
    relatedTools: [
      { slug: "bulk-image-compressor", label: "Bulk Compressor" },
      { slug: "compress-image-for-amazon", label: "Compress for Amazon" },
      { slug: "background-remover", label: "Background Remover" },
      { slug: "compress-image-to-200kb", label: "Compress to 200KB" },
      { slug: "png-to-jpg-converter", label: "PNG to JPG" },
    ],
    regions: ["USA", "UK", "Global"],
    searchIntent: "Shopify merchants improving collection page speed",
    audience: "DTC brands, Shopify agencies, and catalog managers",
  },
  {
    slug: "youtube-thumbnail-resize-compress-guide",
    title: "YouTube Thumbnail Size & Compression Guide | USA Creators 2026",
    description:
      "Resize and compress YouTube thumbnails for USA and global creators. Hit 1280×720 specs, stay sharp, and load fast with free tools.",
    keywords: [
      "youtube thumbnail size",
      "resize image for youtube",
      "compress youtube thumbnail",
      "1280x720 thumbnail",
      "creator image tools",
    ],
    h1: "YouTube Thumbnail Resize and Compression Guide for Creators",
    primaryTool: { slug: "resize-image-for-youtube-thumbnail", label: "YouTube Thumbnail Resizer" },
    relatedTools: [
      { slug: "resize-image-to-1920x1080", label: "Resize to 1920×1080" },
      { slug: "compress-image-to-200kb", label: "Compress to 200KB" },
      { slug: "crop-image", label: "Crop Image" },
      { slug: "image-compressor", label: "Image Compressor" },
      { slug: "compress-image-for-website", label: "Compress for Website" },
    ],
    regions: ["USA", "UK", "Global"],
    searchIntent: "YouTube creators optimizing thumbnail file size and dimensions",
    audience: "YouTubers, video marketers, and education channels",
  },
  {
    slug: "core-web-vitals-image-compress-usa-guide",
    title: "Core Web Vitals Image Optimization USA | Compress for Google SEO",
    description:
      "Improve Core Web Vitals by compressing images for US and global websites. LCP, CLS, and SEO guide with free ReduceImageSize tools.",
    keywords: [
      "core web vitals images",
      "lcp image optimization",
      "compress images for seo usa",
      "google page experience",
      "website speed images",
    ],
    h1: "Core Web Vitals Image Optimization for USA Websites",
    primaryTool: { slug: "compress-image-for-website", label: "Compress for Website" },
    relatedTools: [
      { slug: "jpg-to-webp-converter", label: "JPG to WebP" },
      { slug: "compress-image-to-200kb", label: "Compress to 200KB" },
      { slug: "image-resizer", label: "Image Resizer" },
      { slug: "compress-image-for-wordpress", label: "Compress for WordPress" },
      { slug: "image-compressor", label: "Image Compressor" },
    ],
    regions: ["USA", "UK", "Global"],
    searchIntent: "Site owners fixing LCP and performance in Search Console",
    audience: "SEO managers, developers, and marketing leads",
  },
  {
    slug: "ebay-listing-photo-compress-usa-guide",
    title: "Compress Photos for eBay Listings USA | Free Seller Guide",
    description:
      "Compress eBay listing photos for USA sellers. Faster galleries, mobile buyers, and upload-friendly file sizes with free browser tools.",
    keywords: [
      "compress image for ebay",
      "ebay photo requirements",
      "ebay listing image size",
      "marketplace photo compressor",
      "usa seller image guide",
    ],
    h1: "Compress eBay Listing Photos for USA Sellers",
    primaryTool: { slug: "compress-image-for-ebay", label: "Compress for eBay" },
    relatedTools: [
      { slug: "compress-image-for-amazon", label: "Compress for Amazon" },
      { slug: "background-remover", label: "Background Remover" },
      { slug: "compress-image-to-200kb", label: "Compress to 200KB" },
      { slug: "image-compressor", label: "Image Compressor" },
      { slug: "resize-image-to-800x800", label: "Resize to 800×800" },
    ],
    regions: ["USA", "Global"],
    searchIntent: "eBay sellers optimizing listing galleries",
    audience: "Resellers, thrift flippers, and marketplace operators",
  },
  {
    slug: "whatsapp-image-compress-uk-global-guide",
    title: "Compress Images for WhatsApp UK & Global | Free Online Guide",
    description:
      "Compress images for WhatsApp sharing in the UK, USA, and worldwide. Send faster on mobile data without losing readable quality.",
    keywords: [
      "compress image for whatsapp",
      "whatsapp photo size limit",
      "reduce image size mobile",
      "whatsapp image compressor uk",
      "send photos faster whatsapp",
    ],
    h1: "Compress Images for WhatsApp: UK, USA, and Global Mobile Guide",
    primaryTool: { slug: "compress-image-for-whatsapp", label: "Compress for WhatsApp" },
    relatedTools: [
      { slug: "compress-image-to-100kb", label: "Compress to 100KB" },
      { slug: "resize-image-to-800x800", label: "Resize to 800×800" },
      { slug: "image-compressor", label: "Image Compressor" },
      { slug: "compress-image-for-instagram", label: "Compress for Instagram" },
      { slug: "heic-to-jpg-converter", label: "HEIC to JPG" },
    ],
    regions: ["UK", "USA", "Global"],
    searchIntent: "Mobile users sharing photos on slow networks",
    audience: "General mobile users, families, and field sales teams",
  },
  {
    slug: "passport-photo-compress-usa-uk-guide",
    title: "Passport Photo Size & Compression USA & UK | Free Online Guide",
    description:
      "Resize and compress passport photos for USA and UK online applications. Free tools, dimension tips, and KB target workflows.",
    keywords: [
      "passport photo size",
      "compress passport photo online",
      "passport photo 200kb",
      "usa passport photo digital",
      "uk passport photo requirements",
    ],
    h1: "Passport Photo Compression for USA and UK Online Applications",
    primaryTool: { slug: "passport-photo-size-maker", label: "Passport Photo Maker" },
    relatedTools: [
      { slug: "resize-image-to-passport-size", label: "Passport Size Resize" },
      { slug: "compress-image-to-50kb", label: "Compress to 50KB" },
      { slug: "compress-image-to-100kb", label: "Compress to 100KB" },
      { slug: "background-remover", label: "Background Remover" },
      { slug: "crop-image", label: "Crop Image" },
    ],
    regions: ["USA", "UK", "Global"],
    searchIntent: "Applicants preparing digital passport photos",
    audience: "Travelers, immigrants, and appointment schedulers",
  },
];

export function toolUrl(slug: string) {
  return `${SITE_URL}/${slug}`;
}

export function blogUrl(slug: string) {
  return `${SITE_URL}/blog/${slug}`;
}
