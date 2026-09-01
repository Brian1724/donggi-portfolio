import Image from "next/image";
import Link from "next/link";
import { archiveStills, type ArchiveStill } from "@/data/stills";
import { homeCopy } from "@/data/home";
import styles from "../CinematicOnePage.module.css";

export function StillArchiveSection() {
  return (
    <section
      className={`${styles.section} ${styles.archiveSection}`}
      id="stills"
      aria-labelledby="archive-title"
    >
      <div className={`${styles.archiveHeading} ${styles.reveal}`}>
        <div>
          <p className={styles.eyebrow}>04 / STILL ARCHIVE</p>
          <h2 className={styles.display} id="archive-title">
            BETWEEN
            <br />
            THE CUTS.
          </h2>
        </div>
        <p>{homeCopy.stills.description}</p>
      </div>
      <div className={styles.archiveGallery}>
        {archiveStills.map((still) => (
          <ArchiveFrame key={still.src} still={still} />
        ))}
      </div>
      <div className={styles.archiveMore}>
        <Link href="/works">사진 작업 더 보기 ↗</Link>
      </div>
    </section>
  );
}

function ArchiveFrame({ still }: { still: ArchiveStill }) {
  return (
    <figure className={`${styles.archiveFigure} ${styles[still.placement]} ${styles.reveal}`}>
      <div className={styles.archiveMedia}>
        <div className={styles.archiveImage} data-cinematic-parallax={still.speed}>
          <Image
            src={still.src}
            alt={still.alt}
            fill
            sizes="(max-width: 800px) 92vw, 70vw"
          />
        </div>
      </div>
      <figcaption>{still.label}</figcaption>
    </figure>
  );
}
