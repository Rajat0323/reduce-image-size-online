"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/reduce-image-size", label: "Compressor" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-inner">
        <Link href="/" className="logo">
          <Image src="/logo.png" alt="ReduceImageSize Logo" width={40} height={40} priority />
          <span className="logo-title">
            ReduceImageSize
            <small>Fast compressor</small>
          </span>
        </Link>

        <nav className="nav-links" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link href="/reduce-image-size" className="btn btn-ghost">
            Open Compressor
          </Link>
        </nav>

        <button
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {menuOpen && (
        <div className="nav-mobile" role="menu" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <Link key={`mobile-${item.href}`} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link
            href="/reduce-image-size"
            className="btn btn-primary"
            onClick={() => setMenuOpen(false)}
          >
            Compress Images
          </Link>
        </div>
      )}
    </header>
  );
}
