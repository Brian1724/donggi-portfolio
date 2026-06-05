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
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-canvas">
      <div className="container relative flex items-center justify-between gap-6 py-4">
        <Link
          href="/"
          className="brand-logo-link"
          onClick={() => setIsOpen(false)}
        >
          <Image
            src="/logo/logo-mono-ink.svg"
            alt="YOON DONGGI"
            width={162}
            height={30}
            priority
            className="brand-logo"
          />
        </Link>
        <nav className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  active
                    ? "bg-primary-pale text-ink-deep"
                    : "text-ink hover:bg-canvas-soft"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center md:flex">
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
          {navLinks.map((link) => (
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
