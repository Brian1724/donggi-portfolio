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
      <p className={`${styles.eyebrow} ${styles.reveal}`}>06 / CONTACT</p>
      <h2 className={`${styles.creditsTitle} ${styles.reveal}`} id="credits-title">
        LET&apos;S MAKE
        <br />
        THE NEXT FRAME.
      </h2>
      <p className={`${styles.creditsKo} ${styles.reveal}`}>{homeCopy.contact.description}</p>
      <div className={`${styles.creditLines} ${styles.reveal}`}>
        <div>
          <span>Film &amp; Edit</span>
          <strong>Donggi Yoon</strong>
        </div>
        <div>
          <span>Available</span>
          <strong>Video · Photo</strong>
        </div>
        <div>
          <span>Based</span>
          <strong>South Korea</strong>
        </div>
      </div>
      <div className={`${styles.contactRow} ${styles.reveal}`}>
        <div className={styles.contactPrimary}>
          <span>연락 / 프로젝트 문의</span>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </div>
        <div className={styles.socialLinks}>
          <span>작업 이어보기</span>
          <div>
            <a href={profile.instagram} target="_blank" rel="noreferrer">
              Instagram ↗
            </a>
            <a href={profile.photoInstagram} target="_blank" rel="noreferrer">
              DK4FILM ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
