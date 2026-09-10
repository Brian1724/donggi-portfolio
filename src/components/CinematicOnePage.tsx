"use client";

import { useEffect, useRef, useState } from "react";
import { ContactSection } from "@/components/home/ContactSection";
import { CinematicHero } from "@/components/home/CinematicHero";
import { FeaturedWorkSection } from "@/components/home/FeaturedWorkSection";
import { FilmDialog } from "@/components/home/FilmDialog";
import { FilmSection } from "@/components/home/FilmSection";
import { JournalPreviewSection } from "@/components/home/JournalPreviewSection";
import { ProfileSection } from "@/components/home/ProfileSection";
import { SpatialArchive } from "@/components/home/SpatialArchive";
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
  const heroInViewRef = useRef(true);
  const previousOverflowRef = useRef("");
  const [soundOn, setSoundOn] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reduceMotion = motionPreference.matches;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const shouldAutoplay = !reduceMotion && !connection?.saveData;
    shouldAutoplayRef.current = shouldAutoplay;

    const heroVideo = heroVideoRef.current;
    const dialog = dialogRef.current;
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

    const hero = page.querySelector<HTMLElement>("#top");
    const parallaxElements = Array.from(
      page.querySelectorAll<HTMLElement>("[data-cinematic-parallax]"),
    );
    let frameId = 0;

    const updateParallax = () => {
      frameId = 0;
      const reduced = motionPreference.matches;
      const heroRect = hero?.getBoundingClientRect();
      if (heroRect && heroRect.bottom > 0) {
        const progress = reduced ? 0 : Math.max(0, Math.min(1, -heroRect.top / heroRect.height));
        hero!.style.setProperty("--hero-scale", String(1.025 + progress * 0.02));
        hero!.style.setProperty("--hero-title-y", `${progress * -28}px`);
        hero!.style.setProperty("--hero-copy-y", `${progress * -12}px`);
        hero!.style.setProperty("--hero-darken", String(progress * 0.4));
      }
      const viewportCenter = window.innerHeight / 2;
      parallaxElements.forEach((element) => {
        const frame = element.parentElement?.getBoundingClientRect();
        if (!frame || frame.bottom < 0 || frame.top > innerHeight) return;
        const distance = frame.top + frame.height / 2 - viewportCenter;
        const speed = Number(element.dataset.cinematicParallax ?? 0.05);
        const offset = reduced ? 0 : Math.max(-40, Math.min(40, -distance * speed));
        element.style.transform = `translate3d(0, ${offset}px, 0)`;
      });
    };

    const requestParallax = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateParallax);
    };

    const syncPlayback = () => {
      shouldAutoplayRef.current = !motionPreference.matches && !connection?.saveData;
      if (shouldAutoplayRef.current && heroInViewRef.current && !document.hidden && !dialogRef.current?.open) heroVideo?.play().catch(() => undefined);
      else heroVideo?.pause();
      requestParallax();
    };
    const visibility = window.IntersectionObserver ? new IntersectionObserver(([entry]) => {
      heroInViewRef.current = entry.isIntersecting;
      syncPlayback();
    }) : null;
    if (hero) visibility?.observe(hero);
    updateParallax();
    window.addEventListener("scroll", requestParallax, { passive: true });
    window.addEventListener("resize", requestParallax);
    document.addEventListener("visibilitychange", syncPlayback);
    motionPreference.addEventListener("change", syncPlayback);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestParallax);
      window.removeEventListener("resize", requestParallax);
      visibility?.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      motionPreference.removeEventListener("change", syncPlayback);
      heroVideo?.pause();
      if (dialog?.open) document.body.style.overflow = previousOverflowRef.current;
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

    document.body.style.overflow = previousOverflowRef.current;
    setSelectedFilm(null);
    if (shouldAutoplayRef.current && heroInViewRef.current && !document.hidden) heroVideoRef.current?.play().catch(() => undefined);

    window.requestAnimationFrame(() => lastFocusedRef.current?.focus());
  };

  const openFilm = (film: Film) => {
    const dialog = dialogRef.current;
    const player = filmVideoRef.current;
    if (!dialog || !player) return;

    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    previousOverflowRef.current = document.body.style.overflow;
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
      <SpatialArchive />
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
