import { ResponsiveImage as Image } from "@/components/ResponsiveImage";
import Link from "next/link";
import { filmsByNewest, type Film } from "@/data/films";
import { getHomeSectionLabel, homeCopy } from "@/data/home";
import { formatYearRange } from "@/lib/content-years";
import { getWorkMediaHref } from "@/lib/work-media";
import styles from "../CinematicOnePage.module.css";

export function FilmSection({ onPlay }: { onPlay: (film: Film) => void }) {
  const yearRange = formatYearRange(filmsByNewest.map((film) => film.year));

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
        {filmsByNewest.map((film, index) => (
          <FilmCard
            key={film.id}
            film={film}
            order={index}
            onPlay={() => onPlay(film)}
          />
        ))}
      </div>
      <div className={`${styles.inlineContact} ${styles.reveal}`} data-scroll-reveal>
        <p>{homeCopy.films.contact}</p>
        <Link href="/contact">촬영 문의</Link>
      </div>
    </section>
  );
}

function FilmCard({ film, order, onPlay }: { film: Film; order: number; onPlay: () => void }) {
  const formatClass = `film${film.format[0].toUpperCase()}${film.format.slice(1)}`;

  return (
    <article className={`${styles.filmCard} ${styles[formatClass]} ${styles.reveal}`} data-scroll-reveal data-reveal-delay={String(order % 3 * 70)}>
      <button
        type="button"
        className={styles.filmMedia}
        data-image-reveal
        onClick={onPlay}
        aria-label={`${film.title} 전체 영상 재생`}
        style={{ aspectRatio: film.posterRatio }}
      >
        <Image
          src={film.posterAlt ?? film.poster}
          alt={film.alt}
          fill
          sizes="(max-width: 800px) 100vw, 40vw"
        />
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
