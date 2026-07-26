"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  { href: "/#converter", label: "Convert" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
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
            <small>PDF to image</small>
          </span>
        </Link>

        <nav className="nav-links" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
          <Link href="/#converter" className="btn btn-ghost">
            Open tool
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
          <Link href="/#converter" className="btn btn-primary" onClick={() => setMenuOpen(false)}>
            Open tool
          </Link>
        </div>
      )}
    </header>
  );
}
