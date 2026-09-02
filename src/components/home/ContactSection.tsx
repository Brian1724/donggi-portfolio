import { homeCopy } from "@/data/home";
import { profile } from "@/data/profile";
import styles from "../CinematicOnePage.module.css";

export function ContactSection() {
  return (
    <section
      className={`${styles.section} ${styles.credits}`}
      id="contact"
      aria-labelledby="credits-title"
    >
      <p className={`${styles.eyebrow} ${styles.reveal}`}>06 / END CREDITS</p>
      <h2 className={`${styles.creditsTitle} ${styles.reveal}`} id="credits-title">
        다음 장면을
        <br />함께 만들어요
      </h2>
      <p className={`${styles.creditsKo} ${styles.reveal}`}>{homeCopy.contact.description}</p>
      <div className={`${styles.contactRow} ${styles.reveal}`}>
        <div className={styles.contactPrimary}>
          <span>연락 / 프로젝트 문의</span>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </div>
        <div className={styles.socialLinks}>
          <span>작업 이어보기</span>
          <div>
            <a href={profile.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href={profile.photoInstagram} target="_blank" rel="noreferrer">
              DK4FILM
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
