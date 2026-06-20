import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About ReduceImageSize",
  description:
    "Learn about ReduceImageSize, a privacy-first tool hub for image compression, exact-KB workflows, and browser-based tools.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About ReduceImageSize",
    description:
      "Learn about ReduceImageSize, a privacy-first tool hub for image compression and browser-based workflows.",
    url: "https://www.reduceimagesizeonline.com/about",
    siteName: "ReduceImageSize",
    images: ["https://www.reduceimagesizeonline.com/og-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About ReduceImageSize",
    description:
      "Learn about ReduceImageSize, a privacy-first tool hub for image compression and browser-based workflows.",
    images: ["https://www.reduceimagesizeonline.com/og-image.png"],
  },
};

export default function About() {
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: 60 }}>
      <h1>About ReduceImageSize</h1>
      <p>
        ReduceImageSize is a browser-based image tool hub designed to help website owners,
        marketers, developers, and everyday users in India prepare lighter image files.
      </p>

      <p>
        The product focuses on exact-KB targets, format conversion, resizing, and private
        processing so files stay on your device while you work.
      </p>
    </main>
  );
}
