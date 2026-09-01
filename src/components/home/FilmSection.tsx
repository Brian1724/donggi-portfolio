import Image from "next/image";
import Link from "next/link";
import { films, type Film } from "@/data/films";
import { homeCopy } from "@/data/home";
import styles from "../CinematicOnePage.module.css";

export function FilmSection({ onPlay }: { onPlay: (film: Film) => void }) {
  return (
    <section
      className={`${styles.section} ${styles.filmSection}`}
      id="film"
      aria-labelledby="film-title"
    >
      <div className={`${styles.filmHeading} ${styles.reveal}`}>
        <div>
          <p className={styles.eyebrow}>03 / SHORT FILMS</p>
          <h2 className={styles.display} id="film-title">
            THREE FILMS.
            <br />
            ONE POINT OF VIEW.
          </h2>
        </div>
        <p>
          Travel · Memory · Portrait
          <br />
          2025—2026
        </p>
      </div>
      <p className={`${styles.filmIntro} ${styles.reveal}`}>{homeCopy.films.intro}</p>
      <div className={styles.filmGrid}>
        {films.map((film, index) => (
          <FilmCard
            key={film.id}
            film={film}
            index={index + 1}
            onPlay={() => onPlay(film)}
          />
        ))}
      </div>
      <div className={`${styles.inlineContact} ${styles.reveal}`}>
        <p>{homeCopy.films.contact}</p>
        <Link href="/contact">협업 이야기 나누기 ↗</Link>
      </div>
    </section>
  );
}

function FilmCard({ film, index, onPlay }: { film: Film; index: number; onPlay: () => void }) {
  const formatClass = `film${film.format[0].toUpperCase()}${film.format.slice(1)}`;

  return (
    <article className={`${styles.filmCard} ${styles[formatClass]} ${styles.reveal}`}>
      <button
        type="button"
        className={styles.filmMedia}
        onClick={onPlay}
        aria-label={`${film.title} 전체 영상 재생`}
      >
        <Image
          src={film.poster}
          alt={film.alt}
          fill
          sizes="(max-width: 800px) 100vw, 40vw"
        />
        <span className={styles.posterShade} aria-hidden="true" />
        <span className={styles.cardPlay} aria-hidden="true">
          <i />
        </span>
        <span className={styles.filmIndex}>0{index}</span>
      </button>
      <div className={styles.filmCardMeta}>
        <div>
          <h3>{film.title}</h3>
          <p className={styles.filmDescription}>{film.description}</p>
          <p>{film.role}</p>
        </div>
        <p>
          {film.year}
          <br />
          {film.duration}
        </p>
      </div>
    </article>
  );
}
