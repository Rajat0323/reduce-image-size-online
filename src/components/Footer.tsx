import Link from "next/link";

const productLinks = [
  { href: "/image-compressor", label: "Image Compressor" },
  { href: "/image-resizer", label: "Image Resizer" },
  { href: "/image-converter", label: "Image Converter" },
  { href: "/crop-image", label: "Crop Image Tool" },
  { href: "/bulk-image-compressor", label: "Bulk Compressor" },
  { href: "/remove-image-metadata", label: "Remove Metadata" },
];

const exactKbLinks = [
  { href: "/compress-image-to-10kb", label: "Compress to 10KB" },
  { href: "/compress-image-to-20kb", label: "Compress to 20KB" },
  { href: "/compress-image-to-50kb", label: "Compress to 50KB" },
  { href: "/compress-image-to-100kb", label: "Compress to 100KB" },
  { href: "/compress-image-to-200kb", label: "Compress to 200KB" },
  { href: "/compress-image-to-500kb", label: "Compress to 500KB" },
  { href: "/compress-image-to-1mb", label: "Compress to 1MB" },
];

const converterLinks = [
  { href: "/heic-to-jpg-converter", label: "HEIC to JPG" },
  { href: "/webp-to-jpg-converter", label: "WebP to JPG" },
  { href: "/jpg-to-webp-converter", label: "JPG to WebP" },
  { href: "/png-to-jpg-converter", label: "PNG to JPG" },
  { href: "/jpg-to-png-converter", label: "JPG to PNG" },
  { href: "/png-to-webp-converter", label: "PNG to WebP" },
];

const platformLinks = [
  { href: "/compress-image-for-instagram", label: "Compress for Instagram" },
  { href: "/compress-image-for-whatsapp", label: "Compress for WhatsApp" },
  { href: "/compress-image-for-wordpress", label: "Compress for WordPress" },
  { href: "/compress-image-for-shopify", label: "Compress for Shopify" },
  { href: "/compress-image-for-email", label: "Compress for Email" },
  { href: "/compress-image-for-website", label: "Compress for Website" },
];

const resizeLinks = [
  { href: "/resize-image-to-1080x1080", label: "Resize to 1080×1080" },
  { href: "/resize-image-to-1920x1080", label: "Resize to 1920×1080" },
  { href: "/resize-image-for-youtube-thumbnail", label: "YouTube Thumbnail" },
  { href: "/resize-image-to-400x400", label: "Resize to 400×400" },
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
  { href: "/blog", label: "Blog" },
  { href: "/articles", label: "Guides" },
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
              ReduceImageSize is a global image tool hub with 50+ free pages for compression,
              conversion, resizing, and platform-specific workflows.
            </p>
            <p className="footnote footer-note">
              Need Indian government form tools? Visit{" "}
              <a href="https://imageformatconverter.in" rel="noopener noreferrer">
                imageformatconverter.in
              </a>
              .
            </p>
          </div>

          <FooterLinkColumn title="Product" links={productLinks} />
          <FooterLinkColumn title="Exact KB" links={exactKbLinks} />
          <FooterLinkColumn title="Converters" links={converterLinks} />
          <FooterLinkColumn title="Platforms" links={platformLinks} />
          <FooterLinkColumn title="Resize" links={resizeLinks} />
          <FooterLinkColumn title="Company" links={companyLinks} />
        </div>

        <p className="footnote footer-copyright">
          (c) {new Date().getFullYear()} ReduceImageSize. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
