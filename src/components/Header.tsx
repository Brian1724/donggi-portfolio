"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navLinks = [
  { href: "/works", label: "작업" },
  { href: "/about", label: "소개" },
  { href: "/journal", label: "기록" },
  { href: "/contact", label: "연락" },
];

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 32);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !isOpen) return;
      setIsOpen(false);
      menuButtonRef.current?.focus();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <header
      className={`cinema-header ${pathname === "/" ? "is-home" : ""} ${isScrolled ? "is-scrolled" : ""}`}
    >
      <div className="cinema-header-inner">
        <Link href="/" className="cinema-brand" aria-label="Donggi Yoon 홈" onClick={() => setIsOpen(false)}>
          <span aria-hidden="true" />
          DONGGI / VISUAL ARCHIVE
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
          ref={menuButtonRef}
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
        <p>메뉴 / Donggi Yoon</p>
        <div>
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              tabIndex={isOpen ? 0 : -1}
              onClick={() => setIsOpen(false)}
            >
              <span>0{index + 1}</span>
              {link.label}
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
