export type ToolMode =
  | "compressor"
  | "resizer"
  | "converter"
  | "crop"
  | "bulk-compressor"
  | "rotate-flip"
  | "background-remover"
  | "upscaler"
  | "ml-to-oz";

export type ToolCategory = "image" | "ai";

export type ToolPage = {
  slug: string;
  name: string;
  shortName: string;
  category: ToolCategory;
  mode: ToolMode;
  title: string;
  description: string;
  keywords?: string[];
  heroTitle: string;
  heroCopy: string;
  badge: string;
  featureList: string[];
  faqList: { question: string; answer: string }[];
  defaultTargetKB?: number;
  homeFeatured?: boolean;
};

export const toolPages: ToolPage[] = [
  {
    slug: "ml-to-oz-calculator",
    name: "ML to Oz Calculator",
    shortName: "ML to Oz",
    category: "image",
    mode: "ml-to-oz",
    title: "ML to Oz Calculator | Convert Milliliters to Ounces Free",
    description:
      "Use a free ml to oz calculator to convert milliliters to US fluid ounces instantly for recipes, bottles, drinks, and product measurements.",
    keywords: [
      "ml to oz",
      "ml to oz calculator",
      "convert ml to oz",
      "100 ml to oz",
      "500 ml to oz",
      "milliliters to ounces",
    ],
    heroTitle: "ML to Oz Calculator",
    heroCopy:
      "Convert milliliters to ounces instantly with a fast US-focused calculator for recipes, bottles, drinks, and measurement charts.",
    badge: "Calculator tool",
    featureList: [
      "US fluid ounce conversion",
      "UK fluid ounce reference",
      "Cups, tablespoons, and teaspoons included",
      "Fast browser-based calculation",
    ],
    faqList: [
      {
        question: "How do I convert ml to oz?",
        answer: "Multiply milliliters by 0.033814 to get US fluid ounces.",
      },
      {
        question: "How many oz is 500 ml?",
        answer: "500 ml is about 16.907 US fluid ounces.",
      },
      {
        question: "Is this calculator free to use?",
        answer: "Yes. The ml to oz calculator is free and works instantly in the browser.",
      },
    ],
    homeFeatured: true,
  },
  {
    slug: "compress-image-to-20kb",
    name: "Compress Image to 20KB",
    shortName: "20KB",
    category: "image",
    mode: "compressor",
    title: "Compress Image to 20KB Online Free | ReduceImageSize",
    description:
      "Compress image to 20KB online free for signatures, forms, and strict upload portals with private browser-based processing.",
    heroTitle: "Compress Image to 20KB Online",
    heroCopy:
      "Start from a 20KB target for signatures, IDs, and compact application uploads that reject oversized files.",
    badge: "SEO page",
    featureList: [
      "20KB target preset",
      "Useful for signatures and form uploads",
      "Before and after preview",
      "Browser-based private workflow",
    ],
    faqList: [
      {
        question: "Can I compress an image to 20KB exactly?",
        answer: "The tool aims for 20KB or smaller and shows the closest result when an exact match is not possible.",
      },
      {
        question: "What type of image works best for 20KB?",
        answer: "JPG usually reaches 20KB more easily than PNG when transparency is not required.",
      },
      {
        question: "Is the 20KB compressor free to use?",
        answer: "Yes. It works in the browser with no sign-up and no server upload.",
      },
    ],
    defaultTargetKB: 20,
  },
  {
    slug: "compress-image-to-30kb",
    name: "Compress Image to 30KB",
    shortName: "30KB",
    category: "image",
    mode: "compressor",
    title: "Compress Image to 30KB Online Free | ReduceImageSize",
    description:
      "Compress image to 30KB online free for small photo uploads, application forms, and profile-image requirements.",
    heroTitle: "Compress Image to 30KB Online",
    heroCopy:
      "Use the 30KB preset for compact uploads, profile photos, and submission flows that need a smaller file than 50KB.",
    badge: "SEO page",
    featureList: [
      "30KB target preset",
      "JPG, PNG, and WebP support",
      "Side-by-side preview",
      "Fast browser-based compression",
    ],
    faqList: [
      {
        question: "Can I reduce image size to 30KB online?",
        answer: "Yes. This page opens with a 30KB target so you can reach the size range faster.",
      },
      {
        question: "Is 30KB useful for forms and profile uploads?",
        answer: "Yes. It is a common target for compact profile images, signatures, and portal uploads.",
      },
      {
        question: "Does the 30KB page support PNG images too?",
        answer: "Yes. You can upload JPG, PNG, or WebP and export the format you need.",
      },
    ],
    defaultTargetKB: 30,
  },
  {
    slug: "image-compressor",
    name: "Image Compressor",
    shortName: "Compressor",
    category: "image",
    mode: "compressor",
    title: "Compress Image Online Free | ReduceImageSize",
    description:
      "Compress image online for JPG, PNG, and WebP. Adjust quality, compare before and after, and download lighter files fast.",
    heroTitle: "Compress Image Online - Free, Fast, and Secure",
    heroCopy:
      "Reduce JPG, PNG, and WebP file sizes with live previews, adjustable compression, and instant browser-based processing.",
    badge: "Main image tool",
    featureList: [
      "Adjustable compression level",
      "Before and after preview",
      "File-size reduction percentage",
      "Single or multiple image support",
    ],
    faqList: [
      {
        question: "Can I compress JPG, PNG, and WebP images here?",
        answer: "Yes. The compressor supports all three major formats and lets you export to the format you need.",
      },
      {
        question: "Is the image compressor free to use?",
        answer: "Yes. The tool works in your browser with no sign-up required.",
      },
      {
        question: "Does the tool upload my images?",
        answer: "No. Images are processed locally in the browser and are not stored on a server.",
      },
    ],
    homeFeatured: true,
  },
  {
    slug: "image-resizer",
    name: "Image Resizer",
    shortName: "Resizer",
    category: "image",
    mode: "resizer",
    title: "Resize Image Online Free | Width, Height, and Presets",
    description:
      "Resize image online by width, height, percentage, or social presets. Perfect for Instagram, WhatsApp, and passport photos.",
    heroTitle: "Resize Images by Pixels, Percentage, or Presets",
    heroCopy:
      "Resize image dimensions for social posts, forms, passports, and websites with percentage controls and ready-made presets.",
    badge: "Image tool",
    featureList: [
      "Resize by width and height",
      "Resize by percentage",
      "Preset sizes for Instagram, WhatsApp, and passport photos",
      "High-quality browser rendering",
    ],
    faqList: [
      {
        question: "Can I resize an image by percentage?",
        answer: "Yes. Choose a percentage scale or set an exact width and height in pixels.",
      },
      {
        question: "Does the resizer include social media presets?",
        answer: "Yes. The tool includes ready-made presets for common post and profile sizes.",
      },
      {
        question: "Can I resize passport photos online?",
        answer: "Yes. The resizer includes a passport-friendly preset and custom dimensions.",
      },
    ],
    homeFeatured: true,
  },
  {
    slug: "image-converter",
    name: "Image Converter",
    shortName: "Converter",
    category: "image",
    mode: "converter",
    title: "Convert Image Online Free | JPG, PNG, WebP Converter",
    description:
      "Convert JPG to PNG, PNG to JPG, WebP to JPG, and JPG to WebP online with a fast browser-based image converter.",
    heroTitle: "Convert Images Between JPG, PNG, and WebP",
    heroCopy:
      "Switch file formats in seconds and download clean converted images without sending files to a server.",
    badge: "Image tool",
    featureList: [
      "JPG to PNG",
      "PNG to JPG",
      "WebP to JPG",
      "JPG to WebP",
    ],
    faqList: [
      {
        question: "Can I convert JPG to PNG online?",
        answer: "Yes. The converter supports common image format changes including JPG, PNG, and WebP.",
      },
      {
        question: "Will converting PNG to JPG reduce file size?",
        answer: "In many cases, yes. JPG often produces smaller files when transparency is not needed.",
      },
      {
        question: "Is this converter secure?",
        answer: "Yes. Conversion runs in the browser so your images stay on your device.",
      },
    ],
    homeFeatured: true,
  },
  {
    slug: "crop-image",
    name: "Crop Image Tool",
    shortName: "Crop",
    category: "image",
    mode: "crop",
    title: "Crop Image Online Free | Free Crop and Aspect Ratios",
    description:
      "Crop image online with free crop controls and aspect ratio presets. Prepare images for social media, websites, and documents.",
    heroTitle: "Crop Images with Freeform and Preset Ratios",
    heroCopy:
      "Crop images for websites, social posts, and profile photos using an interactive crop box and aspect ratio presets.",
    badge: "Image tool",
    featureList: [
      "Free crop controls",
      "Square, story, portrait, and widescreen ratios",
      "Instant preview",
      "Browser-based processing",
    ],
    faqList: [
      {
        question: "Can I crop images freely?",
        answer: "Yes. You can move and zoom the crop area freely, then switch to a preset ratio when needed.",
      },
      {
        question: "Does the crop tool include aspect ratio presets?",
        answer: "Yes. It includes social and common layout ratios such as 1:1, 4:5, 16:9, and story sizes.",
      },
      {
        question: "Can I use the crop tool on mobile?",
        answer: "Yes. The crop interface is mobile-friendly and touch-ready.",
      },
    ],
    homeFeatured: true,
  },
  {
    slug: "bulk-image-compressor",
    name: "Bulk Image Compressor",
    shortName: "Bulk",
    category: "image",
    mode: "bulk-compressor",
    title: "Bulk Image Compressor Online | Compress Multiple Images",
    description:
      "Upload multiple images and compress them all at once. Download every result individually or as a ZIP.",
    heroTitle: "Compress Multiple Images in One Workflow",
    heroCopy:
      "Drop a full batch of images, compress them together, compare the results, and download the set in one go.",
    badge: "Image tool",
    featureList: [
      "Upload multiple images",
      "Compress all at once",
      "ZIP download support",
      "Before and after stats for every file",
    ],
    faqList: [
      {
        question: "Can I compress multiple images at once?",
        answer: "Yes. The bulk compressor accepts multiple files and processes them in one session.",
      },
      {
        question: "Can I download all compressed images together?",
        answer: "Yes. The tool can bundle your optimized files into a ZIP download.",
      },
      {
        question: "Does bulk compression work on mobile?",
        answer: "Yes, although large batches are easiest to manage on desktop.",
      },
    ],
    homeFeatured: true,
  },
  {
    slug: "rotate-flip-image",
    name: "Rotate and Flip Image",
    shortName: "Rotate and Flip",
    category: "image",
    mode: "rotate-flip",
    title: "Rotate and Flip Image Online Free | Fast Editor",
    description:
      "Rotate and flip images online in seconds. Fix orientation, mirror images, and download the updated result instantly.",
    heroTitle: "Rotate and Flip Images in Seconds",
    heroCopy:
      "Fix sideways photos, mirror screenshots, and prepare images for upload with one simple browser-based editor.",
    badge: "Image tool",
    featureList: [
      "Rotate left or right",
      "Flip horizontally or vertically",
      "Instant preview",
      "One-click download",
    ],
    faqList: [
      {
        question: "Can I rotate an image 90 degrees online?",
        answer: "Yes. Use the rotate controls to spin your image left or right in 90-degree steps.",
      },
      {
        question: "Can I flip an image horizontally?",
        answer: "Yes. The tool supports both horizontal and vertical flipping.",
      },
      {
        question: "Does the rotate tool keep image quality?",
        answer: "Yes. It redraws the image in the browser and exports the updated result directly.",
      },
    ],
    homeFeatured: true,
  },
  {
    slug: "background-remover",
    name: "Background Remover",
    shortName: "Background Remover",
    category: "ai",
    mode: "background-remover",
    title: "Background Remover Online Free | Transparent PNG Tool",
    description:
      "Remove image backgrounds online and export a transparent PNG. Great for profile photos, products, and quick cutouts.",
    heroTitle: "Remove Backgrounds with a Fast Browser-Based Tool",
    heroCopy:
      "Remove simple backgrounds, keep the main subject clearer, and export either a transparent cutout or a solid-color background in one workflow.",
    badge: "AI tool",
    featureList: [
      "Edge-aware background removal",
      "Transparent or solid-color background export",
      "Tolerance controls",
      "No upload required",
    ],
    faqList: [
      {
        question: "Can I remove image backgrounds online?",
        answer: "Yes. The background remover creates a transparent PNG directly in the browser and can also add a clean solid-color background.",
      },
      {
        question: "What images work best for background removal?",
        answer: "Images with clean or contrasting backgrounds produce the strongest results.",
      },
      {
        question: "Do I need to upload the image to use background removal?",
        answer: "No. The background remover works locally in your browser.",
      },
    ],
    homeFeatured: true,
  },
  {
    slug: "image-upscaler",
    name: "Image Upscaler",
    shortName: "Upscaler",
    category: "ai",
    mode: "upscaler",
    title: "Image Upscaler Online Free | Enhance and Upscale Images",
    description:
      "Upscale images online and enhance clarity with a fast browser-based image upscaler. Great for profile photos, product shots, and digital assets.",
    heroTitle: "Upscale Images and Enhance Visual Clarity",
    heroCopy:
      "Increase image dimensions, apply a sharper finish, and export an enhanced file that works better for sharing and publishing.",
    badge: "AI tool",
    featureList: [
      "2x and 4x upscale modes",
      "High-quality browser resampling",
      "Optional sharpen enhancement",
      "Instant before and after view",
    ],
    faqList: [
      {
        question: "Can I upscale an image online for free?",
        answer: "Yes. The upscaler increases image dimensions and can apply an extra sharpen pass before export.",
      },
      {
        question: "What is the best use for the image upscaler?",
        answer: "It works well for profile images, digital assets, and lightweight visuals that need a larger output size.",
      },
      {
        question: "Is the upscaler mobile-friendly?",
        answer: "Yes. It works on mobile, though large images process fastest on desktop.",
      },
    ],
    homeFeatured: true,
  },
  {
    slug: "compress-image-to-50kb",
    name: "Compress Image to 50KB",
    shortName: "50KB",
    category: "image",
    mode: "compressor",
    title: "Compress Image to 50KB Online Free | ReduceImageSize",
    description:
      "Compress image to 50KB online free for forms, passport photos, and application portals. Fast browser-based compression.",
    heroTitle: "Compress Image to 50KB Online",
    heroCopy:
      "Start from a 50KB target for profile photos, application forms, and document portals that reject oversized images.",
    badge: "SEO page",
    featureList: [
      "50KB target preset",
      "JPG, PNG, and WebP support",
      "Before and after preview",
      "Useful for forms and IDs",
    ],
    faqList: [
      {
        question: "Can I compress an image to 50KB exactly?",
        answer: "The tool aims for 50KB and shows the closest result if a perfect match is not possible.",
      },
      {
        question: "What format works best for 50KB?",
        answer: "JPG usually reaches 50KB more easily than PNG when transparency is not needed.",
      },
      {
        question: "Is the 50KB compressor free?",
        answer: "Yes. It is free to use and works directly in the browser.",
      },
    ],
    defaultTargetKB: 50,
  },
  {
    slug: "compress-image-to-100kb",
    name: "Compress Image to 100KB",
    shortName: "100KB",
    category: "image",
    mode: "compressor",
    title: "Compress Image to 100KB Online Free | ReduceImageSize",
    description:
      "Compress image to 100KB online free for forms, profile pictures, and website uploads with fast browser-based processing.",
    heroTitle: "Compress Image to 100KB Online",
    heroCopy:
      "Use the 100KB preset for profile photos, lightweight uploads, and images that need a practical size target.",
    badge: "SEO page",
    featureList: [
      "100KB target preset",
      "Quality and format controls",
      "Preview before download",
      "Great for portals and profiles",
    ],
    faqList: [
      {
        question: "Can I use this page to compress images to 100KB?",
        answer: "Yes. The workspace opens with a 100KB target so you can get to the right range faster.",
      },
      {
        question: "Is 100KB good for website thumbnails?",
        answer: "Yes. 100KB is a practical size for many thumbnails, avatars, and lightweight visuals.",
      },
      {
        question: "Does the 100KB tool support PNG and WebP?",
        answer: "Yes. The compressor accepts JPG, PNG, and WebP files.",
      },
    ],
    defaultTargetKB: 100,
  },
  {
    slug: "compress-image-to-200kb",
    name: "Compress Image to 200KB",
    shortName: "200KB",
    category: "image",
    mode: "compressor",
    title: "Compress Image to 200KB Online Free | ReduceImageSize",
    description:
      "Compress image to 200KB online free for websites, blogs, stores, and lightweight publishing workflows.",
    heroTitle: "Compress Image to 200KB Online",
    heroCopy:
      "Start from a 200KB target for web publishing, product photos, and landing-page images that need to stay fast.",
    badge: "SEO page",
    featureList: [
      "200KB target preset",
      "Helpful for website images",
      "Before and after preview",
      "Format switching included",
    ],
    faqList: [
      {
        question: "Can I compress website images to 200KB?",
        answer: "Yes. This page is set up for 200KB workflows that are common in publishing and eCommerce.",
      },
      {
        question: "Should I use WebP for 200KB targets?",
        answer: "WebP is often a strong choice for website-focused images because it compresses efficiently.",
      },
      {
        question: "Can I resize dimensions too?",
        answer: "Yes. You can still set a custom width and height while using the 200KB target.",
      },
    ],
    defaultTargetKB: 200,
  },
];

export const homeTools = toolPages.filter((tool) => tool.homeFeatured);

export function getToolPage(slug: string) {
  return toolPages.find((tool) => tool.slug === slug) || null;
}
