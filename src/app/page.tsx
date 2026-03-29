import Script from "next/script";
import type { Metadata } from "next";

import "../styles/landing.css";
import LandingSections from "../components/LandingSections";

const siteUrl = "https://www.reduceimagesizeonline.com";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  title: "Reduce Image Size Online Free | Fast JPG, PNG, WEBP Compressor",
  description:
    "Reduce image size online instantly and securely. Compress JPG, PNG, and WEBP files without uploads, then download optimized results individually or as a ZIP.",
  keywords: [
    "reduce image size",
    "compress image online",
    "image compressor free",
    "reduce image size in kb",
    "reduce image size in mb",
    "compress jpg online",
    "compress png online",
    "compress webp",
    "image optimization",
    "core web vitals",
  ],
  openGraph: {
    title: "Reduce Image Size Online Free | No Upload Image Compressor",
    description:
      "Shrink JPG, PNG, and WEBP files while you stay on-device. Batch, quality, and format controls built for fast websites.",
    url: siteUrl,
    siteName: "ReduceImageSizeOnline",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Reduce Image Size Online",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reduce Image Size Online Free",
    description:
      "Compress images directly in the browser. Zero uploads, instant downloads, no limits.",
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const heroStats = [
  { value: "12M+", label: "Images compressed" },
  { value: "1.6s", label: "Avg. LCP after compression" },
  { value: "100%", label: "Browser-based security" },
];

const features = [
  {
    icon: "⚡",
    title: "Zero-upload compression",
    description: "All encoding happens in your browser. Files never leave your device, so privacy stays intact.",
  },
  {
    icon: "🗂️",
    title: "Batch-ready workflows",
    description: "Compress unlimited files, then download individuals or a single ZIP with smart filenames.",
  },
  {
    icon: "🎯",
    title: "Quality & format control",
    description:
      "Slider + presets let you dial-in JPEG, PNG, or WEBP outputs without guessing. Preview savings instantly.",
  },
  {
    icon: "🧮",
    title: "Adaptive resizing",
    description: "Target exact width/height or let the compressor maintain ratios for responsive-ready visuals.",
  },
  {
    icon: "🔒",
    title: "Speed & reliability",
    description: "Lightweight code, service-worker friendly, and built for consistent Core Web Vitals wins.",
  },
];

const stats = [
  { value: "99.98%", label: "Uptime" },
  { value: "3×", label: "Faster load times" },
  { value: "0ms", label: "Server uploads" },
  { value: "5MB", label: "Max browser support" },
];

const steps = [
  {
    title: "Upload",
    description: "Drag, paste, or pick images from your device. JPG, PNG, WEBP and mixed sets are welcome.",
  },
  {
    title: "Tune",
    description:
      "Choose slider presets, adjust width / height, lock aspect ratio, and pick your preferred format.",
  },
  {
    title: "Download",
    description: "Save optimized files individually or grab a ZIP bundle for the whole batch.",
  },
];

const useCases = [
  {
    icon: "🌐",
    title: "Websites & Landing Pages",
    description: "Improve First Contentful Paint and Lighthouse scores with lighter hero images.",
  },
  {
    icon: "🛒",
    title: "eCommerce",
    description: "Shrink product galleries without sacrificing detail so shoppers stay engaged.",
  },
  {
    icon: "📱",
    title: "Social & Marketing",
    description: "Pre-compress before uploads to keep campaigns fast and predictable.",
  },
  {
    icon: "📧",
    title: "Email & Presentations",
    description: "Deliver smaller attachments and slides that load instantly on any device.",
  },
  {
    icon: "☁️",
    title: "Cloud Storage",
    description: "Free up precious Drive, Dropbox, and S3 storage without re-working files.",
  },
  {
    icon: "👩‍💻",
    title: "Agencies & Teams",
    description: "Share the link, compress together, and handoff assets without extra tooling.",
  },
];

const seoHighlights = [
  "Reduce image size in KB or MB without losing detail.",
  "Support for JPG, PNG, WEBP with format switching.",
  "Batch compression and ZIP download to ship entire collections.",
  "All processing stays in your browser — no servers, no queues.",
];

const faqList = [
  {
    question: "Can I compress multiple images at once?",
    answer: "Yes — upload unlimited files, compress them, and download individually or as a ZIP.",
  },
  {
    question: "Is my data secure during compression?",
    answer: "Absolutely. Everything runs inside your browser pixel for pixel. Nothing is uploaded.",
  },
  {
    question: "What formats can I reduce?",
    answer: "JPG, PNG, and WEBP are supported. Conversion between formats is available too.",
  },
  {
    question: "How small can my files go?",
    answer:
      "You can reduce 50-95% depending on quality settings, with instant previews before you download.",
  },
  {
    question: "Does resizing distort my images?",
    answer: "Use the maintain ratio toggle or set explicit pixels to keep proportions intact.",
  },
  {
    question: "Why should I compress before publishing?",
    answer:
      "Optimized assets boost Core Web Vitals (LCP, CLS, INP), speed up mobile experiences, and improve SEO.",
  },
];

const trustItems = [
  { title: "100% Local", copy: "No images leave your browser." },
  { title: "Lightning Fast", copy: "Instant previews + progress indicators." },
  { title: "Transparent", copy: "View original vs compressed size before download." },
  { title: "Always Free", copy: "No subscriptions, forever available." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqList.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function Home() {
  return (
    <>
      <Script id="landing-faq" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqSchema)}
      </Script>

      <main className="landing">
        <LandingSections
          heroStats={heroStats}
          features={features}
          stats={stats}
          steps={steps}
          useCases={useCases}
          seoHighlights={seoHighlights}
          faqList={faqList}
          trustItems={trustItems}
        />
      </main>
    </>
  );
}
