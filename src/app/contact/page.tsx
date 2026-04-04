import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact ReduceImageSize",
  description:
    "Contact ReduceImageSize for support, questions, partnerships, or help with image tool workflows.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact ReduceImageSize",
    description:
      "Contact ReduceImageSize for support, questions, partnerships, or help with image tool workflows.",
    url: "https://www.reduceimagesizeonline.com/contact",
    siteName: "ReduceImageSize",
    images: ["https://www.reduceimagesizeonline.com/og-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact ReduceImageSize",
    description:
      "Contact ReduceImageSize for support, questions, partnerships, or help with image tool workflows.",
    images: ["https://www.reduceimagesizeonline.com/og-image.png"],
  },
};

export default function Contact() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 60 }}>
      <h1>Contact Us</h1>
      <p>For support or business inquiries, please contact us at:</p>

      <p>Email: rajat0323@gmail.com</p>
    </div>
  );
}
