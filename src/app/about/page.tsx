import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Reduce Image Size Online",
  description:
    "Learn about Reduce Image Size Online, a browser-based image compressor focused on privacy, exact-KB targets, and fast website workflows.",
  alternates: {
    canonical: "/about",
  },
};

export default function About() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 60 }}>
      <h1>About Reduce Image Size Online</h1>
      <p>
        Reduce Image Size Online is a browser-based image compression tool designed to help
        website owners, marketers, developers, and everyday users prepare lighter image files.
      </p>

      <p>
        The product focuses on exact-KB targets, format conversion, resizing, and private
        processing so files stay on your device while you work.
      </p>
    </div>
  );
}
