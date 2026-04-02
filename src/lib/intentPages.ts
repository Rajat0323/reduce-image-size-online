export type LandingFAQ = {
  question: string;
  answer: string;
};

export type LandingCard = {
  title: string;
  description: string;
};

export type IntentPage = {
  slug: string;
  title: string;
  description: string;
  heroTitle: string;
  heroCopy: string;
  introTitle: string;
  introCopy: string;
  ctaLabel: string;
  toolHref: string;
  highlights: string[];
  benefits: LandingCard[];
  useCases: LandingCard[];
  faqList: LandingFAQ[];
  relatedLinks: { href: string; label: string }[];
};

export const intentPages: IntentPage[] = [
  {
    slug: "compress-to-20kb",
    title: "Compress Image to 20KB Online Free | Passport and Signature Ready",
    description:
      "Compress image to 20KB online using a browser-based tool. Perfect for signatures, forms, and strict upload limits.",
    heroTitle: "Compress image to 20KB without trial and error.",
    heroCopy:
      "Use the exact-KB compressor to aim for 20KB quickly, keep files private, and download the result instantly.",
    introTitle: "Best for strict form uploads",
    introCopy:
      "20KB is a common limit for signatures and small document uploads. The tool starts with a 20KB target so you can get close faster.",
    ctaLabel: "Open 20KB compressor",
    toolHref: "/image-compressor?target=20&format=image/jpeg",
    highlights: [
      "Starts with a 20KB target automatically.",
      "Works fully in your browser with no upload.",
      "Supports JPG, PNG, and WEBP inputs.",
      "Great for signature and ID form workflows.",
    ],
    benefits: [
      { title: "Exact-size workflow", description: "Preset target size saves time when forms reject oversized files." },
      { title: "Private compression", description: "Your file stays on-device while the browser compresses it." },
      { title: "Mobile-friendly", description: "Useful when a phone gallery image needs quick reduction before upload." },
    ],
    useCases: [
      { title: "Signature uploads", description: "Trim scanned signatures to fit narrow KB limits." },
      { title: "Admission forms", description: "Handle portals that only accept small image files." },
      { title: "KYC documents", description: "Reduce supporting images without sending them to a server." },
    ],
    faqList: [
      { question: "Can I compress an image to exactly 20KB?", answer: "The compressor aims for 20KB or smaller and shows you the closest result for each file." },
      { question: "Which format works best for 20KB?", answer: "JPG or WEBP usually reaches 20KB more easily than PNG." },
      { question: "Is the 20KB tool safe?", answer: "Yes. Compression happens in the browser and the image is not uploaded." },
    ],
    relatedLinks: [
      { href: "/compress-signature-for-form", label: "Compress signature for form" },
      { href: "/passport-photo-size-maker", label: "Passport photo size maker" },
      { href: "/compress-image-to-50kb", label: "Compress to 50KB" },
    ],
  },
  {
    slug: "compress-to-50kb",
    title: "Compress Image to 50KB Online Free | Form and Photo Compressor",
    description:
      "Compress image to 50KB online with a free browser-based image compressor. Useful for passport photos, job forms, and quick uploads.",
    heroTitle: "Compress image to 50KB online in one workflow.",
    heroCopy:
      "Open the compressor with the 50KB preset, adjust quality if needed, and download a result ready for forms or photo portals.",
    introTitle: "A popular limit for forms and photo uploads",
    introCopy:
      "50KB is one of the most common upload limits for forms, profile photos, and document portals. This page sends you straight into the right preset.",
    ctaLabel: "Open 50KB compressor",
    toolHref: "/image-compressor?target=50&format=image/jpeg",
    highlights: [
      "Built-in 50KB target preset.",
      "Side-by-side comparison before download.",
      "Helpful for SSC, UPSC, and job applications.",
      "Batch compression for multiple files.",
    ],
    benefits: [
      { title: "Fast form prep", description: "Skip repeated upload rejections and compress before submitting." },
      { title: "Quality control", description: "Keep a quality ceiling and compare the output before downloading." },
      { title: "ZIP downloads", description: "Process multiple candidate photos and save them together." },
    ],
    useCases: [
      { title: "Passport photos", description: "Shrink large camera photos to a manageable 50KB target." },
      { title: "Government forms", description: "Prepare files for portals that enforce strict upload size rules." },
      { title: "Job applications", description: "Compress profile images or supporting photos before submission." },
    ],
    faqList: [
      { question: "Can I use this for passport photos?", answer: "Yes. Many users start with the 50KB target for passport-style uploads." },
      { question: "Will the image lose too much quality?", answer: "The tool keeps the output as close as possible to the chosen target while preserving usable quality." },
      { question: "Can I upload multiple images?", answer: "Yes. The tool supports multiple files and ZIP downloads." },
    ],
    relatedLinks: [
      { href: "/passport-photo-size-maker", label: "Passport photo size maker" },
      { href: "/compress-image-for-ssc-form", label: "Compress image for SSC form" },
      { href: "/compress-image-to-100kb", label: "Compress to 100KB" },
    ],
  },
  {
    slug: "compress-to-100kb",
    title: "Compress Image to 100KB Online | Free JPG and PNG Compressor",
    description:
      "Compress image to 100KB online free. Reduce JPG, PNG, and WEBP files for websites, profile uploads, and document portals.",
    heroTitle: "Reduce image size to 100KB without guessing.",
    heroCopy:
      "Launch the compressor with a 100KB target, keep everything in-browser, and fine-tune quality only if you want extra control.",
    introTitle: "A practical target for everyday uploads",
    introCopy:
      "100KB works well for profile pictures, thumbnails, and many application portals. The preset saves time by starting near the size you need.",
    ctaLabel: "Open 100KB compressor",
    toolHref: "/image-compressor?target=100&format=image/jpeg",
    highlights: [
      "100KB preset ready on page load.",
      "Useful for forms, profile uploads, and thumbnails.",
      "No account, no upload, no waiting queue.",
      "Shows closest result if a file cannot hit the target exactly.",
    ],
    benefits: [
      { title: "Website-friendly output", description: "100KB is a practical target for many thumbnails, avatars, and lightweight content images." },
      { title: "Private workflow", description: "Everything happens on your device instead of a third-party server." },
      { title: "Clear result stats", description: "Preview original size, compressed size, and percentage saved." },
    ],
    useCases: [
      { title: "Profile photos", description: "Compress avatars and member photos before uploading them online." },
      { title: "Application portals", description: "Prepare images for websites with moderate file-size limits." },
      { title: "Blog thumbnails", description: "Create lightweight visuals that still look sharp." },
    ],
    faqList: [
      { question: "Is 100KB good for website images?", answer: "Yes. Many thumbnails, avatars, and lightweight content images work well around 100KB." },
      { question: "Does this tool support PNG to 100KB?", answer: "Yes, though JPG or WEBP usually reaches the target more efficiently." },
      { question: "Can I resize dimensions too?", answer: "Yes. You can set width and height along with the target size." },
    ],
    relatedLinks: [
      { href: "/compress-image-for-email", label: "Compress image for email" },
      { href: "/compress-image-for-website-upload", label: "Compress image for website upload" },
      { href: "/jpg-to-webp-converter", label: "JPG to WEBP converter" },
    ],
  },
  {
    slug: "compress-to-200kb",
    title: "Compress Image to 200KB Online | Free Website Image Compressor",
    description:
      "Compress image to 200KB online for web uploads, blogs, stores, and lightweight product images. Works locally in your browser.",
    heroTitle: "Compress image to 200KB for faster websites.",
    heroCopy:
      "Use the 200KB preset to prepare blog images, product photos, and landing-page visuals without uploading files to a server.",
    introTitle: "Built for websites, stores, and content teams",
    introCopy:
      "200KB is a practical ceiling for many hero images, article visuals, and eCommerce assets. Start with the preset and adjust if needed.",
    ctaLabel: "Open 200KB compressor",
    toolHref: "/image-compressor?target=200&format=image/webp",
    highlights: [
      "200KB preset for web publishing workflows.",
      "Good starting point for blog and store images.",
      "WEBP-friendly for strong compression gains.",
      "Batch support for publishing teams.",
    ],
    benefits: [
      { title: "Better page speed", description: "Lighter images improve load times and Core Web Vitals." },
      { title: "Cleaner publishing flow", description: "Compress once before CMS upload instead of reworking files later." },
      { title: "Flexible output", description: "Switch formats or resize dimensions to balance quality and weight." },
    ],
    useCases: [
      { title: "Blog content", description: "Optimize feature images before publishing new posts." },
      { title: "Product galleries", description: "Keep store pages fast without tiny-looking photos." },
      { title: "Landing pages", description: "Reduce hero visuals before deployment." },
    ],
    faqList: [
      { question: "Should I use WEBP for 200KB targets?", answer: "WEBP is often the best starting point for website-focused compression." },
      { question: "Can I compress multiple website images at once?", answer: "Yes. Upload multiple files and download them individually or as a ZIP." },
      { question: "Does this help SEO?", answer: "Smaller images can improve load speed and support stronger Core Web Vitals." },
    ],
    relatedLinks: [
      { href: "/compress-image-for-website-upload", label: "Compress image for website upload" },
      { href: "/jpg-to-webp-converter", label: "JPG to WEBP converter" },
      { href: "/png-to-jpg-converter", label: "PNG to JPG converter" },
    ],
  },
  {
    slug: "passport-photo-size-maker",
    title: "Passport Photo Size Maker Online | Resize and Compress Passport Photos",
    description:
      "Make passport photo size online with a free browser-based tool. Resize and compress passport photos for forms, ID uploads, and applications.",
    heroTitle: "Prepare passport photos for online forms faster.",
    heroCopy:
      "Resize and compress passport-style images in one place. Use target KB presets, keep your files private, and download instantly.",
    introTitle: "Resize first, then compress to the required size",
    introCopy:
      "Passport uploads often need both smaller dimensions and a lower KB size. This workflow helps with both so form submissions go more smoothly.",
    ctaLabel: "Open passport photo tool",
    toolHref: "/image-compressor?target=50&format=image/jpeg",
    highlights: [
      "Works for common 20KB, 50KB, and 100KB targets.",
      "Supports manual width and height controls.",
      "Private browser-based editing for personal photos.",
      "Useful before visa, exam, and profile uploads.",
    ],
    benefits: [
      { title: "Exact-size presets", description: "Start from 20KB, 50KB, or 100KB instead of guessing." },
      { title: "Dimension control", description: "Resize the image if the portal requires a fixed width or height." },
      { title: "No upload required", description: "Sensitive photo files stay on your device." },
    ],
    useCases: [
      { title: "Passport renewals", description: "Reduce camera photos to lighter files before submitting online." },
      { title: "Visa applications", description: "Prepare photos for portals with strict size requirements." },
      { title: "Exam portals", description: "Reuse the same workflow for government or admission forms." },
    ],
    faqList: [
      { question: "Can I make a passport photo under 50KB?", answer: "Yes. Open the compressor with the 50KB preset and adjust dimensions if needed." },
      { question: "Is this a passport photo cropper?", answer: "This page focuses on size reduction and compression rather than face-cropping." },
      { question: "Does it work on mobile?", answer: "Yes. The tool is mobile-friendly and works in the browser." },
    ],
    relatedLinks: [
      { href: "/compress-image-to-50kb", label: "Compress to 50KB" },
      { href: "/compress-image-for-upsc-form", label: "Compress image for UPSC form" },
      { href: "/compress-signature-for-form", label: "Compress signature for form" },
    ],
  },
  {
    slug: "compress-signature-for-form",
    title: "Compress Signature for Form Online | Reduce Signature Image Size",
    description:
      "Compress signature for form submissions online. Reduce scanned or drawn signature images for 20KB and 50KB upload limits.",
    heroTitle: "Compress signature images for forms in seconds.",
    heroCopy:
      "Use the 20KB preset, switch to JPG if needed, and download a signature image ready for online submission.",
    introTitle: "Made for small signature uploads",
    introCopy:
      "Signatures usually need much smaller files than photos. Start with a low KB target and keep dimensions compact for better results.",
    ctaLabel: "Open signature compressor",
    toolHref: "/image-compressor?target=20&format=image/jpeg",
    highlights: [
      "Great fit for 20KB and 50KB signature limits.",
      "JPG output helps reduce scanned signature weight.",
      "No upload required for sensitive signature files.",
      "Useful for exam and employment portals.",
    ],
    benefits: [
      { title: "Low-KB targeting", description: "Start with a 20KB goal for tight submission rules." },
      { title: "Simple format control", description: "Convert larger PNG scans to JPG for smaller files." },
      { title: "Fast retries", description: "Upload, test, and download again quickly if a portal needs a different limit." },
    ],
    useCases: [
      { title: "Exam forms", description: "Prepare signature files for competitive exam applications." },
      { title: "Employment portals", description: "Reduce signature size before uploading supporting documents." },
      { title: "Admission forms", description: "Fit signatures into common school and university upload rules." },
    ],
    faqList: [
      { question: "What target size should I use for signatures?", answer: "20KB or 50KB are the most common starting points for form signatures." },
      { question: "Is JPG better than PNG for signatures?", answer: "For very small limits, JPG often compresses better than PNG." },
      { question: "Can I resize the signature image too?", answer: "Yes. You can set width and height before compressing." },
    ],
    relatedLinks: [
      { href: "/compress-image-to-20kb", label: "Compress to 20KB" },
      { href: "/compress-image-for-job-application", label: "Compress image for job application" },
      { href: "/compress-image-for-ssc-form", label: "Compress image for SSC form" },
    ],
  },
  {
    slug: "compress-image-for-ssc-form",
    title: "Compress Image for SSC Form Online | Photo and Signature Size Reducer",
    description:
      "Compress image for SSC form submissions online. Prepare SSC photo and signature files for common KB limits using a browser-based tool.",
    heroTitle: "Compress SSC form images before the portal rejects them.",
    heroCopy:
      "Use the exact-size compressor to prepare SSC photos and signatures with smaller file sizes and safer on-device processing.",
    introTitle: "Useful for SSC photo and signature preparation",
    introCopy:
      "SSC form uploads often require separate files with specific sizes. Use target presets and resizing controls to get closer faster.",
    ctaLabel: "Open SSC image compressor",
    toolHref: "/image-compressor?target=50&format=image/jpeg",
    highlights: [
      "Helpful for SSC photo and signature uploads.",
      "Target-KB presets reduce repeated submission errors.",
      "Manual resize controls for portal-specific dimensions.",
      "Private browser-based workflow.",
    ],
    benefits: [
      { title: "Photo and signature ready", description: "Use one tool for both common SSC upload assets." },
      { title: "Fewer retries", description: "Preset sizes help you reach the right range before uploading." },
      { title: "Quick comparison", description: "Check original versus compressed output before download." },
    ],
    useCases: [
      { title: "Candidate photo", description: "Compress a recent photo for SSC profile upload rules." },
      { title: "Signature file", description: "Reduce signature images for smaller file size limits." },
      { title: "Correction windows", description: "Adjust files again quickly if a portal changes validation." },
    ],
    faqList: [
      { question: "Can I use this for SSC signature uploads too?", answer: "Yes. The same workflow works for both photo and signature files." },
      { question: "Is there an SSC-specific preset?", answer: "Start with 20KB for signatures and 50KB or 100KB for photos, depending on the notice." },
      { question: "Will the tool upload my SSC photo?", answer: "No. Everything stays inside your browser." },
    ],
    relatedLinks: [
      { href: "/compress-signature-for-form", label: "Compress signature for form" },
      { href: "/compress-image-to-50kb", label: "Compress to 50KB" },
      { href: "/compress-image-for-upsc-form", label: "Compress image for UPSC form" },
    ],
  },
  {
    slug: "compress-image-for-upsc-form",
    title: "Compress Image for UPSC Form Online | Reduce Photo Size for Upload",
    description:
      "Compress image for UPSC form submissions online. Reduce photo and signature files for UPSC portal limits using a browser-based compressor.",
    heroTitle: "Reduce UPSC form image size before uploading.",
    heroCopy:
      "Open the browser-based compressor, choose a KB target, and prepare UPSC-ready image files without sending them anywhere.",
    introTitle: "Designed for exam portal workflows",
    introCopy:
      "UPSC image uploads usually need smaller photos and signatures. This page points you into presets that help you get there faster.",
    ctaLabel: "Open UPSC image compressor",
    toolHref: "/image-compressor?target=50&format=image/jpeg",
    highlights: [
      "Start with common exam-form targets.",
      "Resize dimensions when a portal asks for specific rules.",
      "Useful for both photos and signatures.",
      "No login or upload required.",
    ],
    benefits: [
      { title: "Exam-ready output", description: "Compress files before heading back to the UPSC portal." },
      { title: "Better control", description: "Target size, format, and dimensions from one screen." },
      { title: "Safer handling", description: "Personal documents remain on your own device." },
    ],
    useCases: [
      { title: "Photo uploads", description: "Reduce recent photographs for the application step." },
      { title: "Signature uploads", description: "Trim signature scans to smaller file sizes." },
      { title: "Supporting images", description: "Reuse the same flow for any related image requirement." },
    ],
    faqList: [
      { question: "Can I compress UPSC photos and signatures here?", answer: "Yes. The compressor works for both, with presets that help narrow the file size quickly." },
      { question: "Which target should I choose first?", answer: "Start with 20KB for signatures or 50KB and 100KB for photos, depending on the form rules." },
      { question: "Do I need to install anything?", answer: "No. The tool runs in the browser." },
    ],
    relatedLinks: [
      { href: "/passport-photo-size-maker", label: "Passport photo size maker" },
      { href: "/compress-image-for-ssc-form", label: "Compress image for SSC form" },
      { href: "/compress-image-to-100kb", label: "Compress to 100KB" },
    ],
  },
  {
    slug: "compress-image-for-job-application",
    title: "Compress Image for Job Application Online | Reduce Photo Size for Forms",
    description:
      "Compress image for job application forms online. Reduce profile photos, signatures, and supporting images before upload.",
    heroTitle: "Compress images for job applications without slowing down.",
    heroCopy:
      "Prepare profile photos and signatures for employment forms with exact-KB presets, resizing, and private browser-based compression.",
    introTitle: "Useful for employer portals and resume platforms",
    introCopy:
      "Many job forms reject files that are larger than their upload limits. This workflow helps you fix that before trying again.",
    ctaLabel: "Open job application compressor",
    toolHref: "/image-compressor?target=50&format=image/jpeg",
    highlights: [
      "Helpful for profile photo and signature uploads.",
      "Preset KB targets reduce repeated form errors.",
      "Batch mode for multiple documents or versions.",
      "No server upload for personal files.",
    ],
    benefits: [
      { title: "Faster applications", description: "Spend less time on rejected uploads and more time submitting forms." },
      { title: "Practical presets", description: "20KB, 50KB, 100KB, and 200KB targets cover many common form needs." },
      { title: "Format conversion", description: "Switch larger PNG files to JPG or WEBP for lighter output." },
    ],
    useCases: [
      { title: "Profile photos", description: "Compress ID-style photos before uploading to a jobs portal." },
      { title: "Signature images", description: "Reduce scanned signatures for application attachments." },
      { title: "Supporting documents", description: "Lower the size of image-based proof files." },
    ],
    faqList: [
      { question: "Can I compress job-application photos under 100KB?", answer: "Yes. Start with the 100KB preset or choose a lower target if the portal requires it." },
      { question: "Will the tool store my files?", answer: "No. Compression runs locally in your browser." },
      { question: "Can I adjust dimensions too?", answer: "Yes. The width and height controls remain available." },
    ],
    relatedLinks: [
      { href: "/compress-image-to-50kb", label: "Compress to 50KB" },
      { href: "/compress-image-to-100kb", label: "Compress to 100KB" },
      { href: "/compress-signature-for-form", label: "Compress signature for form" },
    ],
  },
  {
    slug: "compress-image-for-email",
    title: "Compress Image for Email Online | Reduce Photo Size Before Sending",
    description:
      "Compress image for email online and reduce attachment size before sending. Free browser-based compressor for JPG, PNG, and WEBP.",
    heroTitle: "Compress images before you send them by email.",
    heroCopy:
      "Reduce photo size for email attachments with smaller KB targets, format conversion, and instant downloads.",
    introTitle: "Keep attachments lightweight and easy to send",
    introCopy:
      "Email attachments add up quickly. Compress them ahead of time so they send faster and take less inbox and storage space.",
    ctaLabel: "Open email image compressor",
    toolHref: "/image-compressor?target=100&format=image/jpeg",
    highlights: [
      "Reduce image weight before attaching files to email.",
      "100KB and 200KB presets fit many everyday workflows.",
      "Format conversion helps produce lighter attachments.",
      "Batch compression for sending multiple images.",
    ],
    benefits: [
      { title: "Faster sending", description: "Smaller attachments upload and send more quickly." },
      { title: "Cleaner inbox sharing", description: "Helpful for resumes, decks, and image-based updates." },
      { title: "No software needed", description: "Everything happens in the browser." },
    ],
    useCases: [
      { title: "Client deliverables", description: "Send lighter previews or images without giant attachments." },
      { title: "Resume photos", description: "Compress profile images or supporting material before applying." },
      { title: "Presentation assets", description: "Share slides or images that open faster for recipients." },
    ],
    faqList: [
      { question: "What image size is good for email?", answer: "100KB to 200KB is a practical range for many email workflows, depending on image dimensions." },
      { question: "Can I compress several email images at once?", answer: "Yes. Upload multiple files and download a ZIP." },
      { question: "Does it work for PNG screenshots?", answer: "Yes, and converting them to JPG can often reduce size further." },
    ],
    relatedLinks: [
      { href: "/compress-image-to-100kb", label: "Compress to 100KB" },
      { href: "/compress-image-to-200kb", label: "Compress to 200KB" },
      { href: "/png-to-jpg-converter", label: "PNG to JPG converter" },
    ],
  },
  {
    slug: "compress-image-for-website-upload",
    title: "Compress Image for Website Upload | Free Web Image Compressor",
    description:
      "Compress image for website upload and improve page speed before publishing. Reduce JPG, PNG, and WEBP files locally in your browser.",
    heroTitle: "Compress website images before they slow down your pages.",
    heroCopy:
      "Prepare blog, product, and landing-page images for the web with lighter file sizes, format conversion, and batch downloads.",
    introTitle: "Built for publishing and SEO workflows",
    introCopy:
      "Website images do better when they are lighter. Use the compressor before uploading to your CMS so your pages start faster from day one.",
    ctaLabel: "Open web image compressor",
    toolHref: "/image-compressor?target=200&format=image/webp",
    highlights: [
      "Helpful for blog, store, and landing-page images.",
      "WEBP and JPG output for faster websites.",
      "Batch compression for content teams.",
      "Better prep for Core Web Vitals work.",
    ],
    benefits: [
      { title: "Faster page loads", description: "Smaller images can lower total page weight and improve perceived speed." },
      { title: "Better publishing flow", description: "Optimize before upload instead of fixing assets later in the CMS." },
      { title: "Flexible output", description: "Use target sizes, resize controls, or convert formats as needed." },
    ],
    useCases: [
      { title: "Blog hero images", description: "Reduce article visuals before publishing." },
      { title: "Product galleries", description: "Keep store pages lighter while preserving useful detail." },
      { title: "Marketing pages", description: "Compress homepage and landing-page visuals for better performance." },
    ],
    faqList: [
      { question: "Should I use WEBP for website uploads?", answer: "WEBP is often the best option for modern web publishing because it compresses efficiently." },
      { question: "Can this help Core Web Vitals?", answer: "Yes. Smaller images can improve loading performance and reduce bandwidth use." },
      { question: "Can I compress a whole set of website images?", answer: "Yes. Batch uploads and ZIP downloads are supported." },
    ],
    relatedLinks: [
      { href: "/compress-image-to-200kb", label: "Compress to 200KB" },
      { href: "/jpg-to-webp-converter", label: "JPG to WEBP converter" },
      { href: "/blog/how-to-reduce-image-size", label: "Read the image optimization guide" },
    ],
  },
  {
    slug: "jpg-to-webp-converter",
    title: "JPG to WEBP Converter Online | Convert and Compress JPG Images",
    description:
      "Convert JPG to WEBP online in your browser. Reduce image size and prepare faster-loading assets for websites and marketing pages.",
    heroTitle: "Convert JPG to WEBP and reduce size in one step.",
    heroCopy:
      "Open the compressor with WEBP selected, upload your JPG file, and download a lighter image ready for the web.",
    introTitle: "A practical upgrade for web publishing",
    introCopy:
      "WEBP often produces smaller files than JPG at similar visual quality. This landing page sends you straight into that workflow.",
    ctaLabel: "Open JPG to WEBP converter",
    toolHref: "/image-compressor?format=image/webp&target=200",
    highlights: [
      "WEBP preset selected automatically.",
      "Convert and compress at the same time.",
      "Good fit for websites and product pages.",
      "Works locally in your browser.",
    ],
    benefits: [
      { title: "Smaller web assets", description: "WEBP often helps lower file size more than JPG alone." },
      { title: "Better publishing workflow", description: "Convert and optimize before uploading to your CMS." },
      { title: "Private conversion", description: "No cloud upload needed for your source images." },
    ],
    useCases: [
      { title: "Blog images", description: "Convert post visuals to WEBP before publishing." },
      { title: "Store assets", description: "Reduce product images for faster category and product pages." },
      { title: "Marketing creatives", description: "Ship lighter graphics to landing pages and ad pages." },
    ],
    faqList: [
      { question: "Why convert JPG to WEBP?", answer: "WEBP often gives smaller file sizes while keeping good visual quality." },
      { question: "Can I set a target size too?", answer: "Yes. The main compressor lets you combine WEBP output with a KB target." },
      { question: "Does the converter upload my JPG?", answer: "No. Conversion happens locally in the browser." },
    ],
    relatedLinks: [
      { href: "/compress-image-for-website-upload", label: "Compress image for website upload" },
      { href: "/compress-image-to-200kb", label: "Compress to 200KB" },
      { href: "/png-to-jpg-converter", label: "PNG to JPG converter" },
    ],
  },
  {
    slug: "png-to-jpg-converter",
    title: "PNG to JPG Converter Online | Reduce PNG File Size Fast",
    description:
      "Convert PNG to JPG online and reduce image file size quickly. Ideal for email, forms, and websites that do not need transparency.",
    heroTitle: "Convert PNG to JPG to reduce file size faster.",
    heroCopy:
      "Switch heavier PNG images to JPG, choose a target size if needed, and download a lighter version for forms or web uploads.",
    introTitle: "Useful when transparency is not required",
    introCopy:
      "PNG is great for transparent graphics, but it can stay heavy. Converting to JPG is often the simplest way to hit smaller file targets.",
    ctaLabel: "Open PNG to JPG converter",
    toolHref: "/image-compressor?format=image/jpeg&target=100",
    highlights: [
      "JPG output selected automatically.",
      "Helps reduce heavy PNG screenshots and graphics.",
      "Useful for forms, email, and profile uploads.",
      "Can be combined with exact-KB targets.",
    ],
    benefits: [
      { title: "Smaller files", description: "JPG usually produces lighter output than PNG for non-transparent images." },
      { title: "Form-ready conversion", description: "Helpful when portals reject large PNG uploads." },
      { title: "Simple workflow", description: "Convert, compress, compare, and download from one interface." },
    ],
    useCases: [
      { title: "Screenshots", description: "Reduce screenshot size for email or support tickets." },
      { title: "Portal uploads", description: "Convert large PNG files before submitting online forms." },
      { title: "Website assets", description: "Turn non-transparent PNGs into lighter JPG images." },
    ],
    faqList: [
      { question: "Will PNG to JPG reduce file size?", answer: "In many cases, yes. JPG is often much lighter when you do not need transparency." },
      { question: "Can I keep the same dimensions?", answer: "Yes. You can convert formats without changing width or height." },
      { question: "Can I also aim for 100KB or 200KB?", answer: "Yes. The main compressor supports target sizes while converting." },
    ],
    relatedLinks: [
      { href: "/compress-image-for-email", label: "Compress image for email" },
      { href: "/compress-image-to-100kb", label: "Compress to 100KB" },
      { href: "/jpg-to-webp-converter", label: "JPG to WEBP converter" },
    ],
  },
];

export function getIntentPage(slug: string) {
  return intentPages.find((page) => page.slug === slug) || null;
}
