import Link from "next/link";

const productLinks = [
  { href: "/reduce-image-size", label: "Compress Images" },
  { href: "/blog", label: "Blog" },
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="section-content">
        <div className="footer-grid">
          <div>
            <p>
              ReduceImageSizeOnline delivers a privacy-first compressor that keeps your images on
              device, cuts file weight, and keeps your pages fast. No ads, no logins, no upload.
            </p>
            <p className="footnote">Need enterprise support? Hit the contact page to chat.</p>
          </div>

          <div>
            <h4>Product</h4>
            {productLinks.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>

          <div>
            <h4>Company</h4>
            {companyLinks.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <p className="footnote" style={{ marginTop: 0 }}>
          ? {new Date().getFullYear()} ReduceImageSizeOnline. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
