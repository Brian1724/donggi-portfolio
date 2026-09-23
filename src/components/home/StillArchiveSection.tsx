import Image from "next/image";
import Link from "next/link";
import { archiveStills, type ArchiveStill } from "@/data/stills";
import { getHomeSectionLabel, homeCopy } from "@/data/home";
import { getWorkMediaHref } from "@/lib/work-media";
import styles from "../CinematicOnePage.module.css";

export function StillArchiveSection() {
  return (
    <section
      className={`${styles.section} ${styles.archiveSection}`}
      id="stills"
      aria-labelledby="archive-title"
    >
      <div className={`${styles.archiveHeading} ${styles.reveal}`} data-scroll-reveal>
        <div>
          <p className={styles.eyebrow}>{getHomeSectionLabel("stills")}</p>
          <h2 className={styles.display} id="archive-title">
            장면과 장면 사이.
          </h2>
        </div>
        <p>{homeCopy.stills.description}</p>
      </div>
      <div className={styles.archiveGallery}>
        {archiveStills.map((still) => (
          <ArchiveFrame key={still.id} still={still} />
        ))}
      </div>
      <div className={styles.archiveMore}>
        <Link href="/photos">사진 보기</Link>
      </div>
    </section>
  );
}

function ArchiveFrame({ still }: { still: ArchiveStill }) {
  return (
    <figure className={`${styles.archiveFigure} ${styles[still.placement ?? "archiveLead"]} ${styles.reveal}`} data-scroll-reveal>
      <Link href={getWorkMediaHref("still", still.id)} className={styles.archiveMedia} data-image-reveal style={{ aspectRatio: still.ratio }}>
        <div className={styles.archiveImage} data-cinematic-parallax={still.speed}>
          <Image
            src={still.src}
            alt={still.alt}
            fill
            sizes="(max-width: 800px) 92vw, 70vw"
          />
        </div>
      </Link>
      <figcaption>{still.label}<span className={styles.stillCaption}>{still.alt}</span></figcaption>
    </figure>
  );
}
