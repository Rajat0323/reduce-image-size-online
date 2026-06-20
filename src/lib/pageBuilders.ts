import type { IntentPage } from "./intentPages";
import type { ToolPage } from "./toolCatalog";

type ConverterSpec = {
  slug: string;
  from: string;
  to: string;
  format: string;
  title: string;
  description: string;
  heroTitle: string;
  heroCopy: string;
  introCopy: string;
  related: { href: string; label: string }[];
};

type PlatformSpec = {
  slug: string;
  platform: string;
  targetKb: number;
  format: string;
  title: string;
  description: string;
  heroTitle: string;
  heroCopy: string;
  introCopy: string;
  useCases: { title: string; description: string }[];
  related: { href: string; label: string }[];
};

type ResizeSpec = {
  slug: string;
  width: number;
  height: number;
  label: string;
  title: string;
  description: string;
  heroTitle: string;
  heroCopy: string;
  introCopy: string;
  related: { href: string; label: string }[];
};

const defaultBenefits = [
  { title: "Private browser workflow", description: "Images stay on your device while you compress, convert, or resize them." },
  { title: "Instant preview", description: "Compare original and output size before you download the final file." },
  { title: "No account required", description: "Open the tool, upload, and download without sign-up friction." },
];

const defaultFaqs = (subject: string) => [
  { question: `Is this ${subject} tool free?`, answer: "Yes. The tool is free and runs entirely in your browser." },
  { question: "Are my files uploaded to a server?", answer: "No. Processing happens locally on your device for better privacy." },
  { question: "Which formats are supported?", answer: "You can work with JPG, PNG, and WebP in most workflows on this site." },
];

export function buildExactKbTool(kb: number, angle: string): ToolPage {
  const isMb = kb >= 1024;
  const slug = isMb ? "compress-image-to-1mb" : `compress-image-to-${kb}kb`;
  const label = isMb ? "1MB" : `${kb}KB`;
  const target = isMb ? 1024 : kb;

  return {
    slug,
    name: `Compress Image to ${label}`,
    shortName: label,
    category: "image",
    mode: "compressor",
    title: `Compress Image to ${label} Online Free`,
    description: `Compress image to ${label} online free. ${angle} Fast, private, browser-based compression for JPG, PNG, and WebP.`,
    heroTitle: `Compress Image to ${label} Online`,
    heroCopy: `Use the ${label} preset to reduce image file size for ${angle.toLowerCase()} without uploading files to a server.`,
    badge: "Exact-size tool",
    featureList: [
      `${label} target preset`,
      "Before and after size preview",
      "JPG, PNG, and WebP support",
      "Private browser-based processing",
    ],
    faqList: [
      {
        question: `Can I compress an image to ${label}?`,
        answer: `Yes. The tool aims for ${label} or smaller and shows the closest result when an exact match is not possible.`,
      },
      {
        question: `What format works best for ${label}?`,
        answer: "JPG or WebP usually reaches smaller targets more easily than PNG when transparency is not required.",
      },
      {
        question: `Is the ${label} compressor free?`,
        answer: "Yes. It works in the browser with no sign-up and no server upload.",
      },
    ],
    defaultTargetKB: target,
  };
}

export function buildConverterIntent(spec: ConverterSpec): IntentPage {
  return {
    slug: spec.slug,
    title: spec.title,
    description: spec.description,
    heroTitle: spec.heroTitle,
    heroCopy: spec.heroCopy,
    introTitle: `Why convert ${spec.from} to ${spec.to}`,
    introCopy: spec.introCopy,
    ctaLabel: `Open ${spec.from} to ${spec.to} converter`,
    toolHref: `/image-converter?format=${encodeURIComponent(spec.format)}`,
    highlights: [
      `${spec.to} output selected automatically.`,
      "Convert and compress in one browser workflow.",
      "Works on desktop and mobile browsers.",
      "No sign-up or cloud upload required.",
    ],
    benefits: defaultBenefits,
    useCases: [
      { title: "Website publishing", description: `Prepare ${spec.to} assets that load faster on blogs, stores, and landing pages.` },
      { title: "Email and messaging", description: "Send lighter attachments that upload faster and use less storage." },
      { title: "Social uploads", description: "Convert files before posting to platforms with size or format limits." },
    ],
    faqList: defaultFaqs(`${spec.from} to ${spec.to} converter`),
    relatedLinks: spec.related,
  };
}

export function buildPlatformIntent(spec: PlatformSpec): IntentPage {
  return {
    slug: spec.slug,
    title: spec.title,
    description: spec.description,
    heroTitle: spec.heroTitle,
    heroCopy: spec.heroCopy,
    introTitle: `Built for ${spec.platform} uploads`,
    introCopy: spec.introCopy,
    ctaLabel: `Compress image for ${spec.platform}`,
    toolHref: `/image-compressor?target=${spec.targetKb}&format=${encodeURIComponent(spec.format)}`,
    highlights: [
      `${spec.targetKb}KB starting preset for ${spec.platform}.`,
      "Resize dimensions before compression when needed.",
      "Convert JPG, PNG, or WebP in the same workflow.",
      "Private browser-based processing.",
    ],
    benefits: defaultBenefits,
    useCases: spec.useCases,
    faqList: defaultFaqs(`${spec.platform} image compressor`),
    relatedLinks: spec.related,
  };
}

export function buildResizeIntent(spec: ResizeSpec): IntentPage {
  return {
    slug: spec.slug,
    title: spec.title,
    description: spec.description,
    heroTitle: spec.heroTitle,
    heroCopy: spec.heroCopy,
    introTitle: `Resize to ${spec.label}`,
    introCopy: spec.introCopy,
    ctaLabel: `Resize to ${spec.label}`,
    toolHref: `/image-resizer?width=${spec.width}&height=${spec.height}`,
    highlights: [
      `${spec.width}×${spec.height} pixel preset ready on open.`,
      "High-quality browser resampling.",
      "Optional compression after resizing.",
      "Works without installing desktop software.",
    ],
    benefits: defaultBenefits,
    useCases: [
      { title: "Profile and avatar images", description: "Match exact pixel requirements for uploads and directories." },
      { title: "Social and content publishing", description: "Prepare visuals that fit platform dimensions without guesswork." },
      { title: "Web and app assets", description: "Export consistent sizes for product pages, banners, and thumbnails." },
    ],
    faqList: [
      { question: `Can I resize an image to ${spec.label}?`, answer: `Yes. This page opens the resizer with ${spec.width}×${spec.height} pixels pre-filled.` },
      { question: "Will resizing reduce file size?", answer: "Usually yes. Smaller dimensions often produce lighter files, and you can compress afterward if needed." },
      { question: "Is this resize tool free?", answer: "Yes. It runs in your browser with no account required." },
    ],
    relatedLinks: spec.related,
  };
}

export const extraExactKbTools: ToolPage[] = [
  buildExactKbTool(10, "Ideal for tiny signatures, icons, and strict upload portals."),
  buildExactKbTool(40, "Useful for application forms, ID uploads, and compact profile photos."),
  buildExactKbTool(60, "A practical middle target between 50KB and 80KB upload limits."),
  buildExactKbTool(80, "Great for profile photos when you need more detail than 50KB allows."),
  buildExactKbTool(150, "Helpful for avatars, thumbnails, and lightweight CMS uploads."),
  buildExactKbTool(500, "Strong choice for e-commerce galleries and content-heavy pages."),
  buildExactKbTool(1024, "Perfect for email attachments, blogs, and portals with a 1MB cap."),
];

export const converterIntentPages: IntentPage[] = [
  buildConverterIntent({
    slug: "jpg-to-png-converter",
    from: "JPG",
    to: "PNG",
    format: "image/png",
    title: "JPG to PNG Converter Online Free | Convert JPEG to PNG",
    description: "Convert JPG to PNG online free. Preserve quality, switch formats instantly, and download PNG files in your browser.",
    heroTitle: "Convert JPG to PNG online in seconds.",
    heroCopy: "Upload a JPG, export PNG, and download the converted file without sending images to a cloud server.",
    introCopy: "PNG is useful when you need a lossless format or plan to edit the image further before publishing.",
    related: [
      { href: "/png-to-jpg-converter", label: "PNG to JPG converter" },
      { href: "/jpg-to-webp-converter", label: "JPG to WebP converter" },
      { href: "/image-converter", label: "All image formats" },
    ],
  }),
  buildConverterIntent({
    slug: "webp-to-jpg-converter",
    from: "WebP",
    to: "JPG",
    format: "image/jpeg",
    title: "WebP to JPG Converter Online Free | Convert WebP Images",
    description: "Convert WebP to JPG online free. Make WebP images compatible with email, social platforms, and older upload portals.",
    heroTitle: "Convert WebP to JPG for universal compatibility.",
    heroCopy: "Turn modern WebP files into widely supported JPG images with a fast browser-based converter.",
    introCopy: "Many email clients and legacy upload forms still prefer JPG. This workflow helps you convert quickly before sharing.",
    related: [
      { href: "/jpg-to-webp-converter", label: "JPG to WebP converter" },
      { href: "/webp-to-png-converter", label: "WebP to PNG converter" },
      { href: "/compress-image-for-email", label: "Compress for email" },
    ],
  }),
  buildConverterIntent({
    slug: "png-to-webp-converter",
    from: "PNG",
    to: "WebP",
    format: "image/webp",
    title: "PNG to WebP Converter Online Free | Smaller Web Images",
    description: "Convert PNG to WebP online free. Reduce file size for faster websites, blogs, and product galleries.",
    heroTitle: "Convert PNG to WebP and shrink file size.",
    heroCopy: "Export WebP images from PNG sources to improve page speed without rebuilding your assets manually.",
    introCopy: "WebP often delivers smaller files than PNG for web publishing, especially when transparency is not required.",
    related: [
      { href: "/jpg-to-webp-converter", label: "JPG to WebP converter" },
      { href: "/compress-image-for-website-upload", label: "Compress for website" },
      { href: "/compress-image-to-200kb", label: "Compress to 200KB" },
    ],
  }),
  buildConverterIntent({
    slug: "webp-to-png-converter",
    from: "WebP",
    to: "PNG",
    format: "image/png",
    title: "WebP to PNG Converter Online Free | Convert WebP to PNG",
    description: "Convert WebP to PNG online free. Export WebP images as PNG for editing tools, uploads, and design workflows.",
    heroTitle: "Convert WebP to PNG for editing and sharing.",
    heroCopy: "Switch WebP files to PNG when you need broader software support or lossless editing flexibility.",
    introCopy: "PNG remains a dependable format for design handoffs, screenshots, and workflows that require transparency.",
    related: [
      { href: "/webp-to-jpg-converter", label: "WebP to JPG converter" },
      { href: "/png-to-jpg-converter", label: "PNG to JPG converter" },
      { href: "/image-converter", label: "Image converter hub" },
    ],
  }),
  buildConverterIntent({
    slug: "heic-to-jpg-converter",
    from: "HEIC",
    to: "JPG",
    format: "image/jpeg",
    title: "HEIC to JPG Converter Online Free | Convert iPhone Photos",
    description: "Convert HEIC to JPG online free. Turn iPhone and iPad photos into JPG files for email, websites, and social uploads.",
    heroTitle: "Convert HEIC to JPG from iPhone photos.",
    heroCopy: "Upload HEIC images, convert to JPG in your browser, and download files that work everywhere.",
    introCopy: "HEIC saves space on phones, but many websites and apps still expect JPG. This converter closes that gap instantly.",
    related: [
      { href: "/heic-to-png-converter", label: "HEIC to PNG converter" },
      { href: "/compress-image-for-instagram", label: "Compress for Instagram" },
      { href: "/compress-image-for-email", label: "Compress for email" },
    ],
  }),
  buildConverterIntent({
    slug: "heic-to-png-converter",
    from: "HEIC",
    to: "PNG",
    format: "image/png",
    title: "HEIC to PNG Converter Online Free | Convert Apple Photos",
    description: "Convert HEIC to PNG online free. Export iPhone photos as PNG for editing, design tools, and transparent workflows.",
    heroTitle: "Convert HEIC to PNG without desktop software.",
    heroCopy: "Transform HEIC photos into PNG files directly in the browser when you need a flexible editing format.",
    introCopy: "PNG is a strong choice when you plan to edit iPhone photos or preserve more detail before compression.",
    related: [
      { href: "/heic-to-jpg-converter", label: "HEIC to JPG converter" },
      { href: "/png-to-jpg-converter", label: "PNG to JPG converter" },
      { href: "/image-converter", label: "Image converter hub" },
    ],
  }),
  buildConverterIntent({
    slug: "bmp-to-jpg-converter",
    from: "BMP",
    to: "JPG",
    format: "image/jpeg",
    title: "BMP to JPG Converter Online Free | Reduce BMP File Size",
    description: "Convert BMP to JPG online free. Shrink large bitmap files into lightweight JPG images for web and email use.",
    heroTitle: "Convert BMP to JPG and reduce heavy files.",
    heroCopy: "Turn oversized BMP images into practical JPG files with a simple browser conversion workflow.",
    introCopy: "BMP files are often much larger than necessary. Converting to JPG is one of the fastest ways to make them upload-friendly.",
    related: [
      { href: "/tiff-to-jpg-converter", label: "TIFF to JPG converter" },
      { href: "/png-to-jpg-converter", label: "PNG to JPG converter" },
      { href: "/compress-image-to-200kb", label: "Compress to 200KB" },
    ],
  }),
  buildConverterIntent({
    slug: "tiff-to-jpg-converter",
    from: "TIFF",
    to: "JPG",
    format: "image/jpeg",
    title: "TIFF to JPG Converter Online Free | Convert TIFF Images",
    description: "Convert TIFF to JPG online free. Make scanned TIFF files lighter and easier to share by email or upload forms.",
    heroTitle: "Convert TIFF to JPG for sharing and uploads.",
    heroCopy: "Export TIFF scans and photos as JPG when you need a smaller, more compatible file format.",
    introCopy: "TIFF is common in scanning workflows, but JPG is easier to share online. Convert first, then compress if needed.",
    related: [
      { href: "/bmp-to-jpg-converter", label: "BMP to JPG converter" },
      { href: "/compress-image-for-email", label: "Compress for email" },
      { href: "/compress-image-to-500kb", label: "Compress to 500KB" },
    ],
  }),
];

export const platformIntentPages: IntentPage[] = [
  buildPlatformIntent({
    slug: "compress-image-for-instagram",
    platform: "Instagram",
    targetKb: 200,
    format: "image/jpeg",
    title: "Compress Image for Instagram Online Free | Post-Ready Photos",
    description: "Compress image for Instagram online free. Reduce photo size for posts, stories, and reels without losing visual clarity.",
    heroTitle: "Compress images before posting to Instagram.",
    heroCopy: "Prepare lighter JPG or WebP files that upload faster and stay sharp on mobile feeds.",
    introCopy: "Instagram uploads work best with optimized images. Compress first to avoid quality loss from automatic platform compression.",
    useCases: [
      { title: "Feed posts", description: "Keep square and portrait images lightweight before publishing." },
      { title: "Stories and reels", description: "Reduce mobile photo size for faster uploads on cellular data." },
      { title: "Carousel posts", description: "Compress multiple images consistently before scheduling content." },
    ],
    related: [
      { href: "/resize-image-to-1080x1080", label: "Resize to 1080×1080" },
      { href: "/jpg-to-webp-converter", label: "JPG to WebP converter" },
      { href: "/compress-image-to-200kb", label: "Compress to 200KB" },
    ],
  }),
  buildPlatformIntent({
    slug: "compress-image-for-facebook",
    platform: "Facebook",
    targetKb: 200,
    format: "image/jpeg",
    title: "Compress Image for Facebook Online Free | Faster Photo Uploads",
    description: "Compress image for Facebook online free. Optimize photos for posts, pages, and ads with smaller file sizes.",
    heroTitle: "Compress images for Facebook posts and pages.",
    heroCopy: "Reduce photo weight before uploading so posts publish faster and look cleaner in the feed.",
    introCopy: "Facebook recompresses uploaded images. Starting with an optimized file gives you more control over the final look.",
    useCases: [
      { title: "Page posts", description: "Prepare banner and announcement images that load quickly." },
      { title: "Marketplace listings", description: "Compress product photos for faster listing creation." },
      { title: "Ad creatives", description: "Export lighter ad images for smoother campaign uploads." },
    ],
    related: [
      { href: "/compress-image-for-instagram", label: "Compress for Instagram" },
      { href: "/resize-image-to-1920x1080", label: "Resize to 1920×1080" },
      { href: "/compress-image-to-200kb", label: "Compress to 200KB" },
    ],
  }),
  buildPlatformIntent({
    slug: "compress-image-for-linkedin",
    platform: "LinkedIn",
    targetKb: 100,
    format: "image/jpeg",
    title: "Compress Image for LinkedIn Online Free | Profile and Post Photos",
    description: "Compress image for LinkedIn online free. Optimize profile photos, banners, and post images for professional uploads.",
    heroTitle: "Compress images for LinkedIn profile and posts.",
    heroCopy: "Prepare sharp, lightweight photos for LinkedIn headers, profile pictures, and article thumbnails.",
    introCopy: "Professional profiles look better with clean, fast-loading images. Compress before upload to avoid platform-side quality loss.",
    useCases: [
      { title: "Profile photos", description: "Keep headshots under common upload limits while staying sharp." },
      { title: "Banner images", description: "Optimize cover photos for faster loading on desktop and mobile." },
      { title: "Article thumbnails", description: "Prepare lightweight preview images for LinkedIn posts and newsletters." },
    ],
    related: [
      { href: "/resize-image-to-400x400", label: "Resize to 400×400" },
      { href: "/compress-image-to-100kb", label: "Compress to 100KB" },
      { href: "/background-remover", label: "Background remover" },
    ],
  }),
  buildPlatformIntent({
    slug: "compress-image-for-twitter",
    platform: "Twitter / X",
    targetKb: 200,
    format: "image/jpeg",
    title: "Compress Image for Twitter Online Free | X Post Images",
    description: "Compress image for Twitter and X online free. Reduce photo size for posts, headers, and social sharing.",
    heroTitle: "Compress images for Twitter and X posts.",
    heroCopy: "Upload lighter images that publish faster and stay readable in timelines on mobile and desktop.",
    introCopy: "Social timelines favor fast-loading media. Compress images first so your posts stay crisp after platform processing.",
    useCases: [
      { title: "Timeline posts", description: "Reduce photo size before sharing updates and announcements." },
      { title: "Header images", description: "Optimize banner visuals for profile branding." },
      { title: "Thread images", description: "Compress multiple images consistently for long-form posts." },
    ],
    related: [
      { href: "/compress-image-for-linkedin", label: "Compress for LinkedIn" },
      { href: "/compress-image-to-200kb", label: "Compress to 200KB" },
      { href: "/resize-image-to-1920x1080", label: "Resize to 1920×1080" },
    ],
  }),
  buildPlatformIntent({
    slug: "compress-image-for-whatsapp",
    platform: "WhatsApp",
    targetKb: 100,
    format: "image/jpeg",
    title: "Compress Image for WhatsApp Online Free | Send Photos Faster",
    description: "Compress image for WhatsApp online free. Reduce photo size so images send faster on mobile data and stay clear.",
    heroTitle: "Compress images before sending on WhatsApp.",
    heroCopy: "Make photos lighter for chats, groups, and status updates without installing a mobile app.",
    introCopy: "Large camera photos can take longer to send on WhatsApp. Compress first to speed up sharing and save data.",
    useCases: [
      { title: "Chat photos", description: "Send lighter images in personal and group conversations." },
      { title: "Status updates", description: "Prepare quick visuals that upload smoothly from mobile browsers." },
      { title: "Document photos", description: "Reduce photo scans before sharing them in work chats." },
    ],
    related: [
      { href: "/resize-image-to-800x800", label: "Resize to 800×800" },
      { href: "/heic-to-jpg-converter", label: "HEIC to JPG converter" },
      { href: "/compress-image-to-100kb", label: "Compress to 100KB" },
    ],
  }),
  buildPlatformIntent({
    slug: "compress-image-for-discord",
    platform: "Discord",
    targetKb: 500,
    format: "image/jpeg",
    title: "Compress Image for Discord Online Free | Avatar and Server Images",
    description: "Compress image for Discord online free. Optimize avatars, banners, and server images for faster uploads.",
    heroTitle: "Compress images for Discord avatars and servers.",
    heroCopy: "Prepare lighter JPG or WebP files for profile photos, emojis, and server branding assets.",
    introCopy: "Discord uploads are smoother with optimized images. Compress first to avoid failed uploads and long wait times.",
    useCases: [
      { title: "Profile avatars", description: "Keep avatar files practical while preserving recognizable detail." },
      { title: "Server banners", description: "Optimize wide banner images for community pages." },
      { title: "Emoji and sticker prep", description: "Reduce image weight before custom asset uploads." },
    ],
    related: [
      { href: "/compress-image-to-500kb", label: "Compress to 500KB" },
      { href: "/resize-image-to-400x400", label: "Resize to 400×400" },
      { href: "/png-to-jpg-converter", label: "PNG to JPG converter" },
    ],
  }),
  buildPlatformIntent({
    slug: "compress-image-for-shopify",
    platform: "Shopify",
    targetKb: 200,
    format: "image/webp",
    title: "Compress Image for Shopify Online Free | Faster Product Pages",
    description: "Compress image for Shopify online free. Optimize product photos and collection banners for faster store pages.",
    heroTitle: "Compress product images for Shopify stores.",
    heroCopy: "Reduce image weight before uploading to Shopify so product and collection pages load faster worldwide.",
    introCopy: "Store speed affects conversions. Lighter product images help pages load quickly for global shoppers.",
    useCases: [
      { title: "Product photos", description: "Keep gallery images fast without making products look tiny." },
      { title: "Collection banners", description: "Optimize hero visuals for category pages." },
      { title: "Theme assets", description: "Prepare lighter images for custom sections and landing pages." },
    ],
    related: [
      { href: "/compress-image-for-amazon", label: "Compress for Amazon" },
      { href: "/jpg-to-webp-converter", label: "JPG to WebP converter" },
      { href: "/bulk-image-compressor", label: "Bulk image compressor" },
    ],
  }),
  buildPlatformIntent({
    slug: "compress-image-for-wordpress",
    platform: "WordPress",
    targetKb: 200,
    format: "image/webp",
    title: "Compress Image for WordPress Online Free | Faster Blog Images",
    description: "Compress image for WordPress online free. Optimize featured images, thumbnails, and media library uploads.",
    heroTitle: "Compress images before uploading to WordPress.",
    heroCopy: "Prepare WebP or JPG assets that improve page speed scores and reduce hosting bandwidth globally.",
    introCopy: "WordPress sites perform better with optimized media. Compress images before upload to improve Core Web Vitals.",
    useCases: [
      { title: "Featured images", description: "Reduce hero and article images before publishing posts." },
      { title: "Media library cleanup", description: "Prepare lighter replacements for oversized legacy uploads." },
      { title: "Page builder sections", description: "Optimize block and landing-page visuals for faster rendering." },
    ],
    related: [
      { href: "/compress-image-for-website-upload", label: "Compress for website upload" },
      { href: "/compress-image-to-200kb", label: "Compress to 200KB" },
      { href: "/png-to-webp-converter", label: "PNG to WebP converter" },
    ],
  }),
  buildPlatformIntent({
    slug: "compress-image-for-amazon",
    platform: "Amazon",
    targetKb: 500,
    format: "image/jpeg",
    title: "Compress Image for Amazon Online Free | Product Listing Photos",
    description: "Compress image for Amazon online free. Optimize product listing photos for faster uploads and cleaner gallery pages.",
    heroTitle: "Compress product images for Amazon listings.",
    heroCopy: "Reduce photo file size while keeping product detail visible for marketplace uploads.",
    introCopy: "Amazon sellers often manage dozens of product photos. Compression helps uploads go faster and pages stay responsive.",
    useCases: [
      { title: "Main product images", description: "Keep primary listing photos sharp and upload-ready." },
      { title: "Secondary gallery images", description: "Compress entire image sets before bulk upload." },
      { title: "A+ content visuals", description: "Optimize brand story images for lighter page weight." },
    ],
    related: [
      { href: "/compress-image-for-ebay", label: "Compress for eBay" },
      { href: "/compress-image-for-shopify", label: "Compress for Shopify" },
      { href: "/bulk-image-compressor", label: "Bulk image compressor" },
    ],
  }),
  buildPlatformIntent({
    slug: "compress-image-for-ebay",
    platform: "eBay",
    targetKb: 500,
    format: "image/jpeg",
    title: "Compress Image for eBay Online Free | Listing Photo Optimizer",
    description: "Compress image for eBay online free. Reduce listing photo size for faster uploads and smoother mobile browsing.",
    heroTitle: "Compress listing photos for eBay sellers.",
    heroCopy: "Prepare lighter JPG images for product listings, auction photos, and store branding assets.",
    introCopy: "Buyers browse on mobile worldwide. Optimized listing photos upload faster and help pages feel more responsive.",
    useCases: [
      { title: "Auction photos", description: "Compress camera photos before creating new listings." },
      { title: "Store branding", description: "Optimize banner and profile images for seller pages." },
      { title: "Bulk inventory uploads", description: "Use batch compression for large product catalogs." },
    ],
    related: [
      { href: "/compress-image-for-amazon", label: "Compress for Amazon" },
      { href: "/compress-image-to-500kb", label: "Compress to 500KB" },
      { href: "/bulk-image-compressor", label: "Bulk image compressor" },
    ],
  }),
  buildPlatformIntent({
    slug: "compress-image-for-website",
    platform: "Website",
    targetKb: 200,
    format: "image/webp",
    title: "Compress Image for Website Online Free | Faster Page Speed",
    description: "Compress image for website online free. Reduce JPG, PNG, and WebP files to improve global page speed and SEO.",
    heroTitle: "Compress website images for faster global loading.",
    heroCopy: "Optimize hero images, thumbnails, and content visuals before publishing to any CMS or static site.",
    introCopy: "Page speed matters for SEO and user experience worldwide. Compress images before upload instead of fixing them later.",
    useCases: [
      { title: "Landing pages", description: "Reduce hero and section images for faster first paint." },
      { title: "Blog content", description: "Keep article images lightweight for readers on any connection." },
      { title: "Global audiences", description: "Serve smaller assets to users on mobile data and slower networks." },
    ],
    related: [
      { href: "/compress-image-for-wordpress", label: "Compress for WordPress" },
      { href: "/compress-image-for-website-upload", label: "Website upload workflow" },
      { href: "/jpg-to-webp-converter", label: "JPG to WebP converter" },
    ],
  }),
];

export const resizeIntentPages: IntentPage[] = [
  buildResizeIntent({
    slug: "resize-image-to-200x200",
    width: 200,
    height: 200,
    label: "200×200",
    title: "Resize Image to 200x200 Online Free | Square Avatar Size",
    description: "Resize image to 200x200 pixels online free. Perfect for avatars, favicons, and small profile uploads.",
    heroTitle: "Resize images to 200×200 pixels online.",
    heroCopy: "Set an exact 200×200 square size for avatars, app icons, and compact profile photos.",
    introCopy: "200×200 is a common square size for avatars and thumbnails across forums, apps, and directories.",
    related: [
      { href: "/resize-image-to-400x400", label: "Resize to 400×400" },
      { href: "/compress-image-to-50kb", label: "Compress to 50KB" },
      { href: "/image-resizer", label: "Image resizer tool" },
    ],
  }),
  buildResizeIntent({
    slug: "resize-image-to-400x400",
    width: 400,
    height: 400,
    label: "400×400",
    title: "Resize Image to 400x400 Online Free | Profile Photo Size",
    description: "Resize image to 400x400 pixels online free. Ideal for profile photos, app icons, and social avatars.",
    heroTitle: "Resize images to 400×400 pixels online.",
    heroCopy: "Export a clean 400×400 square image for profile directories, chat apps, and creator platforms.",
    introCopy: "400×400 works well when you need more detail than a tiny avatar but still want a compact square image.",
    related: [
      { href: "/resize-image-to-200x200", label: "Resize to 200×200" },
      { href: "/compress-image-for-linkedin", label: "Compress for LinkedIn" },
      { href: "/image-resizer", label: "Image resizer tool" },
    ],
  }),
  buildResizeIntent({
    slug: "resize-image-to-1080x1080",
    width: 1080,
    height: 1080,
    label: "1080×1080",
    title: "Resize Image to 1080x1080 Online Free | Instagram Post Size",
    description: "Resize image to 1080x1080 pixels online free. Perfect for Instagram posts, square ads, and social creatives.",
    heroTitle: "Resize images to 1080×1080 for social posts.",
    heroCopy: "Match the classic square social post size before compressing and publishing your content.",
    introCopy: "1080×1080 remains one of the most common square sizes for social posts, ads, and marketplace creatives.",
    related: [
      { href: "/compress-image-for-instagram", label: "Compress for Instagram" },
      { href: "/resize-image-to-1920x1080", label: "Resize to 1920×1080" },
      { href: "/compress-image-to-200kb", label: "Compress to 200KB" },
    ],
  }),
  buildResizeIntent({
    slug: "resize-image-to-1920x1080",
    width: 1920,
    height: 1080,
    label: "1920×1080",
    title: "Resize Image to 1920x1080 Online Free | HD Banner Size",
    description: "Resize image to 1920x1080 pixels online free. Ideal for HD banners, YouTube thumbnails, and widescreen headers.",
    heroTitle: "Resize images to 1920×1080 HD online.",
    heroCopy: "Export widescreen 1080p visuals for website heroes, video thumbnails, and presentation banners.",
    introCopy: "1920×1080 is the standard HD widescreen format for headers, slides, and video preview images.",
    related: [
      { href: "/resize-image-for-youtube-thumbnail", label: "YouTube thumbnail size" },
      { href: "/compress-image-for-website", label: "Compress for website" },
      { href: "/compress-image-to-500kb", label: "Compress to 500KB" },
    ],
  }),
  buildResizeIntent({
    slug: "resize-image-to-800x800",
    width: 800,
    height: 800,
    label: "800×800",
    title: "Resize Image to 800x800 Online Free | Messaging Photo Size",
    description: "Resize image to 800x800 pixels online free. Useful for messaging apps, product previews, and mobile uploads.",
    heroTitle: "Resize images to 800×800 pixels online.",
    heroCopy: "Create a balanced square image size that works well for messaging apps and mobile sharing.",
    introCopy: "800×800 is a practical middle ground when you want more detail than a small avatar without a huge file.",
    related: [
      { href: "/compress-image-for-whatsapp", label: "Compress for WhatsApp" },
      { href: "/resize-image-to-400x400", label: "Resize to 400×400" },
      { href: "/compress-image-to-100kb", label: "Compress to 100KB" },
    ],
  }),
  buildResizeIntent({
    slug: "resize-image-to-passport-size",
    width: 413,
    height: 531,
    label: "passport size",
    title: "Resize Image to Passport Size Online Free | ID Photo Dimensions",
    description: "Resize image to passport photo size online free. Set standard ID photo dimensions before compression and upload.",
    heroTitle: "Resize images to passport photo dimensions.",
    heroCopy: "Use standard passport-style dimensions, then compress to meet upload size limits for forms and IDs.",
    introCopy: "Many ID and visa workflows require both correct dimensions and a small file size. Resize first, then compress.",
    related: [
      { href: "/compress-image-to-50kb", label: "Compress to 50KB" },
      { href: "/compress-image-to-100kb", label: "Compress to 100KB" },
      { href: "/passport-photo-size-maker", label: "Passport photo workflow" },
    ],
  }),
  buildResizeIntent({
    slug: "resize-image-for-youtube-thumbnail",
    width: 1280,
    height: 720,
    label: "1280×720",
    title: "Resize Image for YouTube Thumbnail Online Free | 1280x720",
    description: "Resize image for YouTube thumbnail online free. Set 1280x720 pixels for crisp video preview images.",
    heroTitle: "Resize images for YouTube thumbnails.",
    heroCopy: "Export 1280×720 thumbnail images that look sharp on search results and mobile feeds.",
    introCopy: "YouTube recommends 1280×720 thumbnails. Resize to the correct ratio first, then compress for faster uploads.",
    related: [
      { href: "/resize-image-to-1920x1080", label: "Resize to 1920×1080" },
      { href: "/compress-image-to-200kb", label: "Compress to 200KB" },
      { href: "/compress-image-for-website", label: "Compress for website" },
    ],
  }),
];

export const metadataStripperTool: ToolPage = {
  slug: "remove-image-metadata",
  name: "Remove Image Metadata",
  shortName: "Strip EXIF",
  category: "image",
  mode: "converter",
  title: "Remove Image Metadata Online Free | Strip EXIF Data",
  description:
    "Remove image metadata online free. Strip EXIF, GPS, and camera data from JPG and PNG files in your browser for better privacy.",
  keywords: ["remove image metadata", "strip exif data", "remove exif online", "clean image metadata"],
  heroTitle: "Remove EXIF and Metadata from Images",
  heroCopy:
    "Re-export photos without hidden EXIF, GPS, or camera data. Everything stays private in your browser.",
  badge: "Privacy tool",
  featureList: [
    "Strip EXIF and camera metadata",
    "Remove hidden GPS location data",
    "Works with JPG and PNG",
    "Private browser-based export",
  ],
  faqList: [
    {
      question: "Does this remove GPS location from photos?",
      answer: "Yes. Re-exporting through the canvas workflow removes embedded EXIF metadata including GPS when present.",
    },
    {
      question: "Will removing metadata reduce file size?",
      answer: "Sometimes slightly, but the main benefit is privacy and cleaner files for sharing.",
    },
    {
      question: "Is metadata removal done locally?",
      answer: "Yes. Your image is processed in the browser and is not uploaded to a server.",
    },
  ],
};
