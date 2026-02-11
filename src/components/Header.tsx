import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <Link href="/" className="logo" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Image
            src="/logo.png"
            alt="ReduceImageSize Logo"
            width={40}
            height={40}
            priority
          />
          <span>ReduceImageSize</span>
        </Link>

        <nav className="nav">
          <Link href="/">Home</Link>
          <Link href="/reduce-image-size">Reduce Image Size</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>

        </nav>
      </div>
    </header>
  );
}
