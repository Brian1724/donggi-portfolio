import type { RefObject } from "react";
import { featuredFilm } from "@/data/films";
import { homeCopy } from "@/data/home";
import styles from "../CinematicOnePage.module.css";

type CinematicHeroProps = {
  videoRef: RefObject<HTMLVideoElement | null>;
  soundOn: boolean;
  onPlay: () => void;
  onToggleSound: () => void;
};

export function CinematicHero({
  videoRef,
  soundOn,
  onPlay,
  onToggleSound,
}: CinematicHeroProps) {
  return (
    <section className={styles.hero} id="top" aria-labelledby="hero-title">
      <video
        ref={videoRef}
        className={styles.heroVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/media/dalian/frame-opening.jpg"
        aria-label="대련의 도시 풍경과 여행 장면"
      >
        <source
          media="(max-width: 720px)"
          src="/media/dalian/donggi-hero-mobile-v2.webm"
          type="video/webm"
        />
        <source
          media="(max-width: 720px)"
          src="/media/dalian/donggi-hero-mobile-v2.mp4"
          type="video/mp4"
        />
        <source src="/media/dalian/donggi-hero-v2.webm" type="video/webm" />
        <source src="/media/dalian/donggi-hero-v2.mp4" type="video/mp4" />
      </video>
      <div className={styles.heroShade} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />

      <div className={styles.heroInner}>
        <div className={`${styles.heroKicker} ${styles.reveal}`}>
          <span>{homeCopy.hero.eyebrow}</span>
          <span>{homeCopy.hero.role}</span>
        </div>
        <h1 className={`${styles.heroTitle} ${styles.reveal}`} id="hero-title">
          <span>BETWEEN</span>
          <span className={styles.outline}>FRAMES.</span>
        </h1>
        <div className={`${styles.heroFooter} ${styles.reveal}`}>
          <p>{homeCopy.hero.message}</p>
          <div className={styles.heroActions}>
            <button className={styles.playLink} type="button" onClick={onPlay}>
              <i aria-hidden="true" /> Dalian 재생 <span>{featuredFilm.duration}</span>
            </button>
            <button
              className={styles.sound}
              type="button"
              onClick={onToggleSound}
              aria-pressed={soundOn}
              aria-label={soundOn ? "히어로 영상 소리 끄기" : "히어로 영상 소리 켜기"}
            >
              <span className={soundOn ? styles.soundActive : ""} aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              {soundOn ? "Sound on" : "Sound off"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
