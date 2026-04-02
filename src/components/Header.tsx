"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/image-compressor", label: "Compressor" },
  { href: "/image-resizer", label: "Resizer" },
  { href: "/image-converter", label: "Converter" },
  { href: "/background-remover", label: "Background Remover" },
  { href: "/blog", label: "Blog" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-inner">
        <Link href="/" className="logo">
          <Image src="/images/logo.svg" alt="ReduceImageSize Logo" width={40} height={40} priority />
          <span className="logo-title">
            ReduceImageSize
            <small>Image tool hub</small>
          </span>
        </Link>

        <nav className="nav-links" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
          <Link href="/image-compressor" className="btn btn-ghost">
            Launch Tool
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
          <ThemeToggle />
          <Link
            href="/image-compressor"
            className="btn btn-primary"
            onClick={() => setMenuOpen(false)}
          >
            Launch Tool
          </Link>
        </div>
      )}
    </header>
  );
}
