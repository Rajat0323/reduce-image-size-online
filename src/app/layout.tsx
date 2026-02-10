import "../styles/globals.css";
import Header from "../components/Header";
import type { Metadata } from "next";
import { softwareSchema } from "../seo/schema";
import { faqSchema } from "../seo/faqData";

export const metadata: Metadata = {
  metadataBase: new URL("https://yourdomain.com"), // 🔥 Replace with your real domain later

  title: "Reduce Image Size Online Free | Compress Images in KB & MB",
  description:
    "Reduce image size online for free. Compress JPG, PNG and WEBP images in KB or MB without losing quality. Upload single or multiple images and download instantly.",

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
    url: "https://yourdomain.com",
    siteName: "ReduceImageSize",
    images: [
      {
        url: "/og-image.png", // Put this image inside public folder
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
    images: ["/og-image.png"],
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
