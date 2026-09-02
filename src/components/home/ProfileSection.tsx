import Image from "next/image";
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
        <div className={`${styles.identityMedia} ${styles.reveal}`}>
          <Image
            src="/images/archive/journal-why-capture-everyday.jpg"
            alt="대련의 밤거리에서 도시의 흐름을 바라보는 윤동기"
            fill
            sizes="(max-width: 800px) 100vw, 54vw"
          />
        </div>
        <div className={`${styles.identityCopy} ${styles.reveal}`}>
          <h2 id="profile-title">윤동기</h2>
          <p className={styles.identityRole}>{homeCopy.profile.role}</p>
          <p className={styles.identityKo}>{homeCopy.profile.description}</p>
          <p className={styles.identityNote}>{homeCopy.profile.note}</p>
          <dl className={styles.identityMeta}>
            <div>
              <dt>작업</dt>
              <dd>영상 · 사진 · 편집</dd>
            </div>
            <div>
              <dt>기반</dt>
              <dd>{profile.location}</dd>
            </div>
          </dl>
          <div className={styles.textLinks}>
            <Link href="/works">모든 작업 보기</Link>
            <Link href="/about">조금 더 소개하기</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
