import type { RefObject } from "react";
import type { Film } from "@/data/films";
import styles from "../CinematicOnePage.module.css";

type FilmDialogProps = {
  dialogRef: RefObject<HTMLDialogElement | null>;
  videoRef: RefObject<HTMLVideoElement | null>;
  film: Film | null;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

export function FilmDialog({ dialogRef, videoRef, film, onClose, onPrevious, onNext }: FilmDialogProps) {
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
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") { event.preventDefault(); onPrevious(); }
        if (event.key === "ArrowRight") { event.preventDefault(); onNext(); }
      }}
    >
      <div className={styles.dialogBar}>
        <span id="film-dialog-title">DONGGI / {dialogLabel}</span>
        <div className={styles.dialogControls}>
          <button type="button" onClick={onPrevious} aria-label="이전 영상" title="이전 영상">←</button>
          <button type="button" onClick={onNext} aria-label="다음 영상" title="다음 영상">→</button>
          <button type="button" onClick={onClose} aria-label="영상 닫기" title="닫기">×</button>
        </div>
      </div>
      <video ref={videoRef} controls playsInline preload="metadata" poster={film?.poster} />
    </dialog>
  );
}
