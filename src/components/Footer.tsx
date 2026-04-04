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
  { href: "/rotate-flip-image", label: "Rotate and Flip" },
  { href: "/background-remover", label: "Background Remover" },
  { href: "/image-upscaler", label: "Image Upscaler" },
  { href: "/passport-photo-size-maker", label: "Passport Photo Size Maker" },
  { href: "/compress-signature-for-form", label: "Compress Signature for Form" },
  { href: "/compress-image-for-ssc-form", label: "Compress Image for SSC Form" },
  { href: "/compress-image-for-upsc-form", label: "Compress Image for UPSC Form" },
  { href: "/compress-image-for-job-application", label: "Compress Image for Job Application" },
  { href: "/compress-image-for-email", label: "Compress Image for Email" },
  { href: "/compress-image-for-website-upload", label: "Compress Image for Website Upload" },
  { href: "/jpg-to-webp-converter", label: "JPG to WEBP Converter" },
  { href: "/png-to-jpg-converter", label: "PNG to JPG Converter" },
  { href: "/ml-to-oz-calculator", label: "ML to Oz Calculator" },
  { href: "/compress-image-to-50kb", label: "Compress to 50KB" },
  { href: "/compress-image-to-100kb", label: "Compress to 100KB" },
  { href: "/compress-image-to-200kb", label: "Compress to 200KB" },
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
  { href: "/blog", label: "Blog" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="section-content">
        <div className="footer-grid">
          <div>
            <p>
              ReduceImageSizeOnline delivers a privacy-first compressor that keeps your images on
              device, cuts file weight, and helps with forms, KYC uploads, websites, and exact-KB
              workflows across mobile and desktop.
            </p>
            <p className="footnote">
              Need support? Use the contact page and we will help you out. We are honest about
              quality limits and never store uploaded files.
            </p>
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
            <h4>Popular</h4>
            {popularLinks.map((item) => (
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
          (c) {new Date().getFullYear()} ReduceImageSizeOnline. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
