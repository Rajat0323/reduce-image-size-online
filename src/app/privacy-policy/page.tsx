import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the ReduceImageSize privacy policy and learn how browser-based processing keeps images on your device.",
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy",
    description:
      "Read the ReduceImageSize privacy policy and learn how browser-based processing keeps images on your device.",
    url: "https://www.reduceimagesizeonline.com/privacy-policy",
    siteName: "ReduceImageSize",
    images: ["https://www.reduceimagesizeonline.com/og-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy",
    description:
      "Read the ReduceImageSize privacy policy and learn how browser-based processing keeps images on your device.",
    images: ["https://www.reduceimagesizeonline.com/og-image.png"],
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="container">
      <h1>Privacy Policy</h1>
      <p>
        We respect your privacy. All image processing happens directly in your
        browser.
      </p>
      <p>
        We do not upload, store, or share your images on our servers.
      </p>
      <p>
        We use Google Analytics to understand site usage (pages visited, device type,
        approximate location). Image files you upload are still processed locally in your
        browser and are not sent to our servers for editing.
      </p>
    </main>
  );
}
