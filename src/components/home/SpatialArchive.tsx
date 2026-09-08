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
        { position: [0, 0, 1], rotation: [-0.04, -0.12, -0.035], scale: 1 },
        { position: [-0.85, 0.5, -1.2], rotation: [-0.03, 0.18, -0.06], scale: 0.76 },
        { position: [0, 0, -3], rotation: [0.02, -0.16, 0.04], scale: 0.4 },
        { position: [0.1, 0, 1], rotation: [-0.03, 0.1, 0.025], scale: 1 },
      ],
    },
  },
  {
    src: "/media/stills/still-03-angkor.jpg",
    alt: "앙코르 유적의 돌과 나무 사이로 스며든 빛",
    desktop: {
      size: [3, 2],
      frames: [
        { position: [-1.8, 1.15, -1.8], rotation: [0.04, 0.2, -0.07], scale: 0.68 },
        { position: [0, 0, -3], rotation: [0.03, 0.24, -0.05], scale: 0.4 },
        { position: [-1.7, -0.75, -1.8], rotation: [0.04, 0.18, -0.04], scale: 0.7 },
        { position: [0, 0, -3], rotation: [0.03, 0.2, -0.06], scale: 0.4 },
      ],
    },
  },
  {
    src: "/media/stills/still-06-winter-trail.jpg",
    alt: "겨울 산길을 걷는 사람의 뒷모습",
    desktop: {
      size: [2.12, 3.18],
      frames: [
        { position: [2.1, -0.65, -1.2], rotation: [-0.02, -0.24, 0.07], scale: 0.65 },
        { position: [0.4, -0.1, 1.1], rotation: [-0.02, -0.12, 0.035], scale: 1.08 },
        { position: [0, 0, -3], rotation: [0.02, -0.2, 0.06], scale: 0.4 },
        { position: [0, 0, -3], rotation: [0, -0.22, 0.05], scale: 0.4 },
      ],
    },
  },
  {
    src: "/media/stills/still-05-night-reflection.jpg",
    alt: "밤의 연못 위에 반사된 전통 건축과 불빛",
    desktop: {
      size: [2.02, 3.04],
      frames: [
        { position: [0, 0, -3], rotation: [0.03, 0.2, -0.06], scale: 0.4 },
        { position: [1.8, -0.85, -1.8], rotation: [0.02, -0.14, 0.04], scale: 0.68 },
        { position: [-0.25, -0.1, 1.1], rotation: [-0.02, 0.13, -0.03], scale: 1.08 },
        { position: [-1.85, -1, -2], rotation: [0.02, 0.18, -0.05], scale: 0.62 },
      ],
    },
  },
  {
    src: "/media/stills/still-08-hong-kong.jpg",
    alt: "해 질 무렵 홍콩의 건물과 도시 풍경",
    desktop: {
      size: [3.02, 2.02],
      frames: [
        { position: [0, 0, -3.5], rotation: [0.02, -0.16, 0.06], scale: 0.4 },
        { position: [0, 0, -3.5], rotation: [0.02, -0.18, 0.05], scale: 0.4 },
        { position: [1.65, 0.55, -1.4], rotation: [0, -0.12, 0.04], scale: 0.72 },
        { position: [1.75, 1.15, -1.6], rotation: [0, -0.16, 0.05], scale: 0.68 },
      ],
    },
  },
];

const desktopCamera = [
  { groupYaw: -4 },
  { groupYaw: 8 },
  { groupYaw: -10 },
  { groupYaw: 4 },
] as const;

const mobileCamera = [
  { groupYaw: -3 },
  { groupYaw: 5 },
  { groupYaw: -6 },
  { groupYaw: 2 },
] as const;

const toRadians = (degrees: number) => degrees * (Math.PI / 180);

export function SpatialArchive() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<Array<HTMLElement | null>>([]);
  const [sceneState, setSceneState] = useState<SceneState>("loading");
  const [activeChapter, setActiveChapter] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;

    if (!window.WebGLRenderingContext || connection?.saveData || reduceMotion) {
      const fallbackFrame = window.requestAnimationFrame(() => setSceneState("fallback"));
      return () => window.cancelAnimationFrame(fallbackFrame);
    }

    let cancelled = false;
    let destroyScene: () => void = () => {};

    const startScene = async () => {
      try {
        const THREE = await import("three");
        if (cancelled) return;

        let isMobile = window.matchMedia("(max-width: 800px)").matches;
        const renderer = new THREE.WebGLRenderer({
          canvas,
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        });
        renderer.setClearColor(0x070808, 1);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.2 : 1.65));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x070808);
        const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 40);
        camera.position.z = 10;
        const composition = new THREE.Group();
        const archiveGroup = new THREE.Group();
        composition.add(archiveGroup);
        scene.add(composition);

        const hemisphere = new THREE.HemisphereLight(0xf4f5f3, 0x444844, 1.8);
        const key = new THREE.DirectionalLight(0xfffaf2, 2.4);
        key.position.set(-3, 5, 8);
        const fill = new THREE.DirectionalLight(0xe7eef1, 0.8);
        fill.position.set(5, -1, 5);
        scene.add(hemisphere, key, fill);

        let removeListeners = () => {};
        let disposed = false;
        // Install disposal before loading: navigation or a failed image can interrupt setup.
        destroyScene = () => {
          if (disposed) return;
          disposed = true;
          removeListeners();
          scene.traverse((object) => {
            if (!(object instanceof THREE.Mesh)) return;
            object.geometry.dispose();
            const materials = Array.isArray(object.material) ? object.material : [object.material];
            materials.forEach((material) => {
              if (material instanceof THREE.MeshStandardMaterial) material.map?.dispose();
              material.dispose();
            });
          });
          renderer.dispose();
        };

        // The image and paper share a shallow curl, so the edge remains physically continuous.
        const curvePrint = (geometry: InstanceType<typeof THREE.PlaneGeometry> | InstanceType<typeof THREE.BoxGeometry>, width: number, height: number) => {
          const vertices = geometry.getAttribute("position");
          if (!(vertices instanceof THREE.BufferAttribute)) return geometry;
          for (let index = 0; index < vertices.count; index += 1) {
            const x = vertices.getX(index) / width;
            const y = vertices.getY(index) / height;
            vertices.setZ(index, vertices.getZ(index) + x * x * 0.24 + y * y * 0.06 + x * y * 0.035);
          }
          geometry.computeVertexNormals();
          return geometry;
        };

        const textureLoader = new THREE.TextureLoader();
        const maxAnisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
        const photoObjects: InstanceType<typeof THREE.Group>[] = [];

        const textureResults = await Promise.allSettled(
          archivePlanes.map(async (plane, index) => {
            const texture = await textureLoader.loadAsync(plane.src);
            if (cancelled || disposed) {
              texture.dispose();
              return;
            }

            texture.colorSpace = THREE.SRGBColorSpace;
            texture.anisotropy = maxAnisotropy;

            const layout = plane.desktop;
            const print = new THREE.Group();
            print.userData.frames = layout.frames;
            print.userData.phase = index * 0.82;

            const [width, height] = layout.size;
            const backingGeometry = curvePrint(
              new THREE.BoxGeometry(width + 0.035, height + 0.035, 0.012, 32, 24, 1), width, height,
            );
            const backingMaterial = new THREE.MeshStandardMaterial({
              color: 0xdddcd5,
              metalness: 0,
              roughness: 0.94,
            });
            const backing = new THREE.Mesh(backingGeometry, backingMaterial);

            const imageGeometry = curvePrint(new THREE.PlaneGeometry(width, height, 32, 24), width, height);
            const imageMaterial = new THREE.MeshPhysicalMaterial({
              map: texture,
              roughness: 0.78,
              metalness: 0,
              clearcoat: 0.12,
              clearcoatRoughness: 0.65,
              emissiveMap: texture,
              emissive: 0xffffff,
              emissiveIntensity: 0.16,
            });
            const image = new THREE.Mesh(imageGeometry, imageMaterial);
            image.position.z = 0.007;

            print.add(backing, image);
            archiveGroup.add(print);
            photoObjects.push(print);
          }),
        );

        if (cancelled) return;
        if (textureResults.every((result) => result.status === "rejected")) {
          throw new Error("Archive textures could not be loaded");
        }

        const pointer = { x: 0, y: 0 };
        const pointerTarget = { x: 0, y: 0 };
        let targetProgress = 0;
        let currentProgress = 0;
        let currentChapter = -1;
        let sceneNearViewport = true;
        let pageVisible = !document.hidden;
        let frameId = 0;
        let lastRenderTime = 0;
        let contextLost = false;

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
          if (nextChapter === currentChapter) return;
          currentChapter = nextChapter;
          setActiveChapter(nextChapter);

          chapterRefs.current.forEach((chapter, index) => {
            if (!chapter) return;
            const active = index === nextChapter;
            chapter.style.opacity = active ? "1" : "0";
            chapter.style.transform = `translate3d(0, ${active ? 0 : 8}px, 0)`;
            chapter.style.visibility = active ? "visible" : "hidden";
          });
        };

        const applyScene = (progress: number, time: number) => {
          const { from, to, mix } = getSegment(progress);
          const cameraFrames = isMobile ? mobileCamera : desktopCamera;
          const cameraFrom = cameraFrames[from];
          const cameraTo = cameraFrames[to];
          const groupYaw = toRadians(THREE.MathUtils.lerp(cameraFrom.groupYaw, cameraTo.groupYaw, mix));

          archiveGroup.rotation.y = groupYaw + pointer.x * (isMobile ? 0 : 0.02);
          archiveGroup.rotation.x = -pointer.y * (isMobile ? 0 : 0.012);

          const seconds = time * 0.001;
          photoObjects.forEach((photo) => {
            const frames = photo.userData.frames as PlaneLayout["frames"];
            const start = frames[from];
            const end = frames[to];
            const float = Math.sin(seconds * 0.2 + Number(photo.userData.phase)) * 0.016;
            const depth = THREE.MathUtils.lerp(start.position[2], end.position[2], mix);
            const foreground = THREE.MathUtils.smoothstep(depth, -0.5, 1);

            photo.position.set(
              THREE.MathUtils.lerp(start.position[0], end.position[0], mix) * (isMobile ? 0.68 : 1),
              THREE.MathUtils.lerp(start.position[1], end.position[1], mix) * (isMobile ? 0.85 : 1) + float,
              depth,
            );
            photo.rotation.set(
              THREE.MathUtils.lerp(start.rotation[0], end.rotation[0], mix),
              THREE.MathUtils.lerp(start.rotation[1], end.rotation[1], mix),
              THREE.MathUtils.lerp(start.rotation[2], end.rotation[2], mix),
            );
            const scale = THREE.MathUtils.lerp(start.scale, end.scale, mix);
            photo.scale.setScalar(scale * (isMobile ? 0.68 + foreground * 0.32 : 1));
          });
        };

        const updateTargetProgress = () => {
          const bounds = section.getBoundingClientRect();
          const scrollableDistance = Math.max(1, bounds.height - canvas.clientHeight);
          targetProgress = THREE.MathUtils.clamp(-bounds.top / scrollableDistance, 0, 1);

        };

        const resize = () => {
          const width = section.clientWidth;
          const height = canvas.clientHeight;
          if (width === 0 || height === 0) return;
          isMobile = width <= 800;
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.2 : 1.65));
          renderer.setSize(width, height, false);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          // Fit the prints into the free area, leaving the reading column completely clear.
          const worldHeight = 2 * Math.tan(toRadians(camera.fov / 2)) * camera.position.z;
          const unitsPerPixel = worldHeight / height;
          const copy = copyRef.current;
          const gutter = isMobile ? 24 : 40;
          const left = isMobile ? gutter : (copy?.offsetLeft ?? gutter) + (copy?.offsetWidth ?? width * 0.32) + 48;
          const top = isMobile ? (copy?.offsetTop ?? 88) + (copy?.offsetHeight ?? 260) + 16 : 88;
          const availableWidth = Math.max(1, width - left - gutter);
          const availableHeight = Math.max(1, height - top - 40);
          const scale = Math.min(availableWidth / (isMobile ? 4.6 : 6.8), availableHeight / 4.8) * unitsPerPixel;
          composition.scale.setScalar(scale);
          // Shift the lens center rather than the prints, preserving margins at every depth.
          camera.setViewOffset(
            width, height,
            width / 2 - left - availableWidth / 2,
            height / 2 - top - availableHeight / 2,
            width, height,
          );
          updateTargetProgress();
          applyScene(currentProgress, performance.now());
          renderer.render(scene, camera);
        };

        const shouldRender = () => sceneNearViewport && pageVisible && !contextLost && !disposed;

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
          const delta = Math.min(0.05, (time - lastRenderTime) / 1000);
          lastRenderTime = time;

          const easing = 1 - Math.exp(-8 * delta);
          currentProgress += (targetProgress - currentProgress) * easing;
          pointer.x += (pointerTarget.x - pointer.x) * easing;
          pointer.y += (pointerTarget.y - pointer.y) * easing;
          applyScene(currentProgress, time);
          updateCopy(currentProgress);
          renderer.render(scene, camera);
          scheduleFrame();
        };

        const handlePointerMove = (event: PointerEvent) => {
          if (isMobile) return;
          const bounds = canvas.getBoundingClientRect();
          pointerTarget.x = THREE.MathUtils.clamp(((event.clientX - bounds.left) / bounds.width - 0.5) * 2, -1, 1);
          pointerTarget.y = THREE.MathUtils.clamp(((event.clientY - bounds.top) / bounds.height - 0.5) * 2, -1, 1);
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
          contextLost = true;
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
        applyScene(currentProgress, performance.now());
        updateCopy(targetProgress);
        renderer.render(scene, camera);

        const context = renderer.getContext();
        const sampleSize = Math.min(96, canvas.width, canvas.height);
        const sample = new Uint8Array(sampleSize * sampleSize * 4);
        const samplePoint = composition.position.clone().project(camera);
        context.readPixels(
          THREE.MathUtils.clamp(Math.floor((samplePoint.x + 1) * canvas.width / 2 - sampleSize / 2), 0, canvas.width - sampleSize),
          THREE.MathUtils.clamp(Math.floor((samplePoint.y + 1) * canvas.height / 2 - sampleSize / 2), 0, canvas.height - sampleSize),
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

        removeListeners = () => {
          if (frameId) window.cancelAnimationFrame(frameId);
          visibilityObserver?.disconnect();
          window.removeEventListener("resize", resize);
          window.removeEventListener("scroll", updateTargetProgress);
          document.removeEventListener("visibilitychange", handleVisibilityChange);
          section.removeEventListener("pointermove", handlePointerMove);
          section.removeEventListener("pointerleave", resetPointer);
          canvas.removeEventListener("webglcontextlost", handleContextLoss);
        };
      } catch {
        destroyScene();
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
        <div ref={copyRef} className={styles.spatialCopy}>
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
        서도역, 앙코르, 겨울 산길, 밤의 연못과 홍콩의 풍경을 네 장면으로 연결한 입체 사진 아카이브입니다.
      </p>
    </section>
  );
}
