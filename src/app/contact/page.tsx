import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Reduce Image Size Online",
  description:
    "Contact Reduce Image Size Online for support, questions, or partnership inquiries.",
  alternates: {
    canonical: "/contact",
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
