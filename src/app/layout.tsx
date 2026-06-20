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
    "Free online image tools for India — compress to 20KB, 50KB, 100KB, resize, convert JPG/PNG/WebP, crop, and remove backgrounds in your browser.",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/images/logo.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    shortcut: "/favicon.ico",
    apple: "/images/logo.svg",
  },
  openGraph: {
    title: "ReduceImageSize | Fast Image Tool Hub",
    description:
      "Use a complete tool hub to compress, resize, convert, crop, enhance images online, and convert ml to oz.",
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
    description: "Compress, resize, convert, crop, enhance images, and convert ml to oz in your browser.",
    images: [`${siteUrl}/og-image.png`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN">
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
