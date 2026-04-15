import Link from "next/link";

const productLinks = [
  { href: "/image-compressor", label: "Image Compressor" },
  { href: "/image-resizer", label: "Image Resizer" },
  { href: "/image-converter", label: "Image Converter" },
  { href: "/crop-image", label: "Crop Image Tool" },
  { href: "/bulk-image-compressor", label: "Bulk Compressor" },
  { href: "/ml-to-oz-calculator", label: "ML to Oz Calculator" },
];

const popularLinks = [
  { href: "/compress-image-to-20kb", label: "Compress to 20KB" },
  { href: "/compress-image-to-30kb", label: "Compress to 30KB" },
  { href: "/compress-image-to-50kb", label: "Compress to 50KB" },
  { href: "/compress-image-to-100kb", label: "Compress to 100KB" },
  { href: "/compress-image-to-200kb", label: "Compress to 200KB" },
  { href: "/background-remover", label: "Background Remover" },
  { href: "/image-upscaler", label: "Image Upscaler" },
  { href: "/rotate-flip-image", label: "Rotate and Flip" },
];

const workflowLinks = [
  { href: "/passport-photo-size-maker", label: "Passport Photo Size Maker" },
  { href: "/compress-signature-for-form", label: "Compress Signature for Form" },
  { href: "/compress-image-for-ssc-form", label: "Compress Image for SSC Form" },
  { href: "/compress-image-for-upsc-form", label: "Compress Image for UPSC Form" },
  { href: "/compress-image-for-job-application", label: "Compress for Job Application" },
  { href: "/compress-image-for-email", label: "Compress for Email" },
  { href: "/compress-image-for-website-upload", label: "Compress for Website Upload" },
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
  { href: "/blog", label: "Blog" },
  { href: "/articles", label: "Articles" },
];

function FooterLinkColumn({
  title,
  links,
}: {
  title: string;
  links: Array<{ href: string; label: string }>;
}) {
  return (
    <div className="footer-column">
      <h4>{title}</h4>
      <ul className="footer-link-list">
        {links.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="section-content footer-content">
        <div className="footer-grid">
          <div className="footer-brand-block">
            <p className="footer-intro">
              ReduceImageSizeOnline delivers a privacy-first image platform that helps with exact-KB
              compression, converter workflows, document uploads, and mobile-friendly optimization.
            </p>
            <p className="footnote footer-note">
              Need support? Use the contact page and we will help you out. We are honest about
              quality limits and never store uploaded files.
            </p>
          </div>

          <FooterLinkColumn title="Product" links={productLinks} />
          <FooterLinkColumn title="Popular" links={popularLinks} />
          <FooterLinkColumn title="Workflow pages" links={workflowLinks} />
          <FooterLinkColumn title="Company" links={companyLinks} />
        </div>

        <p className="footnote footer-copyright">
          (c) {new Date().getFullYear()} ReduceImageSizeOnline. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
