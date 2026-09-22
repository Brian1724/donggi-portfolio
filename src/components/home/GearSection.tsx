"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { getHomeSectionLabel } from "@/data/home";
import styles from "./CameraStudy.module.css";

const CameraStudy = dynamic(
  () => import("./CameraStudy").then((module) => module.CameraStudy),
  { ssr: false },
);

type NetworkInformation = EventTarget & {
  saveData?: boolean;
};

function supportsWebGl() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function GearSection() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [shouldMountScene, setShouldMountScene] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [sceneFailed, setSceneFailed] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    const stage = stageRef.current;
    let frame = 0;
    let observer: IntersectionObserver | null = null;

    const updateEligibility = () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
      observer = null;

      frame = window.requestAnimationFrame(() => {
        const allowed =
          !reducedMotion.matches &&
          !connection?.saveData &&
          supportsWebGl();
        if (!allowed || !stage) {
          setShouldMountScene(false);
          return;
        }

        const rect = stage.getBoundingClientRect();
        const isNearViewport = rect.top < window.innerHeight + 300 && rect.bottom > -300;
        if (isNearViewport || !window.IntersectionObserver) {
          setShouldMountScene(true);
          return;
        }

        observer = new IntersectionObserver(
          ([entry]) => {
            if (!entry.isIntersecting) return;
            setShouldMountScene(true);
            observer?.disconnect();
            observer = null;
          },
          { rootMargin: "300px" },
        );
        observer.observe(stage);
      });
    };

    updateEligibility();
    reducedMotion.addEventListener("change", updateEligibility);
    connection?.addEventListener("change", updateEligibility);

    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
      reducedMotion.removeEventListener("change", updateEligibility);
      connection?.removeEventListener("change", updateEligibility);
    };
  }, []);

  const handleReady = useCallback(() => setSceneReady(true), []);
  const handleFallback = useCallback(() => {
    setSceneFailed(true);
    setSceneReady(false);
  }, []);
  const showScene = shouldMountScene && !sceneFailed;

  return (
    <section
      id="spatial-archive"
      className={styles.section}
      aria-labelledby="camera-title"
      data-motion-version="scroll-light-reveal-v3"
    >
      <header className={styles.heading} data-scroll-reveal>
        <p className={styles.eyebrow}>{getHomeSectionLabel("gear")}</p>
        <h2 id="camera-title">시선을 만드는 도구.</h2>
        <p>Sony A7C II, 오래 바라본 장면을 기록하는 카메라.</p>
      </header>
      <div
        ref={stageRef}
        className={styles.stage}
        data-scroll-reveal
        data-reveal-delay="90"
      >
        <Image
          src="/media/Sony_A7C_II_preview.webp"
          alt={sceneReady ? "" : "Sony A7C II의 정면 사선 구도. 검은 몸체와 렌즈 마운트, 상단 다이얼"}
          fill
          sizes="(max-width: 800px) 94vw, 1120px"
          className={`${styles.poster} ${sceneReady ? styles.posterHidden : ""}`}
        />
        {showScene && (
          <CameraStudy onReady={handleReady} onFallback={handleFallback} />
        )}
      </div>
      <Link className={styles.link} href="/works/" data-scroll-reveal data-reveal-delay="130">
        사진과 영상 보기 <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}
