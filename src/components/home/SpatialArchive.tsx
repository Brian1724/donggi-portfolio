"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "../CinematicOnePage.module.css";

type SceneState = "loading" | "ready" | "fallback";
type Vec3 = readonly [number, number, number];

type PlaneKeyframe = {
  position: Vec3;
  rotation: Vec3;
  scale: number;
};

type PlaneLayout = {
  size: readonly [number, number];
  frames: readonly [PlaneKeyframe, PlaneKeyframe, PlaneKeyframe, PlaneKeyframe];
};

type ArchivePlane = {
  src: string;
  alt: string;
  desktop: PlaneLayout;
  mobile: PlaneLayout;
};

const chapters = [
  {
    title: "장면 사이로 들어가기",
    description: "서로 다른 시간에 기록한 사진이 하나의 공간 안에서 천천히 겹쳐집니다.",
  },
  {
    title: "조금 떨어져 바라보기",
    description: "가까이 있던 장면과 멀리 있던 기억 사이의 거리를 따라갑니다.",
  },
  {
    title: "기억은 겹쳐 남는다",
    description: "장소는 달라도 빛과 사람, 움직임은 서로 다른 기억을 이어줍니다.",
  },
  {
    title: "다시 한 장면으로",
    description: "흩어진 순간은 결국 내가 바라본 하나의 시선으로 돌아옵니다.",
  },
] as const;

const archivePlanes: readonly ArchivePlane[] = [
  {
    src: "/media/stills/still-04-seodo-station.jpg",
    alt: "서도역 플랫폼을 감싼 고요한 빛",
    desktop: {
      size: [3.8, 2.55],
      frames: [
        { position: [0, -0.12, 1.65], rotation: [-0.03, 0.02, 0], scale: 1.08 },
        { position: [-0.6, 0.12, 0.1], rotation: [-0.04, 0.25, -0.02], scale: 0.88 },
        { position: [1.2, -0.32, -0.8], rotation: [0.02, -0.18, 0.04], scale: 0.78 },
        { position: [0, -0.1, 1.45], rotation: [-0.02, 0, 0], scale: 1.06 },
      ],
    },
    mobile: {
      size: [2.8, 1.88],
      frames: [
        { position: [0, -0.35, 1.45], rotation: [-0.03, 0.02, 0], scale: 1.02 },
        { position: [-0.25, -0.1, 0.55], rotation: [-0.03, 0.14, -0.01], scale: 0.91 },
        { position: [0.38, -0.28, 0.15], rotation: [0.01, -0.11, 0.02], scale: 0.86 },
        { position: [0, -0.32, 1.35], rotation: [-0.02, 0, 0], scale: 1 },
      ],
    },
  },
  {
    src: "/media/stills/still-03-angkor.jpg",
    alt: "앙코르 유적의 돌과 나무 사이로 스며든 빛",
    desktop: {
      size: [3, 2],
      frames: [
        { position: [-3.15, 1.2, -2.2], rotation: [0, 0.28, -0.04], scale: 0.78 },
        { position: [-4, 1.25, -1.3], rotation: [0, 0.46, -0.06], scale: 0.9 },
        { position: [-2.1, 0.92, 0.6], rotation: [0.02, 0.18, -0.02], scale: 0.94 },
        { position: [-3, 1.1, -2], rotation: [0, 0.22, -0.03], scale: 0.76 },
      ],
    },
    mobile: {
      size: [2.05, 1.37],
      frames: [
        { position: [-0.92, 1.3, -0.75], rotation: [0, 0.16, -0.035], scale: 0.9 },
        { position: [-1.2, 1.48, -0.35], rotation: [0, 0.24, -0.045], scale: 0.94 },
        { position: [-0.55, 1.12, 0.15], rotation: [0.01, 0.11, -0.02], scale: 0.92 },
        { position: [-0.88, 1.28, -0.7], rotation: [0, 0.12, -0.025], scale: 0.88 },
      ],
    },
  },
  {
    src: "/media/stills/still-06-winter-trail.jpg",
    alt: "겨울 산길을 걷는 사람의 뒷모습",
    desktop: {
      size: [2.12, 3.18],
      frames: [
        { position: [3.05, -0.55, -1.45], rotation: [-0.02, -0.3, 0.03], scale: 0.8 },
        { position: [2.2, -0.2, 1.2], rotation: [0, -0.12, 0.01], scale: 1.02 },
        { position: [3, 0.42, 0.3], rotation: [0.02, -0.28, 0.06], scale: 0.95 },
        { position: [2.8, -0.58, -1.5], rotation: [0, -0.24, 0.02], scale: 0.82 },
      ],
    },
    mobile: {
      size: [1.34, 2.02],
      frames: [
        { position: [0.96, -1.55, -0.4], rotation: [0.02, -0.16, 0.025], scale: 0.92 },
        { position: [0.7, -1.15, 0.65], rotation: [0, -0.08, 0.01], scale: 1.02 },
        { position: [1.02, -0.82, 0.35], rotation: [0.01, -0.17, 0.04], scale: 0.98 },
        { position: [0.9, -1.5, -0.38], rotation: [0, -0.13, 0.02], scale: 0.92 },
      ],
    },
  },
  {
    src: "/media/stills/still-05-night-reflection.jpg",
    alt: "밤거리 유리창에 겹쳐진 도시의 반사",
    desktop: {
      size: [2.02, 3.04],
      frames: [
        { position: [-2.32, -1.55, -3], rotation: [0, 0.2, -0.05], scale: 0.72 },
        { position: [-2.5, -1, 0.5], rotation: [0, 0.14, -0.04], scale: 0.98 },
        { position: [-0.82, -0.5, 1], rotation: [-0.02, 0.05, -0.02], scale: 1 },
        { position: [-2.1, -1.55, -2.6], rotation: [0, 0.18, -0.04], scale: 0.74 },
      ],
    },
    mobile: {
      size: [1.25, 1.88],
      frames: [
        { position: [-0.86, -1.9, -1.65], rotation: [0, 0.14, -0.045], scale: 0.88 },
        { position: [-0.75, -1.35, 0.2], rotation: [0, 0.08, -0.03], scale: 0.98 },
        { position: [-0.2, -1.05, 0.75], rotation: [-0.01, 0.03, -0.02], scale: 1 },
        { position: [-0.8, -1.82, -1.4], rotation: [0, 0.11, -0.035], scale: 0.88 },
      ],
    },
  },
  {
    src: "/media/stills/still-08-hong-kong.jpg",
    alt: "해 질 무렵 홍콩의 건물과 도시 풍경",
    desktop: {
      size: [3.02, 2.02],
      frames: [
        { position: [2.62, 1.5, -3.2], rotation: [0, -0.26, 0.04], scale: 0.72 },
        { position: [3.6, 1.62, -2], rotation: [0, -0.38, 0.05], scale: 0.82 },
        { position: [1.22, 1.25, 0.4], rotation: [0, -0.12, 0.02], scale: 0.95 },
        { position: [2.6, 1.48, -2.8], rotation: [0, -0.2, 0.03], scale: 0.74 },
      ],
    },
    mobile: {
      size: [2.05, 1.37],
      frames: [
        { position: [0.82, 1.5, -2.1], rotation: [0, -0.14, 0.035], scale: 0.86 },
        { position: [1.12, 1.62, -1.1], rotation: [0, -0.22, 0.04], scale: 0.92 },
        { position: [0.5, 1.22, 0.05], rotation: [0, -0.08, 0.02], scale: 0.94 },
        { position: [0.78, 1.48, -1.8], rotation: [0, -0.11, 0.025], scale: 0.86 },
      ],
    },
  },
];

const desktopCamera = [
  { angle: -12, radius: 9.8, y: 0.12, targetY: 0, groupYaw: 0 },
  { angle: 24, radius: 10, y: 0.4, targetY: 0.06, groupYaw: 8 },
  { angle: 76, radius: 9.35, y: 0, targetY: -0.02, groupYaw: 30 },
  { angle: 6, radius: 9.5, y: 0.08, targetY: 0, groupYaw: 4 },
] as const;

const mobileCamera = [
  { angle: -6, radius: 10.2, y: 0, targetY: -0.2, groupYaw: 0 },
  { angle: 12, radius: 10.3, y: 0.2, targetY: -0.18, groupYaw: 4 },
  { angle: 38, radius: 9.9, y: 0, targetY: -0.23, groupYaw: 16 },
  { angle: 4, radius: 10.05, y: 0, targetY: -0.2, groupYaw: 2 },
] as const;

const toRadians = (degrees: number) => degrees * (Math.PI / 180);

export function SpatialArchive() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chapterRefs = useRef<Array<HTMLElement | null>>([]);
  const [sceneState, setSceneState] = useState<SceneState>("loading");
  const [activeChapter, setActiveChapter] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;

    if (!window.WebGLRenderingContext || connection?.saveData) {
      const fallbackFrame = window.requestAnimationFrame(() => setSceneState("fallback"));
      return () => window.cancelAnimationFrame(fallbackFrame);
    }

    let cancelled = false;
    let destroyScene = () => undefined;

    const startScene = async () => {
      try {
        const THREE = await import("three");
        if (cancelled) return;

        const isMobile = window.matchMedia("(max-width: 800px)").matches;
        const renderer = new THREE.WebGLRenderer({
          canvas,
          antialias: !isMobile,
          alpha: false,
          powerPreference: "high-performance",
        });
        renderer.setClearColor(0x070808, 1);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.2 : 1.65));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 0.9;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x070808);
        scene.fog = new THREE.Fog(0x070808, isMobile ? 8.8 : 8.2, isMobile ? 15 : 17.5);

        const camera = new THREE.PerspectiveCamera(isMobile ? 42 : 35, 1, 0.1, 40);
        const archiveGroup = new THREE.Group();
        scene.add(archiveGroup);

        const hemisphere = new THREE.HemisphereLight(0xc8d1d5, 0x241e18, 0.44);
        const coolKey = new THREE.DirectionalLight(0xc8d7dc, 0.52);
        coolKey.position.set(-5, 4, 6);
        const warmRim = new THREE.DirectionalLight(0xd8c9b5, 0.2);
        warmRim.position.set(5, -2, 3);
        scene.add(hemisphere, coolKey, warmRim);

        const textureLoader = new THREE.TextureLoader();
        const maxAnisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
        const photoObjects: InstanceType<typeof THREE.Group>[] = [];

        const textureResults = await Promise.allSettled(
          archivePlanes.map(async (plane, index) => {
            const texture = await textureLoader.loadAsync(plane.src);
            if (cancelled) {
              texture.dispose();
              return;
            }

            texture.colorSpace = THREE.SRGBColorSpace;
            texture.anisotropy = maxAnisotropy;

            const layout = isMobile ? plane.mobile : plane.desktop;
            const print = new THREE.Group();
            print.userData.frames = layout.frames;
            print.userData.phase = index * 0.82;

            const backingGeometry = new THREE.BoxGeometry(
              layout.size[0] + 0.045,
              layout.size[1] + 0.045,
              0.026,
            );
            const backingMaterial = new THREE.MeshStandardMaterial({
              color: 0xdedbd3,
              metalness: 0,
              roughness: 0.94,
            });
            const backing = new THREE.Mesh(backingGeometry, backingMaterial);

            const imageGeometry = new THREE.PlaneGeometry(layout.size[0], layout.size[1]);
            const imageMaterial = new THREE.MeshBasicMaterial({
              map: texture,
              side: THREE.DoubleSide,
              toneMapped: false,
            });
            const image = new THREE.Mesh(imageGeometry, imageMaterial);
            image.position.z = 0.014;

            print.add(backing, image);
            archiveGroup.add(print);
            photoObjects.push(print);
          }),
        );

        if (cancelled) return;
        if (textureResults.every((result) => result.status === "rejected")) {
          throw new Error("Archive textures could not be loaded");
        }

        const particleCount = isMobile ? 36 : 90;
        const particlePositions = new Float32Array(particleCount * 3);
        for (let index = 0; index < particleCount; index += 1) {
          const offset = index * 3;
          particlePositions[offset] = Math.sin(index * 12.9898) * 7.2;
          particlePositions[offset + 1] = Math.sin(index * 4.1414 + 1.7) * 4.2;
          particlePositions[offset + 2] = -Math.abs(Math.sin(index * 2.718 + 0.6)) * 10;
        }
        const particleGeometry = new THREE.BufferGeometry();
        particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
        const particleMaterial = new THREE.PointsMaterial({
          color: 0xd6d3ca,
          size: isMobile ? 0.016 : 0.02,
          transparent: true,
          opacity: 0.08,
          sizeAttenuation: true,
        });
        const particles = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particles);

        const pointer = { x: 0, y: 0 };
        const pointerTarget = { x: 0, y: 0 };
        let targetProgress = 0;
        let currentProgress = 0;
        let currentChapter = 0;
        let sceneNearViewport = true;
        let pageVisible = !document.hidden;
        let frameId = 0;
        let lastRenderTime = 0;

        const getSegment = (progress: number) => {
          const scaled = THREE.MathUtils.clamp(progress, 0, 1) * 3;
          const from = Math.min(2, Math.floor(scaled));
          const to = Math.min(3, from + 1);
          const linearMix = scaled - from;
          const mix = linearMix * linearMix * (3 - 2 * linearMix);
          return { from, to, mix };
        };

        const updateCopy = (progress: number) => {
          const chapterPosition = THREE.MathUtils.clamp(progress, 0, 1) * 3;
          const nextChapter = Math.round(chapterPosition);
          if (nextChapter !== currentChapter) {
            currentChapter = nextChapter;
            setActiveChapter(nextChapter);
          }

          chapterRefs.current.forEach((chapter, index) => {
            if (!chapter) return;
            const distance = Math.abs(chapterPosition - index);
            const opacity = THREE.MathUtils.clamp(1 - distance * 1.65, 0, 1);
            const offset = THREE.MathUtils.clamp((index - chapterPosition) * 18, -18, 18);
            chapter.style.opacity = String(opacity);
            chapter.style.transform = `translate3d(0, ${offset}px, 0)`;
            chapter.style.visibility = opacity > 0.015 ? "visible" : "hidden";
          });
        };

        const applyScene = (progress: number, time: number) => {
          const { from, to, mix } = getSegment(progress);
          const cameraFrames = isMobile ? mobileCamera : desktopCamera;
          const cameraFrom = cameraFrames[from];
          const cameraTo = cameraFrames[to];
          const cameraAngle = toRadians(THREE.MathUtils.lerp(cameraFrom.angle, cameraTo.angle, mix));
          const cameraRadius = THREE.MathUtils.lerp(cameraFrom.radius, cameraTo.radius, mix);
          const cameraY = THREE.MathUtils.lerp(cameraFrom.y, cameraTo.y, mix);
          const targetY = THREE.MathUtils.lerp(cameraFrom.targetY, cameraTo.targetY, mix);
          const groupYaw = toRadians(THREE.MathUtils.lerp(cameraFrom.groupYaw, cameraTo.groupYaw, mix));

          archiveGroup.rotation.y = groupYaw + pointer.x * (isMobile ? 0 : 0.02);
          archiveGroup.rotation.x = -pointer.y * (isMobile ? 0 : 0.012);
          archiveGroup.position.y = isMobile ? -0.36 : 0;

          camera.position.set(
            Math.sin(cameraAngle) * cameraRadius + pointer.x * (isMobile ? 0 : 0.08),
            cameraY - pointer.y * (isMobile ? 0 : 0.05),
            Math.cos(cameraAngle) * cameraRadius,
          );
          camera.lookAt(0, targetY, 0);

          const seconds = time * 0.001;
          photoObjects.forEach((photo) => {
            const frames = photo.userData.frames as PlaneLayout["frames"];
            const start = frames[from];
            const end = frames[to];
            const float = reduceMotion ? 0 : Math.sin(seconds * 0.2 + Number(photo.userData.phase)) * 0.016;

            photo.position.set(
              THREE.MathUtils.lerp(start.position[0], end.position[0], mix),
              THREE.MathUtils.lerp(start.position[1], end.position[1], mix) + float,
              THREE.MathUtils.lerp(start.position[2], end.position[2], mix),
            );
            photo.rotation.set(
              THREE.MathUtils.lerp(start.rotation[0], end.rotation[0], mix),
              THREE.MathUtils.lerp(start.rotation[1], end.rotation[1], mix),
              THREE.MathUtils.lerp(start.rotation[2], end.rotation[2], mix),
            );
            const scale = THREE.MathUtils.lerp(start.scale, end.scale, mix);
            photo.scale.setScalar(scale);
          });

          const memoryWeight = THREE.MathUtils.clamp(1 - Math.abs(progress - 0.67) / 0.3, 0, 1);
          particleMaterial.opacity = 0.07 + memoryWeight * 0.11;
          particles.rotation.y = reduceMotion ? 0 : seconds * 0.006;
        };

        const updateTargetProgress = () => {
          const bounds = section.getBoundingClientRect();
          const scrollableDistance = Math.max(1, bounds.height - window.innerHeight);
          targetProgress = THREE.MathUtils.clamp(-bounds.top / scrollableDistance, 0, 1);

          if (reduceMotion) {
            updateCopy(targetProgress);
            renderer.render(scene, camera);
          }
        };

        const resize = () => {
          const width = section.clientWidth;
          const height = window.innerHeight;
          if (width === 0 || height === 0) return;
          renderer.setSize(width, height, false);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          applyScene(reduceMotion ? 0 : currentProgress, performance.now());
          renderer.render(scene, camera);
        };

        const shouldRender = () => sceneNearViewport && pageVisible && !reduceMotion;

        const scheduleFrame = () => {
          if (frameId || !shouldRender()) return;
          frameId = window.requestAnimationFrame(renderFrame);
        };

        const renderFrame = (time: number) => {
          frameId = 0;
          if (!shouldRender()) return;
          if (isMobile && time - lastRenderTime < 22) {
            scheduleFrame();
            return;
          }
          lastRenderTime = time;

          currentProgress += (targetProgress - currentProgress) * 0.072;
          pointer.x += (pointerTarget.x - pointer.x) * 0.04;
          pointer.y += (pointerTarget.y - pointer.y) * 0.04;
          applyScene(currentProgress, time);
          updateCopy(currentProgress);
          renderer.render(scene, camera);
          scheduleFrame();
        };

        const handlePointerMove = (event: PointerEvent) => {
          if (isMobile) return;
          const bounds = section.getBoundingClientRect();
          pointerTarget.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
          pointerTarget.y = ((event.clientY - bounds.top) / window.innerHeight - 0.5) * 2;
        };

        const resetPointer = () => {
          pointerTarget.x = 0;
          pointerTarget.y = 0;
        };

        const handleVisibilityChange = () => {
          pageVisible = !document.hidden;
          if (pageVisible) scheduleFrame();
          else if (frameId) {
            window.cancelAnimationFrame(frameId);
            frameId = 0;
          }
        };

        const handleContextLoss = (event: Event) => {
          event.preventDefault();
          if (frameId) window.cancelAnimationFrame(frameId);
          frameId = 0;
          setSceneState("fallback");
        };

        let visibilityObserver: IntersectionObserver | null = null;
        if ("IntersectionObserver" in window) {
          visibilityObserver = new IntersectionObserver(
            ([entry]) => {
              sceneNearViewport = entry.isIntersecting;
              if (sceneNearViewport) scheduleFrame();
              else if (frameId) {
                window.cancelAnimationFrame(frameId);
                frameId = 0;
              }
            },
            { rootMargin: "100% 0px" },
          );
          visibilityObserver.observe(section);
        }

        updateTargetProgress();
        currentProgress = targetProgress;
        resize();
        applyScene(reduceMotion ? 0 : currentProgress, performance.now());
        updateCopy(targetProgress);
        renderer.render(scene, camera);

        const context = renderer.getContext();
        const sampleSize = Math.min(96, canvas.width, canvas.height);
        const sample = new Uint8Array(sampleSize * sampleSize * 4);
        context.readPixels(
          Math.max(0, Math.floor((canvas.width - sampleSize) / 2)),
          Math.max(0, Math.floor((canvas.height - sampleSize) / 2)),
          sampleSize,
          sampleSize,
          context.RGBA,
          context.UNSIGNED_BYTE,
          sample,
        );
        let darkest = 255;
        let brightest = 0;
        for (let index = 0; index < sample.length; index += 4) {
          const luminance = (sample[index] + sample[index + 1] + sample[index + 2]) / 3;
          darkest = Math.min(darkest, luminance);
          brightest = Math.max(brightest, luminance);
        }
        canvas.dataset.pixelRange = `${Math.round(darkest)}-${Math.round(brightest)}`;
        canvas.dataset.rendered = brightest - darkest > 24 ? "true" : "false";
        setSceneState("ready");
        scheduleFrame();

        window.addEventListener("resize", resize);
        window.addEventListener("scroll", updateTargetProgress, { passive: true });
        document.addEventListener("visibilitychange", handleVisibilityChange);
        section.addEventListener("pointermove", handlePointerMove, { passive: true });
        section.addEventListener("pointerleave", resetPointer);
        canvas.addEventListener("webglcontextlost", handleContextLoss);

        destroyScene = () => {
          if (frameId) window.cancelAnimationFrame(frameId);
          visibilityObserver?.disconnect();
          window.removeEventListener("resize", resize);
          window.removeEventListener("scroll", updateTargetProgress);
          document.removeEventListener("visibilitychange", handleVisibilityChange);
          section.removeEventListener("pointermove", handlePointerMove);
          section.removeEventListener("pointerleave", resetPointer);
          canvas.removeEventListener("webglcontextlost", handleContextLoss);
          scene.traverse((object) => {
            if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
              object.geometry.dispose();
              const materials = Array.isArray(object.material) ? object.material : [object.material];
              materials.forEach((material) => {
                if (material instanceof THREE.MeshBasicMaterial) material.map?.dispose();
                material.dispose();
              });
            }
          });
          renderer.dispose();
        };
      } catch {
        if (!cancelled) setSceneState("fallback");
      }
    };

    let observer: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          observer?.disconnect();
          void startScene();
        },
        { rootMargin: "500px 0px" },
      );
      observer.observe(section);
    } else {
      void startScene();
    }

    return () => {
      cancelled = true;
      observer?.disconnect();
      destroyScene();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="spatial-archive"
      className={`${styles.spatialArchive} ${styles[sceneState]}`}
      aria-labelledby="spatial-archive-title"
    >
      <h2 id="spatial-archive-title" className="sr-only">
        네 개의 장면으로 이어지는 입체 사진 아카이브
      </h2>
      <div className={styles.spatialSticky}>
        <div className={styles.spatialFallback} aria-hidden="true">
          <Image
            src="/media/stills/still-04-seodo-station.jpg"
            alt=""
            fill
            sizes="100vw"
          />
        </div>
        <canvas ref={canvasRef} className={styles.spatialCanvas} aria-hidden="true" />
        <div className={styles.spatialShade} aria-hidden="true" />
        <div className={styles.spatialCopy}>
          <p className={styles.eyebrow}>02 / SPATIAL ARCHIVE</p>
          <div className={styles.spatialChapterStage}>
            {chapters.map((chapter, index) => (
              <article
                key={chapter.title}
                ref={(element) => {
                  chapterRefs.current[index] = element;
                }}
                className={`${styles.spatialChapter} ${activeChapter === index ? styles.spatialChapterActive : ""}`}
                aria-hidden={activeChapter !== index}
              >
                <h2>{chapter.title}</h2>
                <p>{chapter.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
      <p className="sr-only">
        서도역, 앙코르, 겨울 산길, 밤거리의 반사와 홍콩의 풍경을 네 장면으로 연결한 입체 사진 아카이브입니다.
      </p>
    </section>
  );
}
