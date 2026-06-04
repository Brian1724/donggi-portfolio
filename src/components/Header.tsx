"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { profile } from "@/data/profile";

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
    <header className="sticky top-0 z-50 bg-canvas/95 backdrop-blur-sm">
      <div className="mx-auto flex min-h-20 w-full max-w-[1280px] items-center justify-between gap-5 px-5 sm:px-8 lg:px-10">
        <Link href="/" className="flex items-center gap-2 text-xl font-black text-ink-deep">
          <span className="flex size-8 items-center justify-center rounded-full bg-primary text-base">
            D
          </span>
          Donggi
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
                    : "text-ink-deep hover:bg-primary-pale"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <a
            href={profile.photoInstagram}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-bold text-ink-deep underline decoration-ink-deep/30 underline-offset-4"
          >
            @dk4film
          </a>
          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center rounded-[24px] bg-primary px-5 text-sm font-bold text-ink-deep transition hover:bg-primary-active"
          >
            Contact
          </Link>
        </div>
        <button
          type="button"
          className="inline-flex min-h-12 items-center rounded-[24px] bg-primary-pale px-4 text-sm font-bold text-ink-deep md:hidden"
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
          className="grid gap-2 border-t border-line bg-canvas px-5 py-4 md:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-[24px] bg-primary-pale px-5 py-3 text-base font-bold text-ink-deep"
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
