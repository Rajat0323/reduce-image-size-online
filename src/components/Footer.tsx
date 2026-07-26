import Link from "next/link";

const companyLinks = [
  { href: "/", label: "PDF to Image" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="section-content footer-content">
        <div className="footer-grid" style={{ gridTemplateColumns: "minmax(0, 1.4fr) 1fr" }}>
          <div className="footer-brand-block">
            <strong>ReduceImageSize</strong>
            <p className="footer-intro">
              Free PDF to image converter. Convert PDF pages to PNG, JPG, or WEBP in your browser.
            </p>
          </div>
          <div className="footer-column">
            <h4>Links</h4>
            <ul className="footer-link-list">
              {companyLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="footer-copyright">
          © {new Date().getFullYear()} ReduceImageSize. Built by Rajat Gupta.
        </p>
      </div>
    </footer>
  );
}
