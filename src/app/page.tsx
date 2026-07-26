import dynamic from "next/dynamic";
import Script from "next/script";
import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { Suspense } from "react";

import { SITE_NAME, SITE_URL } from "@/constants";
import "../styles/home-studio.css";

const homeDisplay = Fraunces({
  subsets: ["latin"],
  variable: "--font-home-display",
  display: "swap",
});

const homeBody = Outfit({
  subsets: ["latin"],
  variable: "--font-home-body",
  display: "swap",
});

const HomePdfToImageStudio = dynamic(() => import("@/components/HomePdfToImageStudio"), {
  ssr: false,
  loading: () => (
    <div className="home-studio-shell">
      <div className="home-studio-empty">
        <p className="home-studio-lead">Loading converter…</p>
      </div>
    </div>
  ),
});

export const metadata: Metadata = {
  title: "PDF to Image Converter Online — Free",
  description:
    "Convert PDF to PNG, JPG, or WEBP online in your browser. Free, private, no upload to a server.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "PDF to Image Converter Online — Free | ReduceImageSize",
    description:
      "Convert PDF pages to PNG, JPG, or WEBP privately in your browser. Free download.",
    url: `${SITE_URL}/`,
    siteName: SITE_NAME,
    type: "website",
    images: [`${SITE_URL}/og-image.png`],
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF to Image Converter Online — Free",
    description: "Convert PDF pages to PNG, JPG, or WEBP privately in your browser.",
    images: [`${SITE_URL}/og-image.png`],
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": ["SoftwareApplication", "WebApplication"],
  name: `${SITE_NAME} PDF to Image Converter`,
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Web Browser",
  url: SITE_URL,
  description:
    "Free online PDF to image converter. Convert PDF pages to PNG, JPG, or WEBP in the browser.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Convert PDF to PNG, JPG, or WEBP",
    "Choose all pages or a page range",
    "Browser-based private processing",
    "Download single images or ZIP",
  ],
};

export default function Home() {
  return (
    <>
      <Script id="home-software" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(softwareSchema)}
      </Script>

      <main className={`home-page ${homeDisplay.variable} ${homeBody.variable}`}>
        <section className="home-stage">
          <div className="home-stage-inner">
            <div className="home-hero-copy">
              <div className="home-brand-mark">
                <strong>ReduceImageSize</strong>
                <span>PDF to image</span>
              </div>
              <h1>PDF to Image Converter</h1>
              <p>Convert PDF pages to PNG, JPG, or WEBP — privately in your browser.</p>
            </div>

            <Suspense
              fallback={
                <div className="home-studio-shell">
                  <div className="home-studio-empty">
                    <p className="home-studio-lead">Loading converter…</p>
                  </div>
                </div>
              }
            >
              <HomePdfToImageStudio />
            </Suspense>
          </div>
        </section>
      </main>
    </>
  );
}
