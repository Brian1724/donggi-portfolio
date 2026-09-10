"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function EditorialMotion() {
  const pathname = usePathname();
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    if (!window.IntersectionObserver) return;
    const seen = new WeakSet<Element>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        observer.unobserve(target);
        // The default state stays visible. Missed callbacks never hide content.
        if (!preference.matches) target.classList.add("image-enter");
      });
    }, { threshold: 0.08 });
    const discover = () => document.querySelectorAll("[data-image-reveal]").forEach((node) => {
      if (seen.has(node)) return;
      seen.add(node);
      if (node.getBoundingClientRect().top >= innerHeight) observer.observe(node);
    });
    discover();
    const mutations = new MutationObserver(discover);
    const main = document.getElementById("main-content");
    if (main) mutations.observe(main, { childList: true, subtree: true });
    const clearMotion = () => {
      if (preference.matches) document.querySelectorAll(".image-enter").forEach((node) => node.classList.remove("image-enter"));
    };
    preference.addEventListener("change", clearMotion);
    return () => { observer.disconnect(); mutations.disconnect(); preference.removeEventListener("change", clearMotion); };
  }, [pathname]);
  return null;
}
