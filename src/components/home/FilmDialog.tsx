import type { RefObject } from "react";
import type { Film } from "@/data/films";
import styles from "../CinematicOnePage.module.css";

type FilmDialogProps = {
  dialogRef: RefObject<HTMLDialogElement | null>;
  videoRef: RefObject<HTMLVideoElement | null>;
  film: Film | null;
  onClose: () => void;
};

export function FilmDialog({ dialogRef, videoRef, film, onClose }: FilmDialogProps) {
  const dialogLabel = film
    ? `${film.title}${film.title.includes(film.year) ? "" : ` ${film.year}`}`
    : "FILM";

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="film-dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <div className={styles.dialogBar}>
        <span id="film-dialog-title">DONGGI / {dialogLabel}</span>
        <button type="button" onClick={onClose} aria-label="영상 닫기">
          닫기 ×
        </button>
      </div>
      <video ref={videoRef} controls playsInline preload="metadata" poster={film?.poster} />
    </dialog>
  );
}
