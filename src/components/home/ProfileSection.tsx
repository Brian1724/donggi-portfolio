import Link from "next/link";
import { homeCopy } from "@/data/home";
import { profile } from "@/data/profile";
import styles from "../CinematicOnePage.module.css";

export function ProfileSection() {
  return (
    <section
      className={`${styles.section} ${styles.identity}`}
      id="profile"
      aria-labelledby="profile-title"
    >
      <p className={`${styles.eyebrow} ${styles.reveal}`}>01 / PROFILE</p>
      <div className={styles.identityGrid}>
        <h2 className={`${styles.display} ${styles.reveal}`} id="profile-title">
          DONGGI
          <br />
          YOON.
        </h2>
        <div className={`${styles.identityCopy} ${styles.reveal}`}>
          <p className={styles.identityRole}>{homeCopy.profile.role}</p>
          <p className={styles.identityKo}>{homeCopy.profile.description}</p>
          <dl className={styles.identityMeta}>
            <div>
              <dt>Available for</dt>
              <dd>Video · Photography · Visual storytelling</dd>
            </div>
            <div>
              <dt>Based in</dt>
              <dd>{profile.location}</dd>
            </div>
            <div>
              <dt>Study</dt>
              <dd>SIES · Media Communication</dd>
            </div>
          </dl>
          <div className={styles.textLinks}>
            <Link href="/works">모든 작업 보기 ↗</Link>
            <Link href="/about">윤동기 소개 ↗</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
