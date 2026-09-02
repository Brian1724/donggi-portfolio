import Link from "next/link";
import { getSortedJournalPosts } from "@/data/journal";
import { homeCopy } from "@/data/home";
import styles from "../CinematicOnePage.module.css";

export function JournalPreviewSection() {
  const posts = getSortedJournalPosts().slice(0, 3);

  return (
    <section
      className={`${styles.section} ${styles.journalSection}`}
      aria-labelledby="journal-title"
    >
      <div className={`${styles.journalHeading} ${styles.reveal}`}>
        <div>
          <p className={styles.eyebrow}>05 / FIELD NOTES</p>
          <h2 className={styles.display} id="journal-title">
            기록하며 알게 된 것들.
          </h2>
        </div>
        <p>{homeCopy.journal.description}</p>
      </div>
      <div className={styles.journalList}>
        {posts.map((post, index) => (
          <Link
            key={post.slug}
            href={`/journal/${post.slug}`}
            className={`${styles.journalRow} ${styles.reveal}`}
          >
            <span>0{index + 1}</span>
            <strong>{post.title}</strong>
            <em>
              {post.category} · {post.date.slice(0, 4)}
            </em>
            <i aria-hidden="true">읽기</i>
          </Link>
        ))}
      </div>
    </section>
  );
}
