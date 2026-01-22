"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/tentang-kami", label: "Tentang Kami" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/tips", label: "Tips" },
  { href: "/testimoni", label: "Testimoni" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Navigation */}
      <section className="main-nav hide-for-small">
        <div className="nav-col">
          <div className="nav-logo">
            <Link href="/">
              <Image
                src="/images/dwr.png"
                alt="Ultimate Autoshop"
                width={160}
                height={82}
                priority
                style={{ width: "auto", height: "auto", maxHeight: "70px" }}
              />
            </Link>
          </div>
          <nav className="nav-item-wrapper">
            {navItems.map((item) => (
              <div
                key={item.href}
                className={`nav-item ${pathname === item.href ? "current" : ""}`}
              >
                <Link href={item.href}>
                  <span>{item.label}</span>
                </Link>
              </div>
            ))}
          </nav>
        </div>
      </section>

      {/* Mobile Navigation */}
      <section className="mobile-nav">
        <div className="mobile-nav__logo">
          <Link href="/">
            <Image
              src="/images/dwr.png"
              alt="Ultimate Autoshop"
              width={140}
              height={72}
              priority
              style={{ width: "auto", height: "auto", maxHeight: "50px" }}
            />
          </Link>
        </div>
        <button
          className="mobile-nav__toggle"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </section>

      {/* Offcanvas Overlay */}
      {isMenuOpen && (
        <div
          className="offcanvas__overlay is-visible"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Offcanvas Menu */}
      <div className={`offcanvas ${isMenuOpen ? "is-open" : ""}`}>
        <div className="offcanvas__inner">
          <header className="offcanvas__header">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              <Image
                src="/images/dwr.png"
                alt="Ultimate Autoshop"
                width={140}
                height={72}
                style={{ width: "auto", height: "auto", maxHeight: "50px" }}
              />
            </Link>
            <button
              className="offcanvas__close"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <span></span>
              <span></span>
            </button>
          </header>
          <nav className="offcanvas__nav">
            {navItems.map((item) => (
              <div
                key={item.href}
                className={`offcanvas__nav-item ${
                  pathname === item.href ? "current-menu-item" : ""
                }`}
              >
                <Link href={item.href} onClick={() => setIsMenuOpen(false)}>
                  {item.label}
                </Link>
              </div>
            ))}
          </nav>
          <footer className="offcanvas__footer" style={{ marginTop: "auto" }}>
            <a
              href="https://wa.me/6289513301689"
              className="button"
              target="_blank"
              rel="noopener noreferrer"
              style={{ width: "100%", justifyContent: "center" }}
            >
              CHAT NOW
            </a>
          </footer>
        </div>
      </div>
    </>
  );
}
