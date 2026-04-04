import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | ReduceImageSize",
  description:
    "Read the ReduceImageSize privacy policy and learn how browser-based processing keeps images on your device.",
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | ReduceImageSize",
    description:
      "Read the ReduceImageSize privacy policy and learn how browser-based processing keeps images on your device.",
    url: "https://www.reduceimagesizeonline.com/privacy-policy",
    siteName: "ReduceImageSize",
    images: ["https://www.reduceimagesizeonline.com/og-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | ReduceImageSize",
    description:
      "Read the ReduceImageSize privacy policy and learn how browser-based processing keeps images on your device.",
    images: ["https://www.reduceimagesizeonline.com/og-image.png"],
  },
};

export default function PrivacyPolicyPage() {
  return (
    <section className="container">
      <h1>Privacy Policy</h1>
      <p>
        We respect your privacy. All image processing happens directly in your
        browser.
      </p>
      <p>
        We do not upload, store, or share your images on our servers.
      </p>
      <p>
        No personal data is collected while using our tools.
      </p>
    </section>
  );
}
