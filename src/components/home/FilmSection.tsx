"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ResponsiveImage as Image } from "@/components/ResponsiveImage";
import Link from "next/link";
import { homeFilms, type Film } from "@/data/films";
import { getHomeSectionLabel, homeCopy } from "@/data/home";
import { formatYearRange } from "@/lib/content-years";
import { getWorkMediaHref } from "@/lib/work-media";
import styles from "../CinematicOnePage.module.css";

export function FilmSection({ onPlay }: { onPlay: (film: Film) => void }) {
  const yearRange = formatYearRange(homeFilms.map((film) => film.year));
  const [previewEnabled, setPreviewEnabled] = useState(false);
  const [activePreview, setActivePreview] = useState<string | null>(null);

  useEffect(() => {
    const pointer = matchMedia("(hover: hover) and (pointer: fine)");
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const update = () => {
      const allowed = pointer.matches && !motion.matches && !connection?.saveData;
      setPreviewEnabled(allowed);
      if (!allowed) setActivePreview(null);
    };
    update();
    pointer.addEventListener("change", update);
    motion.addEventListener("change", update);
    return () => {
      pointer.removeEventListener("change", update);
      motion.removeEventListener("change", update);
    };
  }, []);
  useEffect(() => {
    const stopWhenHidden = () => {
      if (document.hidden) setActivePreview(null);
    };
    document.addEventListener("visibilitychange", stopWhenHidden);
    return () => document.removeEventListener("visibilitychange", stopWhenHidden);
  }, []);
  const updatePreview = useCallback((id: string, active: boolean) => {
    setActivePreview((current) => active ? id : current === id ? null : current);
  }, []);

  return (
    <section
      className={`${styles.section} ${styles.filmSection}`}
      id="film"
      aria-labelledby="film-title"
    >
      <div className={`${styles.filmHeading} ${styles.reveal}`} data-scroll-reveal>
        <div>
          <p className={styles.eyebrow}>
            {getHomeSectionLabel("films")} · {yearRange}
          </p>
          <h2 className={styles.display} id="film-title">
            계절을 이어온 기록.
          </h2>
        </div>
      </div>
      <p className={`${styles.filmIntro} ${styles.reveal}`} data-scroll-reveal data-reveal-delay="70">{homeCopy.films.intro}</p>
      <div className={styles.filmGrid}>
        {homeFilms.map((film, index) => (
          <FilmCard
            key={film.id}
            film={film}
            order={index}
            onPlay={() => onPlay(film)}
            previewEnabled={previewEnabled}
            previewActive={activePreview === film.id}
            onPreviewChange={updatePreview}
          />
        ))}
      </div>
      <div className={`${styles.inlineContact} ${styles.reveal}`} data-scroll-reveal>
        <Link href="/works/?category=film">전체 영상 보기</Link>
      </div>
    </section>
  );
}

function FilmCard({ film, order, onPlay, previewEnabled, previewActive, onPreviewChange }: {
  film: Film;
  order: number;
  onPlay: () => void;
  previewEnabled: boolean;
  previewActive: boolean;
  onPreviewChange: (id: string, active: boolean) => void;
}) {
  const formatClass = `film${film.format[0].toUpperCase()}${film.format.slice(1)}`;
  const mediaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const media = mediaRef.current;
    if (!media || !window.IntersectionObserver) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) onPreviewChange(film.id, false);
    });
    observer.observe(media);
    return () => observer.disconnect();
  }, [film.id, onPreviewChange]);

  return (
    <article className={`${styles.filmCard} ${styles[formatClass]} ${styles.reveal}`} data-scroll-reveal data-reveal-delay={String(order % 3 * 70)}>
      <button
        ref={mediaRef}
        type="button"
        className={styles.filmMedia}
        data-image-reveal
        onClick={onPlay}
        aria-label={`${film.title} 전체 영상 재생`}
        style={{ aspectRatio: film.posterRatio }}
        onPointerEnter={() => { if (previewEnabled && film.preview) onPreviewChange(film.id, true); }}
        onPointerLeave={() => onPreviewChange(film.id, false)}
        onFocus={() => { if (previewEnabled && film.preview) onPreviewChange(film.id, true); }}
        onBlur={() => onPreviewChange(film.id, false)}
      >
        <Image
          src={film.posterAlt ?? film.poster}
          alt={film.alt}
          fill
          sizes="(max-width: 800px) 100vw, 40vw"
        />
        {previewEnabled && previewActive && film.preview ? (
          <FilmPreview src={film.preview} />
        ) : null}
        <span className={styles.posterShade} aria-hidden="true" />
        <span className={styles.cardPlay} aria-hidden="true">
          <i />
        </span>
      </button>
      <div className={styles.filmCardMeta}>
        <div>
          <h3><Link href={getWorkMediaHref("film", film.id)}>{film.title}</Link></h3>
          <p className={styles.filmDescription}>{film.description}</p>
        </div>
        <p>
          {film.year} · {film.duration}
        </p>
      </div>
    </article>
  );
}

function FilmPreview({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    video?.play().catch(() => undefined);
    return () => video?.pause();
  }, []);

  return (
    <video
      ref={videoRef}
      className={`${styles.filmPreview} ${ready ? styles.filmPreviewReady : ""}`}
      src={src}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      onCanPlay={() => setReady(true)}
    />
  );
}
