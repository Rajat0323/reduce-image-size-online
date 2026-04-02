import "../styles/globals.css";
import "../styles/hub.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import type { Metadata } from "next";
import { organizationSchema, softwareSchema, websiteSchema } from "../seo/schema";

const siteUrl = "https://www.reduceimagesizeonline.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ReduceImageSize | Fast Image Tool Hub",
    template: "%s | ReduceImageSize",
  },
  description:
    "ReduceImageSize is an India-focused image tool hub to compress images to 20KB, resize, convert, crop, remove backgrounds, and optimize uploads online.",
  keywords: [
    "image compressor to 20kb",
    "compress image to 20kb online india",
    "reduce image size online",
    "compress image online",
    "jpg to png",
    "png to jpg high quality",
    "webp to jpg",
    "compress image to 50kb",
    "compress image to 100kb",
    "compress image to 200kb",
  ],
  icons: {
    icon: [
      { url: "/images/logo.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/images/logo.svg",
    apple: "/images/logo.svg",
  },
  openGraph: {
    title: "ReduceImageSize | Fast Image Tool Hub",
    description:
      "Use a complete image tool hub to compress, resize, convert, crop, and enhance images online.",
    url: siteUrl,
    siteName: "ReduceImageSize",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "ReduceImageSize premium image tools brand",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReduceImageSize | Fast Image Tool Hub",
    description: "Compress, resize, convert, crop, and enhance images in your browser.",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([websiteSchema, organizationSchema, softwareSchema]),
          }}
        />
      </head>

      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
