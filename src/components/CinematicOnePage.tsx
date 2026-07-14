"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./CinematicOnePage.module.css";

const mediaBase = "/media/dalian";
const filmsBase = "/media/films";
const stillsBase = "/media/stills";

type Film = {
  title: string;
  subtitle: string;
  role: string;
  year: string;
  duration: string;
  format: "portrait" | "square" | "landscape";
  src: string;
  poster: string;
  alt: string;
};

const films: Film[] = [
  {
    title: "2025",
    subtitle: "A year remembered in passing light",
    role: "Direction · Film · Edit",
    year: "2025",
    duration: "00:42",
    format: "portrait",
    src: `${filmsBase}/2025.mp4`,
    poster: `${filmsBase}/2025-poster.jpg`,
    alt: "눈 덮인 산과 바다를 바라보는 사람을 담은 2025 필름",
  },
  {
    title: "NEW YEAR 2026",
    subtitle: "A small wish held close",
    role: "Direction · Film · Edit",
    year: "2026",
    duration: "00:20",
    format: "square",
    src: `${filmsBase}/new-year-2026.mp4`,
    poster: `${filmsBase}/new-year-2026-poster.jpg`,
    alt: "따뜻한 창가의 빛 속에서 새해를 맞는 윤동기",
  },
  {
    title: "DALIAN",
    subtitle: "Between the city and the quiet",
    role: "Direction · Film · Edit · Color",
    year: "2026",
    duration: "00:21",
    format: "landscape",
    src: `${mediaBase}/donggi-trailer.mp4`,
    poster: `${mediaBase}/frame-opening.jpg`,
    alt: "푸른 저녁빛 아래 펼쳐진 대련 도심",
  },
];

const archiveStills = [
  {
    src: "still-01-city-dusk.jpg",
    alt: "구름 사이로 노을이 번지는 도시의 실루엣",
    label: "I — CITY AT DUSK",
    placement: "archiveLead",
    speed: "0.05",
  },
  {
    src: "still-02-light-study.jpg",
    alt: "오래된 석조 기둥 사이로 길게 드리운 빛과 그림자",
    label: "II — LIGHT STUDY",
    placement: "archivePortraitA",
    speed: "0.04",
  },
  {
    src: "still-03-angkor.jpg",
    alt: "푸른 하늘 아래 솟은 앙코르의 오래된 석조 건축",
    label: "III — ANGKOR",
    placement: "archivePortraitB",
    speed: "0.06",
  },
  {
    src: "still-04-seodo-station.jpg",
    alt: "가을빛이 머문 서도역 앞을 오가는 사람들",
    label: "IV — SEODO STATION",
    placement: "archivePanorama",
    speed: "0.05",
  },
  {
    src: "still-05-night-reflection.jpg",
    alt: "밤의 연못 위로 색색의 빛이 반사된 전통 건축",
    label: "V — REFLECTION",
    placement: "archivePortraitC",
    speed: "0.04",
  },
  {
    src: "still-08-hong-kong.jpg",
    alt: "구름 아래 빛나는 홍콩의 고층 건물과 빅토리아 하버 야경",
    label: "VI — HONG KONG",
    placement: "archiveFinale",
    speed: "0.06",
  },
] as const;

const journalTeasers = [
  {
    slug: "why-i-capture-everyday",
    index: "01",
    title: "왜 나는 일상을 시네마틱하게 기록하고 싶은가",
    meta: "Personal Notes · 2026",
  },
  {
    slug: "starting-dk4film",
    index: "02",
    title: "@dk4film을 시작하며",
    meta: "Photography · 2026",
  },
  {
    slug: "what-i-see-first-when-filming-travel",
    index: "03",
    title: "여행 영상을 찍을 때 가장 먼저 보는 것들",
    meta: "Videography · 2026",
  },
];

export function CinematicOnePage() {
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const filmVideoRef = useRef<HTMLVideoElement>(null);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);
  const dialogLabel = selectedFilm
    ? `${selectedFilm.title}${selectedFilm.title.includes(selectedFilm.year) ? "" : ` ${selectedFilm.year}`}`
    : "FILM";

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const enableVideoFrame = window.requestAnimationFrame(() => {
      setVideoEnabled(!reduceMotion && !connection?.saveData);
    });

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.06 },
    );

    const revealElements = document.querySelectorAll(`.${styles.reveal}`);
    revealElements.forEach((element) => revealObserver.observe(element));

    const parallaxElements = Array.from(
      document.querySelectorAll<HTMLElement>(`[data-cinematic-parallax]`),
    );
    let ticking = false;

    const updateParallax = () => {
      const viewportCenter = window.innerHeight / 2;
      parallaxElements.forEach((element) => {
        const frame = element.parentElement?.getBoundingClientRect();
        if (!frame) return;
        const distance = frame.top + frame.height / 2 - viewportCenter;
        const speed = Number(element.dataset.cinematicParallax ?? 0.05);
        const offset = Math.max(-60, Math.min(60, -distance * speed));
        element.style.transform = `translate3d(0, ${offset}px, 0)`;
      });
      ticking = false;
    };

    const requestParallax = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    if (!reduceMotion) {
      updateParallax();
      window.addEventListener("scroll", requestParallax, { passive: true });
      window.addEventListener("resize", requestParallax);
    }

    return () => {
      window.cancelAnimationFrame(enableVideoFrame);
      window.removeEventListener("scroll", requestParallax);
      window.removeEventListener("resize", requestParallax);
      revealObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (videoEnabled) {
      heroVideoRef.current?.play().catch(() => undefined);
    }
  }, [videoEnabled]);

  useEffect(() => {
    if (!selectedFilm) return;

    const dialog = dialogRef.current;
    const film = filmVideoRef.current;
    if (!dialog || !film) return;

    heroVideoRef.current?.pause();
    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = "hidden";
    film.load();
    film.currentTime = 0;
    film.muted = false;
    film.play().catch(() => undefined);
  }, [selectedFilm]);

  const toggleSound = async () => {
    const video = heroVideoRef.current;
    if (!video) return;
    const nextSoundOn = video.muted;
    video.muted = !nextSoundOn;
    setSoundOn(nextSoundOn);
    if (nextSoundOn) await video.play().catch(() => undefined);
  };

  const closeFilm = () => {
    filmVideoRef.current?.pause();
    dialogRef.current?.close();
    document.body.style.overflow = "";
    setSelectedFilm(null);
    if (videoEnabled) heroVideoRef.current?.play().catch(() => undefined);
  };

  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#profile">본문으로 건너뛰기</a>

      <section className={styles.hero} id="top" aria-labelledby="hero-title">
        <video
          ref={heroVideoRef}
          className={styles.heroVideo}
          autoPlay={videoEnabled}
          muted
          loop
          playsInline
          preload="none"
          poster={`${mediaBase}/frame-opening.jpg`}
          aria-label="대련의 도시 풍경과 여행 장면"
        >
          {videoEnabled ? (
            <>
              <source media="(max-width: 720px)" src={`${mediaBase}/donggi-hero-mobile-v2.webm`} type="video/webm" />
              <source media="(max-width: 720px)" src={`${mediaBase}/donggi-hero-mobile-v2.mp4`} type="video/mp4" />
              <source src={`${mediaBase}/donggi-hero-v2.webm`} type="video/webm" />
              <source src={`${mediaBase}/donggi-hero-v2.mp4`} type="video/mp4" />
            </>
          ) : null}
        </video>
        <div className={styles.heroShade} aria-hidden="true" />
        <div className={styles.grain} aria-hidden="true" />

        <div className={styles.heroInner}>
          <div className={`${styles.heroKicker} ${styles.reveal}`}>
            <span>Donggi Yoon / Visual Archive</span>
            <span>Videographer &amp; Photographer</span>
          </div>
          <h1 className={`${styles.heroTitle} ${styles.reveal}`} id="hero-title">
            <span>BETWEEN</span>
            <span className={styles.outline}>FRAMES.</span>
          </h1>
          <div className={`${styles.heroFooter} ${styles.reveal}`}>
            <p>여행과 일상, 사람과 공간의 분위기를<br />사진과 짧은 영화로 기록합니다.</p>
            <div className={styles.heroActions}>
              <button className={styles.playLink} type="button" onClick={() => setSelectedFilm(films[2])}>
                <i aria-hidden="true" /> Play Dalian <span>00:21</span>
              </button>
              {videoEnabled ? (
                <button className={styles.sound} type="button" onClick={toggleSound} aria-pressed={soundOn}>
                  <span className={soundOn ? styles.soundActive : ""} aria-hidden="true"><i /><i /><i /></span>
                  {soundOn ? "Sound on" : "Sound off"}
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.identity}`} id="profile" aria-labelledby="profile-title">
        <p className={`${styles.eyebrow} ${styles.reveal}`}>01 / PROFILE</p>
        <div className={styles.identityGrid}>
          <h2 className={`${styles.display} ${styles.reveal}`} id="profile-title">DONGGI<br />YOON.</h2>
          <div className={`${styles.identityCopy} ${styles.reveal}`}>
            <p className={styles.identityRole}>Videographer &amp; Photographer in Progress</p>
            <p className={styles.identityKo}>사진과 영상으로 여행, 일상, 사람, 공간의 분위기를 기록하며 나만의 시각 언어를 만들어가고 있습니다.</p>
            <dl className={styles.identityMeta}>
              <div><dt>Available for</dt><dd>Video · Photography · Visual storytelling</dd></div>
              <div><dt>Based in</dt><dd>Jeonju, South Korea</dd></div>
              <div><dt>Study</dt><dd>SIES · Media Communication</dd></div>
            </dl>
            <div className={styles.textLinks}>
              <Link href="/works">Explore all works ↗</Link>
              <Link href="/about">About Donggi ↗</Link>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.featureSection}`} aria-labelledby="feature-title">
        <div className={`${styles.featureHeading} ${styles.reveal}`}>
          <div>
            <p className={styles.eyebrow}>02 / SELECTED WORK</p>
            <h2 className={styles.display} id="feature-title">DALIAN,<br />2026.</h2>
          </div>
          <p>빠르게 움직이는 도시 안에서 발견한 정적인 순간을 기록한 짧은 여행 영화.</p>
        </div>
        <div className={styles.wideFrame} aria-label="대련 도심의 저녁 풍경">
          <div className={styles.parallaxMedia} data-cinematic-parallax="0.06">
            <Image src={`${mediaBase}/frame-opening.jpg`} alt="푸른 저녁빛 아래 펼쳐진 대련 도심" fill sizes="100vw" priority />
          </div>
          <button type="button" className={styles.framePlay} onClick={() => setSelectedFilm(films[2])} aria-label="Dalian 전체 영상 재생">
            <i aria-hidden="true" /> Watch full film
          </button>
        </div>
        <dl className={`${styles.projectBrief} ${styles.reveal}`}>
          <div><dt>Purpose</dt><dd>Cinematic travel film</dd></div>
          <div><dt>Location</dt><dd>Dalian, China · 2026</dd></div>
          <div><dt>Role</dt><dd>Directing, filming, editing, color</dd></div>
          <div><dt>Concept</dt><dd>도시의 속도와 그 사이의 고요를 교차시키며 낯선 장소의 감각을 짧은 리듬으로 구성했습니다.</dd></div>
        </dl>
      </section>

      <section className={`${styles.section} ${styles.filmSection}`} id="film" aria-labelledby="film-title">
        <div className={`${styles.filmHeading} ${styles.reveal}`}>
          <div><p className={styles.eyebrow}>03 / SHORT FILMS</p><h2 className={styles.display} id="film-title">THREE FILMS.<br />ONE POINT OF VIEW.</h2></div>
          <p>Travel · Memory · Portrait<br />2025—2026</p>
        </div>
        <p className={`${styles.filmIntro} ${styles.reveal}`}>서로 다른 계절과 화면비를 촬영하고 편집하며, 장면 사이의 호흡과 색을 실험한 세 편의 짧은 기록입니다.</p>
        <div className={styles.filmGrid}>
          {films.map((film, index) => (
            <FilmCard key={film.title} film={film} index={index + 1} onPlay={() => setSelectedFilm(film)} />
          ))}
        </div>
        <div className={`${styles.inlineContact} ${styles.reveal}`}>
          <p>Available for video, photography and visual storytelling projects.</p>
          <Link href="/contact">Start a project ↗</Link>
        </div>
      </section>

      <section className={`${styles.section} ${styles.archiveSection}`} id="stills" aria-labelledby="archive-title">
        <div className={`${styles.archiveHeading} ${styles.reveal}`}>
          <div>
            <p className={styles.eyebrow}>04 / STILL ARCHIVE</p>
            <h2 className={styles.display} id="archive-title">BETWEEN<br />THE CUTS.</h2>
          </div>
          <p>움직임이 멈춘 뒤에도 오래 남는 장면들. 여행과 일상 사이에서 발견한 빛을 가장 좋은 여섯 프레임으로 골랐습니다.</p>
        </div>
        <div className={styles.archiveGallery}>
          {archiveStills.map((still) => <ArchiveFrame key={still.src} {...still} />)}
        </div>
        <div className={styles.archiveMore}><Link href="/works">View photography projects ↗</Link></div>
      </section>

      <section className={`${styles.section} ${styles.journalSection}`} aria-labelledby="journal-title">
        <div className={`${styles.journalHeading} ${styles.reveal}`}>
          <div><p className={styles.eyebrow}>05 / FIELD NOTES</p><h2 className={styles.display} id="journal-title">HOW I SEE<br />AND MAKE.</h2></div>
          <p>완성된 결과만이 아니라, 무엇을 보고 어떤 판단으로 장면을 이어가는지도 기록합니다.</p>
        </div>
        <div className={styles.journalList}>
          {journalTeasers.map((post) => (
            <Link key={post.slug} href={`/journal/${post.slug}`} className={`${styles.journalRow} ${styles.reveal}`}>
              <span>{post.index}</span><strong>{post.title}</strong><em>{post.meta}</em><i>↗</i>
            </Link>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.credits}`} id="contact" aria-labelledby="credits-title">
        <p className={`${styles.eyebrow} ${styles.reveal}`}>06 / CONTACT</p>
        <h2 className={`${styles.creditsTitle} ${styles.reveal}`} id="credits-title">LET&apos;S MAKE<br />THE NEXT FRAME.</h2>
        <p className={`${styles.creditsKo} ${styles.reveal}`}>촬영·편집·사진·콘텐츠 제작 협업 문의를 기다립니다.<br />아직 이름 붙지 않은 장면부터 편하게 이야기해주세요.</p>
        <div className={`${styles.creditLines} ${styles.reveal}`}>
          <div><span>Film &amp; Edit</span><strong>Donggi Yoon</strong></div>
          <div><span>Available</span><strong>Video · Photo</strong></div>
          <div><span>Based</span><strong>South Korea</strong></div>
        </div>
        <div className={`${styles.contactRow} ${styles.reveal}`}>
          <div className={styles.contactPrimary}><span>Contact / Project Inquiries</span><a href="mailto:ydk0717@gmail.com">ydk0717@gmail.com</a></div>
          <div className={styles.socialLinks}><span>Follow</span><div><a href="https://instagram.com/donggi_03" target="_blank" rel="noreferrer">Instagram ↗</a><a href="https://instagram.com/dk4film" target="_blank" rel="noreferrer">DK4FILM ↗</a></div></div>
        </div>
      </section>

      <dialog ref={dialogRef} className={styles.dialog} onCancel={(event) => { event.preventDefault(); closeFilm(); }}>
        <div className={styles.dialogBar}><span>DONGGI / {dialogLabel}</span><button type="button" onClick={closeFilm}>Close ×</button></div>
        <video ref={filmVideoRef} controls playsInline preload="metadata" poster={selectedFilm?.poster}>
          {selectedFilm ? <source src={selectedFilm.src} type="video/mp4" /> : null}
        </video>
      </dialog>
    </div>
  );
}

function FilmCard({ film, index, onPlay }: { film: Film; index: number; onPlay: () => void }) {
  return (
    <article className={`${styles.filmCard} ${styles[`film${film.format[0].toUpperCase()}${film.format.slice(1)}`]} ${styles.reveal}`}>
      <button type="button" className={styles.filmMedia} onClick={onPlay} aria-label={`${film.title} 전체 영상 재생`}>
        <Image src={film.poster} alt={film.alt} fill sizes="(max-width: 800px) 100vw, 40vw" />
        <span className={styles.posterShade} aria-hidden="true" />
        <span className={styles.cardPlay} aria-hidden="true"><i /></span>
        <span className={styles.filmIndex}>0{index}</span>
      </button>
      <div className={styles.filmCardMeta}>
        <div><h3>{film.title}</h3><p>{film.subtitle}</p><p>{film.role}</p></div>
        <p>{film.year}<br />{film.duration}</p>
      </div>
    </article>
  );
}

function ArchiveFrame({ src, alt, label, placement, speed }: (typeof archiveStills)[number]) {
  return (
    <figure className={`${styles.archiveFigure} ${styles[placement]} ${styles.reveal}`}>
      <div className={styles.archiveMedia}>
        <div className={styles.archiveImage} data-cinematic-parallax={speed}>
          <Image src={`${stillsBase}/${src}`} alt={alt} fill sizes="(max-width: 800px) 92vw, 70vw" />
        </div>
      </div>
      <figcaption>{label}</figcaption>
    </figure>
  );
}
