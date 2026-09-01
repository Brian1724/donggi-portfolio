"use client";

import { useEffect, useRef, useState } from "react";
import { ContactSection } from "@/components/home/ContactSection";
import { CinematicHero } from "@/components/home/CinematicHero";
import { FeaturedWorkSection } from "@/components/home/FeaturedWorkSection";
import { FilmDialog } from "@/components/home/FilmDialog";
import { FilmSection } from "@/components/home/FilmSection";
import { JournalPreviewSection } from "@/components/home/JournalPreviewSection";
import { ProfileSection } from "@/components/home/ProfileSection";
import { StillArchiveSection } from "@/components/home/StillArchiveSection";
import { featuredFilm, type Film } from "@/data/films";
import styles from "./CinematicOnePage.module.css";

export function CinematicOnePage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const filmVideoRef = useRef<HTMLVideoElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const shouldAutoplayRef = useRef(true);
  const [soundOn, setSoundOn] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const shouldAutoplay = !reduceMotion && !connection?.saveData;
    shouldAutoplayRef.current = shouldAutoplay;

    const heroVideo = heroVideoRef.current;
    if (heroVideo) {
      heroVideo.defaultMuted = true;
      heroVideo.muted = true;

      if (shouldAutoplay) {
        heroVideo.play().catch(() => undefined);
      } else {
        heroVideo.pause();
        heroVideo.removeAttribute("autoplay");
      }
    }

    const page = pageRef.current;
    if (!page) return;

    const revealElements = Array.from(page.querySelectorAll<HTMLElement>(`.${styles.reveal}`));
    const supportsObserver = "IntersectionObserver" in window;

    if (!reduceMotion && supportsObserver) {
      page.classList.add(styles.motionReady);
    } else {
      revealElements.forEach((element) => element.classList.add(styles.visible));
    }

    let revealObserver: IntersectionObserver | null = null;
    if (supportsObserver) {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(styles.visible);
              revealObserver?.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -8%", threshold: 0.06 },
      );

      revealElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.94 && rect.bottom > 0) {
          element.classList.add(styles.visible);
        } else {
          revealObserver?.observe(element);
        }
      });
    }

    // Safari can miss an observer callback after restoring a background tab.
    // The archive must remain readable even if the entrance animation is skipped.
    const revealSafetyTimer = window.setTimeout(() => {
      revealElements.forEach((element) => element.classList.add(styles.visible));
      revealObserver?.disconnect();
    }, 1800);

    const parallaxElements = Array.from(
      page.querySelectorAll<HTMLElement>("[data-cinematic-parallax]"),
    );
    let ticking = false;

    const updateParallax = () => {
      const viewportCenter = window.innerHeight / 2;
      parallaxElements.forEach((element) => {
        const frame = element.parentElement?.getBoundingClientRect();
        if (!frame) return;
        const distance = frame.top + frame.height / 2 - viewportCenter;
        const speed = Number(element.dataset.cinematicParallax ?? 0.05);
        const offset = Math.max(-60, Math.min(60, -distance * speed));
        element.style.transform = `translate3d(0, ${offset}px, 0)`;
      });
      ticking = false;
    };

    const requestParallax = () => {
      if (ticking) return;
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    };

    if (!reduceMotion) {
      updateParallax();
      window.addEventListener("scroll", requestParallax, { passive: true });
      window.addEventListener("resize", requestParallax);
    }

    return () => {
      window.clearTimeout(revealSafetyTimer);
      window.removeEventListener("scroll", requestParallax);
      window.removeEventListener("resize", requestParallax);
      revealObserver?.disconnect();
      page.classList.remove(styles.motionReady);
    };
  }, []);

  const toggleSound = async () => {
    const video = heroVideoRef.current;
    if (!video) return;
    const nextSoundOn = video.muted;
    video.muted = !nextSoundOn;
    setSoundOn(nextSoundOn);
    if (nextSoundOn) await video.play().catch(() => undefined);
  };

  const closeFilm = () => {
    const film = filmVideoRef.current;
    const dialog = dialogRef.current;
    film?.pause();
    film?.removeAttribute("src");
    film?.load();

    if (dialog?.open) {
      if (typeof dialog.close === "function") dialog.close();
      else dialog.removeAttribute("open");
    }

    document.body.style.overflow = "";
    setSelectedFilm(null);
    if (shouldAutoplayRef.current) heroVideoRef.current?.play().catch(() => undefined);

    window.requestAnimationFrame(() => lastFocusedRef.current?.focus());
  };

  const openFilm = (film: Film) => {
    const dialog = dialogRef.current;
    const player = filmVideoRef.current;
    if (!dialog || !player) return;

    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    setSelectedFilm(film);
    heroVideoRef.current?.pause();
    player.pause();
    player.src = film.src;
    player.poster = film.poster;
    player.muted = false;
    player.load();
    player.currentTime = 0;

    if (!dialog.open) {
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");
    }

    document.body.style.overflow = "hidden";
    player.play().catch(() => undefined);
  };

  return (
    <div ref={pageRef} className={styles.page}>
      <CinematicHero
        videoRef={heroVideoRef}
        soundOn={soundOn}
        onPlay={() => openFilm(featuredFilm)}
        onToggleSound={toggleSound}
      />
      <ProfileSection />
      <FeaturedWorkSection onPlay={() => openFilm(featuredFilm)} />
      <FilmSection onPlay={openFilm} />
      <StillArchiveSection />
      <JournalPreviewSection />
      <ContactSection />
      <FilmDialog
        dialogRef={dialogRef}
        videoRef={filmVideoRef}
        film={selectedFilm}
        onClose={closeFilm}
      />
    </div>
  );
}
