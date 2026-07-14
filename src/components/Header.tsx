"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/works", label: "Works" },
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className="cinema-header">
      <div className="cinema-header-inner">
        <Link href="/" className="cinema-brand" aria-label="Donggi Yoon 홈" onClick={() => setIsOpen(false)}>
          <span aria-hidden="true" />
          DONGGI
        </Link>
        <nav className="cinema-nav" aria-label="주요 페이지">
            {navLinks.map((link) => {
              const active = pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={active ? "is-active" : ""}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
        </nav>
        <button
          type="button"
          className={`cinema-menu-button ${isOpen ? "is-open" : ""}`}
          aria-expanded={isOpen}
          aria-controls="cinema-mobile-menu"
          aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
          onClick={() => setIsOpen((current) => !current)}
        >
          <span />
          <span />
        </button>
      </div>
      <nav
        id="cinema-mobile-menu"
        className={`cinema-mobile-menu ${isOpen ? "is-open" : ""}`}
        aria-hidden={!isOpen}
      >
        <p>Navigate / Donggi Yoon</p>
        <div>
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              tabIndex={isOpen ? 0 : -1}
              onClick={() => setIsOpen(false)}
            >
              <span>0{index + 1}</span>
              {link.label.toUpperCase()}
            </Link>
          ))}
        </div>
        <a href="mailto:ydk0717@gmail.com" tabIndex={isOpen ? 0 : -1}>
          ydk0717@gmail.com
        </a>
      </nav>
    </header>
  );
}
