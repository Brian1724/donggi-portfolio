"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/works", label: "Works" },
  { href: "/journal", label: "Journal" },
];

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link
          href="/"
          className="brand-logo-link"
          onClick={() => setIsOpen(false)}
        >
          <Image
            src="/logo/logo-full.png"
            alt="YOON DONGGI"
            width={207}
            height={36}
            priority
            className="brand-logo brand-logo-full"
          />
          <Image
            src="/logo/logo-icon.png"
            alt="YOON DONGGI"
            width={32}
            height={32}
            priority
            className="brand-logo-icon"
          />
        </Link>
        <div className="header-actions">
          <nav className="header-nav">
            {navLinks.map((link) => {
              const active =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`header-nav-link ${active ? "is-active" : ""}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <Link href="/contact" className="btn btn-primary">
            Contact
          </Link>
        </div>
        <button
          type="button"
          className="btn btn-secondary md:!hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen((current) => !current)}
        >
          Menu
        </button>
      </div>
      {isOpen ? (
        <nav
          id="mobile-menu"
          className="absolute inset-x-0 top-full z-40 grid min-h-screen grid-cols-1 content-start gap-4 bg-canvas-soft p-6 md:hidden"
        >
          {[...navLinks, { href: "/contact", label: "Contact" }].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="heading rounded-[24px] bg-canvas px-6 py-4 text-ink"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
