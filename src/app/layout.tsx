import "../styles/globals.css";
import Header from "../components/Header";
import type { Metadata } from "next";
import { softwareSchema } from "../seo/schema";
import { faqSchema } from "../seo/faqData";

const siteUrl = "https://www.reduceimagesizeonline.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default:
      "Reduce Image Size Online Free (JPG, PNG, WEBP) – Fast & Secure Compressor",
    template: "%s | ReduceImageSizeOnline",
  },

  description:
    "Reduce image size online free. Compress JPG, PNG and WEBP images instantly without losing quality. Reduce image size in KB or MB. 100% secure browser-based image compressor.",

  keywords: [
    "reduce image size online",
    "compress image online",
    "reduce image size in kb",
    "reduce image size in mb",
    "image compressor free",
    "compress jpg online",
    "compress png online",
    "batch image compressor",
  ],



  icons: {
    icon: "/favicon.ico",
  },

  openGraph: {
    title: "Reduce Image Size Online Free",
    description:
      "Free online tool to reduce image size in KB or MB. Compress multiple images instantly.",
    url: siteUrl,
    siteName: "ReduceImageSizeOnline",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Reduce Image Size Online Tool",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Reduce Image Size Online Free",
    description:
      "Compress images instantly in your browser. No upload required.",
    images: [`${siteUrl}/og-image.png`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Software Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareSchema),
          }}
        />

        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      </head>

      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}