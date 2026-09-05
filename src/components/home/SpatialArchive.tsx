"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "../CinematicOnePage.module.css";

type SceneState = "loading" | "ready" | "fallback";

const archivePlanes = [
  {
    src: "/media/stills/still-04-seodo-station.jpg",
    alt: "서도역 플랫폼을 감싼 고요한 빛",
    desktop: { position: [0, 0, 1.35], size: [3.8, 2.55], rotation: [-0.03, 0.04, 0] },
    mobile: { position: [0, 0, 1.4], size: [2.8, 1.88], rotation: [-0.03, 0.03, 0] },
  },
  {
    src: "/media/stills/still-03-angkor.jpg",
    alt: "앙코르 유적의 돌과 나무 사이로 스며든 빛",
    desktop: { position: [-3.15, 1.18, -1.1], size: [3, 2], rotation: [0, 0.3, -0.035] },
    mobile: { position: [-0.92, 1.62, -0.7], size: [2.05, 1.37], rotation: [0, 0.18, -0.035] },
  },
  {
    src: "/media/stills/still-06-winter-trail.jpg",
    alt: "겨울 산길을 걷는 사람의 뒷모습",
    desktop: { position: [3.05, -0.62, -0.55], size: [2.12, 3.18], rotation: [0.03, -0.28, 0.025] },
    mobile: { position: [0.96, -1.3, -0.35], size: [1.34, 2.02], rotation: [0.03, -0.18, 0.025] },
  },
  {
    src: "/media/stills/still-05-night-reflection.jpg",
    alt: "밤거리 유리창에 겹쳐진 도시의 반사",
    desktop: { position: [-2.32, -1.55, -2.55], size: [2.02, 3.04], rotation: [0, 0.23, -0.05] },
    mobile: { position: [-0.86, -1.72, -1.65], size: [1.25, 1.88], rotation: [0, 0.16, -0.045] },
  },
  {
    src: "/media/stills/still-08-hong-kong.jpg",
    alt: "해 질 무렵 홍콩의 건물과 도시 풍경",
    desktop: { position: [2.62, 1.52, -3.05], size: [3.02, 2.02], rotation: [0, -0.26, 0.04] },
    mobile: { position: [0.82, 1.82, -2.1], size: [2.05, 1.37], rotation: [0, -0.16, 0.035] },
  },
] as const;

export function SpatialArchive() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [sceneState, setSceneState] = useState<SceneState>("loading");

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
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 1.75));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 0.92;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x070808);
        scene.fog = new THREE.Fog(0x070808, 8.5, 17);

        const camera = new THREE.PerspectiveCamera(isMobile ? 42 : 35, 1, 0.1, 40);
        camera.position.set(0, 0, isMobile ? 10.2 : 9.4);

        const archiveGroup = new THREE.Group();
        scene.add(archiveGroup);

        const textureLoader = new THREE.TextureLoader();
        const maxAnisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
        const photoMeshes: InstanceType<typeof THREE.Mesh>[] = [];

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
            const geometry = new THREE.PlaneGeometry(layout.size[0], layout.size[1]);
            const material = new THREE.MeshBasicMaterial({ map: texture });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(layout.position[0], layout.position[1], layout.position[2]);
            mesh.rotation.set(layout.rotation[0], layout.rotation[1], layout.rotation[2]);
            mesh.userData.baseY = layout.position[1];
            mesh.userData.baseRotationY = layout.rotation[1];
            mesh.userData.phase = index * 0.9;

            const edgeGeometry = new THREE.EdgesGeometry(geometry);
            const edgeMaterial = new THREE.LineBasicMaterial({
              color: 0xece9e2,
              transparent: true,
              opacity: index === 0 ? 0.42 : 0.2,
            });
            const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial);
            edges.position.z = 0.006;
            mesh.add(edges);

            archiveGroup.add(mesh);
            photoMeshes.push(mesh);
          }),
        );

        if (cancelled) return;
        if (textureResults.every((result) => result.status === "rejected")) {
          throw new Error("Archive textures could not be loaded");
        }

        const particleCount = isMobile ? 90 : 180;
        const particlePositions = new Float32Array(particleCount * 3);
        for (let index = 0; index < particleCount; index += 1) {
          const offset = index * 3;
          particlePositions[offset] = (Math.random() - 0.5) * 15;
          particlePositions[offset + 1] = (Math.random() - 0.5) * 9;
          particlePositions[offset + 2] = -Math.random() * 10;
        }
        const particleGeometry = new THREE.BufferGeometry();
        particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
        const particleMaterial = new THREE.PointsMaterial({
          color: 0xd6d3ca,
          size: isMobile ? 0.018 : 0.022,
          transparent: true,
          opacity: 0.34,
          sizeAttenuation: true,
        });
        const particles = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particles);

        const pointer = { x: 0, y: 0 };
        const pointerTarget = { x: 0, y: 0 };
        let scrollProgress = 0.5;
        let frameId = 0;

        const updateScrollProgress = () => {
          const bounds = section.getBoundingClientRect();
          scrollProgress = THREE.MathUtils.clamp(
            (window.innerHeight - bounds.top) / (window.innerHeight + bounds.height),
            0,
            1,
          );
        };

        const resize = () => {
          const width = section.clientWidth;
          const height = section.clientHeight;
          if (width === 0 || height === 0) return;
          renderer.setSize(width, height, false);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.render(scene, camera);
        };

        const handlePointerMove = (event: PointerEvent) => {
          const bounds = section.getBoundingClientRect();
          pointerTarget.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
          pointerTarget.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
        };

        const resetPointer = () => {
          pointerTarget.x = 0;
          pointerTarget.y = 0;
        };

        const renderFrame = (time = 0) => {
          pointer.x += (pointerTarget.x - pointer.x) * 0.045;
          pointer.y += (pointerTarget.y - pointer.y) * 0.045;

          archiveGroup.rotation.y = pointer.x * 0.075 + (scrollProgress - 0.5) * 0.16;
          archiveGroup.rotation.x = -pointer.y * 0.025;
          archiveGroup.position.y = (isMobile ? -0.52 : 0) + pointer.y * -0.09 + (scrollProgress - 0.5) * 0.22;
          camera.position.x = pointer.x * 0.12;
          camera.position.y = -pointer.y * 0.08;
          camera.position.z = (isMobile ? 10.2 : 9.4) - scrollProgress * 0.34;
          camera.lookAt(0, 0, 0);

          const seconds = time * 0.001;
          photoMeshes.forEach((mesh) => {
            mesh.position.y = Number(mesh.userData.baseY) + Math.sin(seconds * 0.34 + Number(mesh.userData.phase)) * 0.045;
            mesh.rotation.y = Number(mesh.userData.baseRotationY) + Math.sin(seconds * 0.22 + Number(mesh.userData.phase)) * 0.018;
          });
          particles.rotation.y = seconds * 0.008;

          renderer.render(scene, camera);
          if (!reduceMotion) frameId = window.requestAnimationFrame(renderFrame);
        };

        const handleContextLoss = (event: Event) => {
          event.preventDefault();
          setSceneState("fallback");
        };

        resize();
        updateScrollProgress();
        renderFrame();

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

        window.addEventListener("resize", resize);
        window.addEventListener("scroll", updateScrollProgress, { passive: true });
        section.addEventListener("pointermove", handlePointerMove, { passive: true });
        section.addEventListener("pointerleave", resetPointer);
        canvas.addEventListener("webglcontextlost", handleContextLoss);

        destroyScene = () => {
          window.cancelAnimationFrame(frameId);
          window.removeEventListener("resize", resize);
          window.removeEventListener("scroll", updateScrollProgress);
          section.removeEventListener("pointermove", handlePointerMove);
          section.removeEventListener("pointerleave", resetPointer);
          canvas.removeEventListener("webglcontextlost", handleContextLoss);
          scene.traverse((object) => {
            if (object instanceof THREE.Mesh || object instanceof THREE.LineSegments || object instanceof THREE.Points) {
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
        <h2 id="spatial-archive-title">Depth between frames.</h2>
        <p>서로 다른 시간에 기록한 장면을 하나의 깊이 안에서 천천히 연결합니다.</p>
      </div>
      <p className={styles.spatialHint} aria-hidden="true">
        Move / Scroll to explore
      </p>
      <p className="sr-only">
        서도역, 앙코르, 겨울 산길, 밤거리의 반사와 홍콩의 풍경으로 구성한 입체 사진 아카이브입니다.
      </p>
    </section>
  );
}
