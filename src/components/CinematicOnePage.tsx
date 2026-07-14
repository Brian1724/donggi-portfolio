"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./CinematicOnePage.module.css";

const mediaBase = "/media/dalian";
const filmsBase = "/media/films";
const stillsBase = "/media/stills";

type Film = {
  title: string;
  subtitle: string;
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
    speed: "0.07",
  },
  {
    src: "still-02-light-study.jpg",
    alt: "오래된 석조 기둥 사이로 길게 드리운 빛과 그림자",
    label: "II — LIGHT STUDY",
    placement: "archivePortraitA",
    speed: "0.05",
  },
  {
    src: "still-03-angkor.jpg",
    alt: "푸른 하늘 아래 솟은 앙코르의 오래된 석조 건축",
    label: "III — ANGKOR",
    placement: "archivePortraitB",
    speed: "0.08",
  },
  {
    src: "still-04-seodo-station.jpg",
    alt: "가을빛이 머문 서도역 앞을 오가는 사람들",
    label: "IV — SEODO STATION",
    placement: "archivePanorama",
    speed: "0.06",
  },
  {
    src: "still-05-night-reflection.jpg",
    alt: "밤의 연못 위로 색색의 빛이 반사된 전통 건축",
    label: "V — REFLECTION",
    placement: "archivePortraitC",
    speed: "0.05",
  },
  {
    src: "still-06-winter-trail.jpg",
    alt: "눈 덮인 숲길을 걷는 겨울 산행자",
    label: "VI — WINTER TRAIL",
    placement: "archivePortraitD",
    speed: "0.07",
  },
  {
    src: "still-07-in-transit.jpg",
    alt: "주황빛과 푸른빛이 교차하는 방콕 역사를 걸어가는 사람들",
    label: "VII — IN TRANSIT",
    placement: "archivePortraitE",
    speed: "0.06",
  },
  {
    src: "still-08-hong-kong.jpg",
    alt: "구름 아래 빛나는 홍콩의 고층 건물과 빅토리아 하버 야경",
    label: "VIII — HONG KONG",
    placement: "archiveFinale",
    speed: "0.08",
  },
] as const;

export function CinematicOnePage() {
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const filmVideoRef = useRef<HTMLVideoElement>(null);
  const [soundOn, setSoundOn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);
  const dialogLabel = selectedFilm
    ? `${selectedFilm.title}${selectedFilm.title.includes(selectedFilm.year) ? "" : ` ${selectedFilm.year}`}`
    : "FILM";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10%", threshold: 0.08 },
    );

    const revealElements = document.querySelectorAll(`.${styles.reveal}`);
    revealElements.forEach((element) => revealObserver.observe(element));

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
        const speed = Number(element.dataset.cinematicParallax ?? 0.08);
        const offset = Math.max(-90, Math.min(90, -distance * speed));
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
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", requestParallax);
      window.removeEventListener("resize", requestParallax);
      revealObserver.disconnect();
    };
  }, []);

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
    heroVideoRef.current?.play().catch(() => undefined);
  };

  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#story">본문으로 건너뛰기</a>

      <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}>
        <a className={styles.brand} href="#top" aria-label="DONGGI 홈">
          <span aria-hidden="true" /> DONGGI
        </a>
        <nav className={styles.nav} aria-label="페이지 섹션">
          <a href="#story">Story</a>
          <a href="#stills">Stills</a>
          <a href="#film">Films</a>
          <a href="#contact">Contact</a>
        </nav>
        <button
          className={styles.sound}
          type="button"
          onClick={toggleSound}
          aria-pressed={soundOn}
          aria-label={soundOn ? "배경 영상 음소거" : "배경 영상 음소거 해제"}
        >
          <span className={soundOn ? styles.soundActive : ""} aria-hidden="true">
            <i /><i /><i />
          </span>
          <b>{soundOn ? "Sound on" : "Sound off"}</b>
        </button>
      </header>

      <main>
        <section className={styles.hero} id="top" aria-labelledby="hero-title">
          <video
            ref={heroVideoRef}
            className={styles.heroVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={`${mediaBase}/frame-opening.jpg`}
            aria-label="대련의 도시 풍경과 여행 장면"
          >
            <source src={`${mediaBase}/donggi-trailer.mp4`} type="video/mp4" />
          </video>
          <div className={styles.heroShade} aria-hidden="true" />
          <div className={styles.grain} aria-hidden="true" />

          <div className={styles.heroInner}>
            <div className={`${styles.heroKicker} ${styles.reveal}`}>
              <span>A short film by Donggi Yoon</span>
              <span>Dalian, 2026</span>
            </div>
            <h1 className={`${styles.heroTitle} ${styles.reveal}`} id="hero-title">
              <span>BETWEEN</span>
              <span className={styles.outline}>FRAMES.</span>
            </h1>
            <div className={`${styles.heroFooter} ${styles.reveal}`}>
              <p>낯선 도시의 속도와<br />그 사이의 고요를 기록하다.</p>
              <button className={styles.playLink} type="button" onClick={() => setSelectedFilm(films[2])}>
                <i aria-hidden="true" /> Play the film <span>00:21</span>
              </button>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.story}`} id="story" aria-labelledby="story-title">
          <p className={`${styles.eyebrow} ${styles.reveal}`}>01 / PROLOGUE</p>
          <div className={styles.storyGrid}>
            <h2 className={`${styles.display} ${styles.reveal}`} id="story-title">A CITY<br />IN MOTION.</h2>
            <div className={`${styles.storyCopy} ${styles.reveal}`}>
              <p className={styles.leadKo}>빠르게 스쳐 가는 거리와 사람들.<br />카메라를 들었을 때, 비로소 시간은 천천히 흐르기 시작했다.</p>
              <p>대련에서 마주한 빛, 리듬, 그리고 혼자만의 순간. 여행의 설명보다 그날의 감각에 더 가까운 기록이다.</p>
            </div>
          </div>
        </section>

        <section className={styles.wideFrame} aria-label="대련 도심의 저녁 풍경">
          <div className={styles.parallaxMedia} data-cinematic-parallax="0.12">
            <Image src={`${mediaBase}/frame-opening.jpg`} alt="푸른 저녁빛 아래 펼쳐진 대련 도심" fill sizes="100vw" />
          </div>
          <div className={`${styles.frameCaption} ${styles.reveal}`}><span>39.0002° N</span><span>121.6405° E</span></div>
        </section>

        <section className={`${styles.section} ${styles.sequence}`} aria-labelledby="sequence-title">
          <p className={`${styles.eyebrow} ${styles.reveal}`}>02 / SEQUENCE</p>
          <div className={styles.sequenceHeading}>
            <h2 className={`${styles.display} ${styles.reveal}`} id="sequence-title">THE RHYTHM<br />OF SOMEWHERE.</h2>
            <p className={`${styles.sequenceNote} ${styles.reveal}`}>움직임은 장면이 되고,<br />장면은 기억이 된다.</p>
          </div>

          <Still className={styles.stillOne} src="frame-motion.jpg" alt="교차로를 빠르게 지나가는 버스와 대련 시내" label="I — VELOCITY" speed="0.08" />

          <blockquote className={`${styles.intertitle} ${styles.reveal}`}>
            <span>“</span><p>기억은 완벽한 장면보다<br />잠시 멈춘 시선에 오래 머문다.</p>
          </blockquote>

          <Still className={styles.stillThree} src="frame-finale.jpg" alt="대련의 높은 빌딩을 향해 걸어가는 윤동기의 뒷모습" label="II — DEPARTURE" speed="0.08" />
        </section>

        <section className={`${styles.section} ${styles.archiveSection}`} id="stills" aria-labelledby="archive-title">
          <div className={`${styles.archiveHeading} ${styles.reveal}`}>
            <div>
              <p className={styles.eyebrow}>03 / STILL ARCHIVE</p>
              <h2 className={styles.display} id="archive-title">BETWEEN<br />THE CUTS.</h2>
            </div>
            <p>움직임이 멈춘 뒤에도 오래 남는 장면들.<br />여행과 일상 사이에서 발견한 빛을 한 프레임씩 모았습니다.</p>
          </div>
          <div className={styles.archiveGallery}>
            {archiveStills.map((still) => (
              <ArchiveFrame key={still.src} {...still} />
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.filmSection}`} id="film" aria-labelledby="film-title">
          <div className={`${styles.filmHeading} ${styles.reveal}`}>
            <div><p className={styles.eyebrow}>04 / FILMOGRAPHY</p><h2 className={styles.display} id="film-title">THREE FILMS.<br />ONE POINT OF VIEW.</h2></div>
            <p>Travel · Memory · Portrait<br />2025—2026</p>
          </div>
          <p className={`${styles.filmIntro} ${styles.reveal}`}>서로 다른 계절과 화면비, 같은 시선으로 남긴 세 편의 짧은 기록.</p>
          <div className={styles.filmGrid}>
            {films.map((film, index) => (
              <FilmCard key={film.title} film={film} index={index + 1} onPlay={() => setSelectedFilm(film)} />
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.credits}`} id="contact" aria-labelledby="credits-title">
          <p className={`${styles.eyebrow} ${styles.reveal}`}>05 / EPILOGUE</p>
          <h2 className={`${styles.creditsTitle} ${styles.reveal}`} id="credits-title">EVERY END<br />LEAVES A FRAME.</h2>
          <p className={`${styles.creditsKo} ${styles.reveal}`}>지나간 순간을 오래 남기는 사람.<br />사진과 영상으로 다음 장면을 기다립니다.</p>
          <div className={`${styles.creditLines} ${styles.reveal}`}>
            <div><span>Film & Edit</span><strong>Donggi Yoon</strong></div>
            <div><span>Format</span><strong>Short Films</strong></div>
            <div><span>Archive</span><strong>2025—2026</strong></div>
          </div>
          <div className={`${styles.contactRow} ${styles.reveal}`}>
            <div className={styles.contactPrimary}>
              <span>Contact / Project Inquiries</span>
              <a href="mailto:ydk0717@gmail.com">ydk0717@gmail.com</a>
            </div>
            <div className={styles.socialLinks}>
              <span>Follow</span>
              <div>
                <a href="https://instagram.com/donggi_03" target="_blank" rel="noreferrer">Instagram ↗</a>
                <a href="https://instagram.com/dk4film" target="_blank" rel="noreferrer">DK4FILM ↗</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}><span>© 2026 Donggi Yoon</span><a href="#top">Back to top ↑</a></footer>

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
        <div><h3>{film.title}</h3><p>{film.subtitle}</p></div>
        <p>{film.year}<br />{film.duration}</p>
      </div>
    </article>
  );
}

function Still({ className, src, alt, label, speed }: { className: string; src: string; alt: string; label: string; speed: string }) {
  return (
    <figure className={`${styles.still} ${className} ${styles.reveal}`}>
      <div className={styles.stillMedia} data-cinematic-parallax={speed}>
        <Image src={`${mediaBase}/${src}`} alt={alt} fill sizes="(max-width: 800px) 88vw, 64vw" />
      </div>
      <figcaption>{label}</figcaption>
    </figure>
  );
}

function ArchiveFrame({
  src,
  alt,
  label,
  placement,
  speed,
}: (typeof archiveStills)[number]) {
  return (
    <figure className={`${styles.archiveFigure} ${styles[placement]} ${styles.reveal}`}>
      <div className={styles.archiveMedia}>
        <div className={styles.archiveImage} data-cinematic-parallax={speed}>
          <Image
            src={`${stillsBase}/${src}`}
            alt={alt}
            fill
            sizes="(max-width: 800px) 92vw, 70vw"
          />
        </div>
      </div>
      <figcaption>{label}</figcaption>
    </figure>
  );
}
