export type SeoSection = {
  heading: string;
  level: 2 | 3;
  paragraphs: string[];
  bullets?: string[];
  steps?: { title: string; body: string }[];
};

export type SeoRichContent = {
  sections: SeoSection[];
  extendedFaqs: { question: string; answer: string }[];
};

export type SeoPageContext = {
  slug: string;
  title: string;
  topic: string;
  description: string;
  heroCopy: string;
  toolLabel: string;
  keywords: string[];
  relatedLinks: { href: string; label: string }[];
  pageType: "tool" | "intent";
  mode?: string;
};

function countWords(text: string) {
  return text.split(/\s+/).filter(Boolean).length;
}

function countContent(content: SeoRichContent) {
  let total = 0;
  for (const section of content.sections) {
    total += countWords(section.heading);
    total += section.paragraphs.reduce((sum, p) => sum + countWords(p), 0);
    total += (section.bullets || []).reduce((sum, b) => sum + countWords(b), 0);
    total += (section.steps || []).reduce((sum, s) => sum + countWords(s.title) + countWords(s.body), 0);
  }
  total += content.extendedFaqs.reduce(
    (sum, faq) => sum + countWords(faq.question) + countWords(faq.answer),
    0
  );
  return total;
}

function introSections(ctx: SeoPageContext): SeoSection[] {
  const { topic, toolLabel, description, heroCopy } = ctx;
  return [
    {
      heading: `What is ${topic}?`,
      level: 2,
      paragraphs: [
        `${topic} is one of the most searched image workflows online because upload portals, social platforms, CMS dashboards, and email clients all enforce strict file-size and format rules. ${description}`,
        `${heroCopy} ReduceImageSize helps global users solve this without installing desktop software, creating accounts, or sending private photos to unknown servers. Everything runs locally in the browser, which makes the workflow faster for one-off uploads and safer for sensitive documents such as ID scans, profile photos, and product images.`,
        `Whether you are preparing images for a government form, an e-commerce listing, a blog post, or a messaging app, ${toolLabel.toLowerCase()} gives you a predictable starting point. You can upload JPG, PNG, WebP, and HEIC in most flows, preview the output, and download when the result matches your target.`,
      ],
    },
    {
      heading: `Why ${topic} matters for SEO, speed, and conversions`,
      level: 2,
      paragraphs: [
        `Heavy images are one of the biggest reasons pages load slowly. Slow pages hurt search rankings, increase bounce rates, and reduce conversions on stores and landing pages. ${topic} directly improves Core Web Vitals by reducing transfer size before images ever reach your server or CDN.`,
        `Search engines also reward helpful, task-focused pages that match intent. A dedicated page for ${topic.toLowerCase()} helps users land on exactly the workflow they need instead of forcing them through a generic editor. That improves engagement signals such as time on page, scroll depth, and return visits.`,
        `For creators and businesses, smaller images mean faster uploads on mobile data, fewer rejected submissions, and cleaner galleries. The same photo can be reused across Instagram, WhatsApp, WordPress, Shopify, email, and PDF workflows once it is compressed, converted, or resized correctly.`,
      ],
      bullets: [
        "Faster page loads and better Lighthouse scores",
        "Fewer upload rejections on strict portals",
        "Lower bandwidth usage for mobile users",
        "More consistent branding across platforms",
        "Better email deliverability with lighter attachments",
      ],
    },
  ];
}

function howToSections(ctx: SeoPageContext): SeoSection[] {
  const { topic, toolLabel } = ctx;
  return [
    {
      heading: `How to ${topic.toLowerCase()} online (step by step)`,
      level: 2,
      paragraphs: [
        `The fastest way to ${topic.toLowerCase()} is to use the tool at the top of this page. You do not need plugins, logins, or desktop apps. Follow the steps below for a clean result on the first attempt.`,
      ],
      steps: [
        {
          title: "Upload your source image",
          body: `Click the upload area or drag a file into the workspace. Supported formats include JPG, PNG, WebP, and HEIC on compatible tools. Start with the highest-quality source you have so the ${toolLabel.toLowerCase()} has enough detail to work with.`,
        },
        {
          title: "Choose the right preset or target",
          body: `Set the target size, dimensions, or output format required by your destination platform. If you are unsure, use the recommended preset on this page and adjust after previewing the first result.`,
        },
        {
          title: "Fine-tune quality settings",
          body: "Use the quality slider and format options to balance visual clarity with file weight. For photos, JPG or WebP usually produces the smallest files. Use PNG when you need transparency or crisp edges.",
        },
        {
          title: "Process and compare",
          body: "Run the tool and compare original versus output in the preview panel. Check dimensions, file size, and visual quality at 100% zoom before downloading.",
        },
        {
          title: "Download and upload to your destination",
          body: "Save the processed file and upload it to your form, store, blog, or chat app. Keep the original archived in case you need a different target later.",
        },
      ],
    },
    {
      heading: "Best practices for reliable results",
      level: 2,
      paragraphs: [
        `Always start from a sharp, well-lit source image when possible. Blurry inputs stay blurry after compression. If the portal publishes a maximum KB limit, aim slightly below it rather than exactly at the limit to avoid rounding issues.`,
        `For profile photos and product shots, crop first and compress second. Removing empty background area reduces file size more effectively than aggressive quality reduction alone.`,
        `When converting formats, remember that JPG does not support transparency. If your design uses soft edges or cutouts, export PNG or WebP instead.`,
      ],
      bullets: [
        "Use sRGB color profile for web uploads",
        "Avoid repeated re-compression of the same JPG",
        "Resize to exact pixel dimensions before KB targeting",
        "Test on mobile if your audience uploads from phones",
        "Keep a master copy in PNG or high-quality JPG",
      ],
    },
  ];
}

function platformSections(ctx: SeoPageContext): SeoSection[] {
  const { topic } = ctx;
  return [
    {
      heading: "Platform-specific upload tips",
      level: 2,
      paragraphs: [
        `${topic} requirements differ across platforms, but the same principles apply everywhere: match dimensions, respect file-size caps, and choose a widely supported format.`,
      ],
    },
    {
      heading: "Websites, WordPress, and Shopify",
      level: 3,
      paragraphs: [
        "Hero images and product galleries should typically stay under 200KB when possible. Use WebP for modern browsers and keep JPG fallbacks for older systems. Lazy-load large galleries so the first paint stays fast.",
      ],
    },
    {
      heading: "Instagram, Facebook, LinkedIn, and WhatsApp",
      level: 3,
      paragraphs: [
        "Social platforms re-compress uploads automatically. Starting with a reasonably optimized file helps preserve detail after platform processing. Square 1080×1080 works for many feeds; use platform-native aspect ratios for ads and cover photos.",
      ],
    },
    {
      heading: "Email and messaging apps",
      level: 3,
      paragraphs: [
        "Email clients often block large attachments. Compress images below 500KB for smooth delivery on mobile networks. For quick chat sharing, smaller files send faster and preview more reliably.",
      ],
    },
    {
      heading: "Forms, exams, and application portals",
      level: 3,
      paragraphs: [
        "Government and job portals frequently enforce strict KB limits such as 20KB, 50KB, or 100KB. Use exact-size tools on ReduceImageSize and verify dimensions if the portal specifies width and height in pixels.",
      ],
    },
  ];
}

function extendedGuideSections(ctx: SeoPageContext): SeoSection[] {
  const { topic, toolLabel, pageType, mode } = ctx;
  const modeNote =
    mode === "remove-bg"
      ? "For background removal, start with a subject on a solid or near-solid backdrop. Studio portraits, product shots on white, and passport photos on plain walls produce the cleanest cutouts. Complex hair and busy backgrounds may need manual touch-up in a desktop editor after export."
      : mode === "compress" || mode === "target-kb"
        ? "When targeting an exact KB limit, resize dimensions before compressing. A 4000-pixel-wide photo cannot reach 20KB without severe quality loss; reducing width to the portal requirement first gives the compressor room to preserve facial detail."
        : mode === "resize"
          ? "Lock aspect ratio unless the destination requires a fixed box. Social cover photos, marketplace thumbnails, and form portals often publish exact pixel dimensions—match those numbers instead of guessing from CSS display size."
          : mode === "convert"
            ? "Choose output format based on how the image will be used. WebP and AVIF excel on modern sites; JPG remains the safest default for forms and legacy portals; PNG is best when transparency or sharp text edges matter."
            : `${toolLabel} works best when you start from a clean source file rather than a screenshot or re-shared chat attachment. Original camera or export files retain more detail through processing.`;

  return [
    {
      heading: `Complete guide to ${topic.toLowerCase()} in 2026`,
      level: 2,
      paragraphs: [
        `Online image workflows changed rapidly as mobile uploads, AI-assisted editing, and strict portal limits became normal. ${topic} is no longer a niche task reserved for designers—it is a daily requirement for students, sellers, recruiters, bloggers, and anyone submitting documents digitally.`,
        `${modeNote} ReduceImageSize publishes dedicated pages like this one because generic advice rarely matches real upload rules. Search engines also reward pages that answer a specific query thoroughly, which is why this guide goes beyond a short FAQ.`,
        `Use the sections below as a reference you can return to whenever a platform updates its limits. Bookmark this page, share it with teammates, and pair it with related tools on ReduceImageSize to build a repeatable pipeline from capture to publish.`,
      ],
    },
    {
      heading: "Privacy, security, and local browser processing",
      level: 2,
      paragraphs: [
        "Many online image tools upload files to remote servers for processing. That creates privacy risk for ID scans, medical records, confidential product shots, and personal portraits. ReduceImageSize processes images locally in your browser using Web Workers and Canvas APIs whenever possible.",
        "Local processing means your files are not stored on our servers for editing. The trade-off is that very large batches may be slower on low-end devices, which is why bulk workflows offer optional batch controls while single-file tools prioritize precision.",
        "For compliance-sensitive workflows, still verify your organization's policy before using any web tool. When in doubt, process on a trusted device and delete downloads after upload confirmation.",
      ],
      bullets: [
        "No account required for standard tool usage",
        "Files stay on your device during processing",
        "HTTPS protects page delivery and asset loading",
        "Clear preview before download reduces rework",
        "Original files remain untouched until you save output",
      ],
    },
    {
      heading: "Glossary: terms every uploader should know",
      level: 2,
      paragraphs: [
        "Understanding a few technical terms helps you diagnose rejected uploads faster and communicate with support teams more clearly.",
      ],
      bullets: [
        "Lossy compression: removes data to shrink file size; best for photos (JPG, WebP)",
        "Lossless compression: preserves pixels; best for graphics and transparency (PNG)",
        "Aspect ratio: proportional relationship between width and height (e.g., 4:3, 16:9)",
        "Metadata (EXIF): hidden camera data; sometimes must be removed for privacy or portal rules",
        "Color profile (sRGB): standard web color space; avoids dull or oversaturated exports",
        "KB vs MB: portals often cap uploads in kilobytes; 1000 KB ≈ 1 MB",
        "DPI vs pixels: print DPI matters for paper; web portals almost always specify pixel dimensions",
        "Chroma key cutout: removes a solid background color; works best on uniform backdrops",
      ],
    },
    {
      heading: pageType === "tool" ? `${toolLabel} vs desktop software` : `${topic} vs generic editors`,
      level: 2,
      paragraphs: [
        `Desktop apps such as Photoshop, GIMP, and Affinity Photo offer deep control for professionals. Browser tools like ${toolLabel} win on speed, accessibility, and zero-install workflows. Most users need a reliable result in under a minute—not a multi-hour editing session.`,
        "Use ReduceImageSize when you have a defined target: a KB cap, pixel box, format conversion, or quick cutout. Move to desktop software when you need layered compositing, advanced retouching, or brand-managed color pipelines.",
        "Many teams combine both: browser tools for daily uploads and desktop apps for campaign assets. Keeping this page in your workflow bookmarks saves time on repetitive portal submissions.",
      ],
    },
  ];
}

function technicalSections(ctx: SeoPageContext): SeoSection[] {
  const { topic, keywords } = ctx;
  const keywordLine = keywords.slice(0, 6).join(", ");
  return [
    {
      heading: "Technical guide: formats, quality, and file size",
      level: 2,
      paragraphs: [
        `Understanding how formats interact with compression helps you get better results from ${topic.toLowerCase()}. JPG uses lossy compression and is ideal for photographs. PNG is lossless and better for graphics with text or transparency. WebP often delivers the smallest size at similar visual quality.`,
        `Quality settings control how aggressively a compressor removes detail. A small drop in quality can produce a large drop in KB size. Preview is essential because the right setting depends on image content, not a universal number.`,
        `This page targets searches such as ${keywordLine}. Each query reflects a real upload constraint, which is why ReduceImageSize publishes dedicated landing pages instead of one generic compressor.`,
      ],
    },
    {
      heading: "Common mistakes to avoid",
      level: 2,
      paragraphs: [
        "Uploading oversized originals without resizing first wastes time and can produce unstable compression results. Setting quality too low creates banding and blurry faces. Converting PNG to JPG when you need transparency destroys the design.",
        "Another frequent issue is ignoring dimension requirements. A 4000×3000 photo compressed to 50KB will look unusable even if the file size is correct. Resize to the required pixel box, then compress to the KB target.",
      ],
      bullets: [
        "Do not upscale low-resolution sources for print",
        "Do not strip metadata if a portal requires it",
        "Do not use screenshots when original files are available",
        "Do not rely on platform auto-compression alone",
        "Do not forget to check color contrast after compression",
      ],
    },
    {
      heading: "Image SEO checklist for publishers",
      level: 2,
      paragraphs: [
        "Publishers who treat images as first-class content assets usually outperform competitors on speed and usability. Compress hero images, convert large PNG UI screenshots to WebP, and resize thumbnails to exact display dimensions rather than relying on CSS scaling alone.",
        "Add descriptive file names and alt text after optimization. Search engines cannot see pixels the way humans do, but they use surrounding text, page intent, and performance signals to rank helpful resources.",
        "Refresh evergreen pages when platforms change requirements. Instagram, LinkedIn, Shopify, and form portals update upload rules over time, and dedicated landing pages make those updates easier to manage.",
      ],
    },
    {
      heading: "Workflow examples by audience",
      level: 2,
      paragraphs: [
        "E-commerce teams often compress product photos to 100–200KB, convert PNG labels to JPG when transparency is unnecessary, and strip metadata before publishing supplier assets.",
        "Job seekers and students use exact-KB tools for online applications where a single rejected upload can delay submission deadlines.",
        "Bloggers and newsletter writers compress inline images so messages load quickly on mobile networks without sacrificing readability.",
        "Developers preparing marketing sites batch-convert screenshots to WebP and validate Lighthouse performance before each release.",
      ],
    },
  ];
}

function buildExtendedFaqs(ctx: SeoPageContext) {
  const { topic, toolLabel } = ctx;
  return [
    {
      question: `Is ${topic.toLowerCase()} free on ReduceImageSize?`,
      answer: `Yes. ${toolLabel} is free to use with no sign-up required. Processing happens in your browser.`,
    },
    {
      question: "Are my images stored on your servers?",
      answer: "No. Files are processed locally on your device. ReduceImageSize does not upload your images for storage.",
    },
    {
      question: "Which formats can I upload?",
      answer: "Most tools accept JPG, PNG, and WebP. HEIC conversion is supported on converter workflows for iPhone and iPad photos.",
    },
    {
      question: "Will compression ruin image quality?",
      answer: "Moderate compression preserves detail for web and form use. Use the preview panel and adjust quality until the output looks acceptable.",
    },
    {
      question: "Can I use the output commercially?",
      answer: "You retain rights to your own images. ReduceImageSize provides the tool only; content rights depend on your source assets.",
    },
    {
      question: "Does this work on mobile phones?",
      answer: "Yes. The tools are responsive and work in modern mobile browsers for quick uploads on the go.",
    },
    {
      question: "What if my file is still too large?",
      answer: "Try reducing dimensions first, switching to WebP or JPG, or lowering quality slightly. Exact-KB tools iterate toward your target automatically.",
    },
    {
      question: "How is this different from desktop software?",
      answer: "Browser tools start instantly, require no installation, and are ideal for one-off uploads. Desktop apps may offer more batch control for power users.",
    },
    {
      question: "Can I process multiple images at once?",
      answer: "Use the bulk image compressor for batches. Single-file tools focus on precise controls for one asset at a time.",
    },
    {
      question: "How does ReduceImageSize help Google rankings?",
      answer: `Faster pages improve Core Web Vitals, which search engines use as quality signals. ${topic} reduces transfer size before images reach your CDN. Dedicated landing pages like this one also match search intent, which supports better indexing and click-through rates when titles and descriptions align with user queries.`,
    },
    {
      question: `What is the difference between ${topic.toLowerCase()} and simply resizing in CSS?`,
      answer: "CSS display size does not change file weight. A 3000-pixel image shown at 300 pixels still downloads the full heavy file. True optimization resizes and compresses the asset itself so browsers and search crawlers fetch less data.",
    },
    {
      question: "Should I optimize images before or after uploading to WordPress?",
      answer: "Optimize before upload whenever possible. Pre-compressed assets give you predictable results, reduce server storage, and avoid relying on plugins that may re-compress unpredictably. Use WebP or JPG for photos and PNG only when transparency is required.",
    },
    {
      question: "How can I verify my file meets portal limits?",
      answer: "Check file properties on your device after download. Compare both KB size and pixel dimensions against the portal instructions. If rejected, reduce dimensions first, then re-run the target KB tool rather than lowering quality alone.",
    },
  ];
}

function relatedSection(ctx: SeoPageContext): SeoSection {
  const links = ctx.relatedLinks
    .slice(0, 8)
    .map((link) => `${link.label} (${link.href})`)
    .join(", ");
  return {
    heading: "Related ReduceImageSize tools",
    level: 2,
    paragraphs: [
      `Users who search for ${ctx.topic.toLowerCase()} often continue with related workflows on the same site. Explore ${links} to build a complete image pipeline from capture to publish.`,
      "ReduceImageSize is designed as a global image tool hub with dedicated pages for exact KB targets, social platforms, format conversion, and pixel-perfect resizing.",
    ],
  };
}

export function buildSeoRichContent(ctx: SeoPageContext): SeoRichContent & { wordCount: number } {
  const sections: SeoSection[] = [
    ...introSections(ctx),
    ...howToSections(ctx),
    ...platformSections(ctx),
    ...technicalSections(ctx),
    ...extendedGuideSections(ctx),
    relatedSection(ctx),
    {
      heading: `Start using ${ctx.toolLabel} now`,
      level: 2 as const,
      paragraphs: [
        `Scroll to the top of this page to open ${ctx.toolLabel}. Upload your image, choose the settings that match your platform, and download the optimized result in seconds.`,
        `For long-term SEO performance, keep this page bookmarked and share it with teammates who handle uploads, listings, or content publishing. Faster images improve user experience and search visibility together.`,
      ],
    },
  ];

  const content: SeoRichContent = {
    sections,
    extendedFaqs: buildExtendedFaqs(ctx),
  };

  return { ...content, wordCount: countContent(content) };
}

export function buildToolSeoContext(tool: {
  slug: string;
  name: string;
  title: string;
  description: string;
  heroCopy: string;
  keywords?: string[];
  mode: string;
}): SeoPageContext {
  const relatedLinks = [
    { href: "/image-compressor", label: "Image Compressor" },
    { href: "/image-resizer", label: "Image Resizer" },
    { href: "/image-converter", label: "Image Converter" },
    { href: "/compress-image-to-50kb", label: "Compress to 50KB" },
    { href: "/compress-image-to-100kb", label: "Compress to 100KB" },
    { href: "/background-remover", label: "Background Remover" },
    { href: "/remove-image-metadata", label: "Remove Metadata" },
    { href: "/blog", label: "Image Guides Blog" },
  ].filter((link) => link.href !== `/${tool.slug}`);

  return {
    slug: tool.slug,
    title: tool.title,
    topic: tool.name,
    description: tool.description,
    heroCopy: tool.heroCopy,
    toolLabel: tool.name,
    keywords: tool.keywords || [tool.name.toLowerCase(), "image tool online", "free image tool"],
    relatedLinks,
    pageType: "tool",
    mode: tool.mode,
  };
}

export function buildIntentSeoContext(page: {
  slug: string;
  title: string;
  description: string;
  heroTitle: string;
  heroCopy: string;
  relatedLinks: { href: string; label: string }[];
}): SeoPageContext {
  return {
    slug: page.slug,
    title: page.title,
    topic: page.heroTitle,
    description: page.description,
    heroCopy: page.heroCopy,
    toolLabel: page.heroTitle,
    keywords: [
      page.heroTitle.toLowerCase(),
      page.slug.replace(/-/g, " "),
      "compress image online",
      "resize image online",
    ],
    relatedLinks: page.relatedLinks,
    pageType: "intent",
  };
}
