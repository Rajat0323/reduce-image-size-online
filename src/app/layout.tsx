import "../styles/globals.css";
import "../styles/hub.css";
import { Suspense } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GoogleAnalytics from "../components/GoogleAnalytics";
import GoogleAnalyticsRouteTracker from "../components/GoogleAnalyticsRouteTracker";
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
    "Free online image tools worldwide — compress to exact KB, convert JPG PNG WebP HEIC, resize for social media, and optimize for websites.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
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
      "Use a complete tool hub to compress, resize, convert, crop, and enhance images online.",
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
        <GoogleAnalytics />
        <Suspense fallback={null}>
          <GoogleAnalyticsRouteTracker />
        </Suspense>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
