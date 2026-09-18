"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

export function EditorialMotion() {
  const pathname = usePathname();
  useLayoutEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    if (!window.IntersectionObserver) return;
    const imageSeen = new WeakSet<Element>();
    const contentSeen = new WeakSet<Element>();
    const contentNodes = new Set<HTMLElement>();
    const root = document.documentElement;
    let initialFrame = 0;

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        imageObserver.unobserve(target);
        // The default state stays visible. Missed callbacks never hide content.
        if (!preference.matches) target.classList.add("image-enter");
      });
    }, { threshold: 0.08 });

    const revealContent = (nodes: HTMLElement[]) => {
      nodes.forEach((node, index) => {
        const authoredDelay = Number(node.dataset.revealDelay ?? 0);
        node.style.setProperty("--reveal-delay", `${authoredDelay + Math.min(index, 3) * 65}ms`);
        node.dataset.revealed = "true";
        contentObserver.unobserve(node);
      });
    };
    const contentObserver = new IntersectionObserver((entries) => {
      const entering = entries
        .filter((entry) => entry.isIntersecting)
        .map((entry) => entry.target as HTMLElement)
        .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
      if (entering.length) revealContent(entering);
    }, { threshold: 0.08, rootMargin: "0px 0px -7% 0px" });

    const discover = () => {
      document.querySelectorAll("[data-image-reveal]").forEach((node) => {
        if (imageSeen.has(node)) return;
        imageSeen.add(node);
        if (node.getBoundingClientRect().top >= innerHeight) imageObserver.observe(node);
      });

      const initiallyVisible: HTMLElement[] = [];
      document.querySelectorAll<HTMLElement>("[data-scroll-reveal]").forEach((node) => {
        if (contentSeen.has(node)) return;
        contentSeen.add(node);
        contentNodes.add(node);
        if (preference.matches || node.getBoundingClientRect().top < innerHeight * 0.94) {
          initiallyVisible.push(node);
        } else {
          contentObserver.observe(node);
        }
      });
      if (initiallyVisible.length) initialFrame = requestAnimationFrame(() => revealContent(initiallyVisible));
    };

    root.classList.add("scroll-reveal-ready");
    discover();
    const mutations = new MutationObserver(discover);
    const main = document.getElementById("main-content");
    if (main) mutations.observe(main, { childList: true, subtree: true });
    const clearMotion = () => {
      if (!preference.matches) return;
      document.querySelectorAll(".image-enter").forEach((node) => node.classList.remove("image-enter"));
      revealContent(Array.from(contentNodes));
    };
    preference.addEventListener("change", clearMotion);
    return () => {
      cancelAnimationFrame(initialFrame);
      imageObserver.disconnect();
      contentObserver.disconnect();
      mutations.disconnect();
      preference.removeEventListener("change", clearMotion);
      root.classList.remove("scroll-reveal-ready");
      contentNodes.forEach((node) => {
        delete node.dataset.revealed;
        node.style.removeProperty("--reveal-delay");
      });
    };
  }, [pathname]);
  return null;
}
