import Image from "next/image";
import { featuredFilm } from "@/data/films";
import { homeCopy } from "@/data/home";
import styles from "../CinematicOnePage.module.css";

export function FeaturedWorkSection({ onPlay }: { onPlay: () => void }) {
  const featured = homeCopy.featuredWork;

  return (
    <section
      className={`${styles.section} ${styles.featureSection}`}
      aria-labelledby="feature-title"
    >
      <div className={`${styles.featureHeading} ${styles.reveal}`}>
        <div>
          <p className={styles.eyebrow}>02 / SELECTED WORK</p>
          <h2 className={styles.display} id="feature-title">
            DALIAN,
            <br />
            2026.
          </h2>
        </div>
        <p>{featured.description}</p>
      </div>
      <div className={styles.wideFrame} aria-label={featuredFilm.alt}>
        <div className={styles.parallaxMedia} data-cinematic-parallax="0.06">
          <Image
            src={featuredFilm.poster}
            alt={featuredFilm.alt}
            fill
            sizes="100vw"
          />
        </div>
        <button
          type="button"
          className={styles.framePlay}
          onClick={onPlay}
          aria-label="Dalian 전체 영상 재생"
        >
          <i aria-hidden="true" /> 전체 필름 보기
        </button>
      </div>
      <dl className={`${styles.projectBrief} ${styles.reveal}`}>
        <div>
          <dt>Purpose</dt>
          <dd>{featured.purpose}</dd>
        </div>
        <div>
          <dt>Location</dt>
          <dd>{featured.location}</dd>
        </div>
        <div>
          <dt>Role</dt>
          <dd>{featured.role}</dd>
        </div>
        <div>
          <dt>Concept</dt>
          <dd>{featured.concept}</dd>
        </div>
      </dl>
    </section>
  );
}
