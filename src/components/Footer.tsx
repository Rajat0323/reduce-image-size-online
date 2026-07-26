import Link from "next/link";

const productLinks = [
  { href: "/#compressor", label: "Image Compressor" },
  { href: "/background-remover", label: "Background Remover" },
  { href: "/crop-image", label: "Crop Image" },
  { href: "/image-upscaler", label: "Image Upscaler" },
  { href: "/remove-image-metadata", label: "Remove Metadata" },
  { href: "/rotate-flip-image", label: "Rotate & Flip" },
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
  { href: "/blog", label: "Blog" },
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
        <div className="footer-grid" style={{ gridTemplateColumns: "minmax(0, 1.4fr) 1fr 1fr" }}>
          <div className="footer-brand-block">
            <strong>ReduceImageSize</strong>
            <p className="footer-intro">
              One free browser tool to compress, convert, and resize images. No account. Files stay
              on your device during editing.
            </p>
          </div>
          <FooterLinkColumn title="Tools" links={productLinks} />
          <FooterLinkColumn title="Company" links={companyLinks} />
        </div>
        <p className="footer-copyright">
          © {new Date().getFullYear()} ReduceImageSize. Built by Rajat Gupta.
        </p>
      </div>
    </footer>
  );
}
