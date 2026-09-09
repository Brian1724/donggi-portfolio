"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "../CinematicOnePage.module.css";

type SceneState = "loading" | "ready" | "fallback";
const photograph = "/media/stills/still-04-seodo-station.jpg";

export function SpatialArchive() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const [sceneState, setSceneState] = useState<SceneState>("loading");

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    let cancelled = false;
    let stopScene: () => void = () => {};
    let observer: IntersectionObserver | null = null;
    const showFallback = () => {
      stopScene();
      if (!cancelled) setSceneState("fallback");
    };
    if (motionPreference.matches || connection?.saveData || !window.WebGLRenderingContext) {
      const frame = requestAnimationFrame(showFallback);
      return () => cancelAnimationFrame(frame);
    }

    const startScene = async () => {
      try {
        const THREE = await import("three");
        if (cancelled) return;
        const mobile = window.matchMedia("(max-width: 800px)").matches;
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
        renderer.setClearColor(0x080808);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x080808);
        const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 80);
        const book = new THREE.Group();
        book.rotation.y = -0.12;
        scene.add(book);
        let disposed = false;
        let removeListeners = () => {};
        const textures = new Set<InstanceType<typeof THREE.Texture>>();
        stopScene = () => {
          if (disposed) return;
          disposed = true;
          removeListeners();
          const geometries = new Set<InstanceType<typeof THREE.BufferGeometry>>();
          const materials = new Set<InstanceType<typeof THREE.Material>>();
          scene.traverse((object) => {
            if (!(object instanceof THREE.Mesh)) return;
            geometries.add(object.geometry);
            (Array.isArray(object.material) ? object.material : [object.material]).forEach((material) => materials.add(material));
          });
          geometries.forEach((geometry) => geometry.dispose());
          materials.forEach((material) => material.dispose());
          textures.forEach((texture) => texture.dispose());
          renderer.dispose();
        };
        const texture = await new THREE.TextureLoader().loadAsync(photograph);
        if (cancelled || disposed) {
          texture.dispose();
          return;
        }
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
        textures.add(texture);
        const makePrintTexture = (offset: number, repeat: number) => {
          const map = texture.clone();
          map.offset.x = offset;
          map.repeat.x = repeat;
          map.needsUpdate = true;
          textures.add(map);
          return map;
        };

        // One photograph spans the binding; the inside cover reverses its UVs when opened.
        const rightMap = makePrintTexture(0.5, 0.5);
        const leftMap = makePrintTexture(0.5, -0.5);
        const coverMap = makePrintTexture(0.25, 0.5);
        const paperMaterial = new THREE.MeshStandardMaterial({ color: 0xd9d7cf, roughness: 0.95 });
        const clothMaterial = new THREE.MeshStandardMaterial({ color: 0x181c1a, roughness: 0.92 });
        const photoMaterial = (map: InstanceType<typeof THREE.Texture>, side: 0 | 1 | 2 = THREE.FrontSide) => new THREE.MeshPhysicalMaterial({
          map, side, roughness: 0.82, clearcoat: 0.06, clearcoatRoughness: 0.8,
          emissiveMap: map, emissive: 0xffffff, emissiveIntensity: 0.12,
        });
        const width = 3;
        const height = 4;
        const backCover = new THREE.Mesh(new THREE.BoxGeometry(width + 0.12, 0.08, height + 0.12), clothMaterial);
        backCover.position.set(width / 2, -0.04, 0);
        backCover.castShadow = true;
        backCover.receiveShadow = true;
        book.add(backCover);
        const leafGeometry = new THREE.BoxGeometry(width - 0.025, 0.014, height - 0.025);
        for (let index = 0; index < 10; index += 1) {
          const leaf = new THREE.Mesh(leafGeometry, paperMaterial);
          leaf.position.set(width / 2, 0.009 + index * 0.017, 0);
          leaf.castShadow = true;
          leaf.receiveShadow = true;
          book.add(leaf);
        }
        const makePage = (material: InstanceType<typeof THREE.MeshPhysicalMaterial>, y: number, pageWidth = width, pageHeight = height) => {
          const geometry = new THREE.PlaneGeometry(pageWidth, pageHeight, 40, 20);
          const positions = geometry.getAttribute("position");
          for (let index = 0; index < positions.count; index += 1) {
            const x = positions.getX(index) + width / 2;
            const z = -positions.getY(index);
            // The paper rises slightly at its bound edge, without free-floating waves.
            const curve = 0.025 * Math.pow(1 - x / width, 3);
            positions.setXYZ(index, x, y + curve, z);
          }
          geometry.computeVertexNormals();
          const page = new THREE.Mesh(geometry, material);
          page.castShadow = true;
          page.receiveShadow = true;
          return page;
        };
        book.add(makePage(photoMaterial(rightMap), 0.179));
        const hinge = new THREE.Group();
        hinge.position.y = 0.212;
        book.add(hinge);
        const frontCover = new THREE.Mesh(new THREE.BoxGeometry(width + 0.12, 0.064, height + 0.12), clothMaterial);
        frontCover.position.set(width / 2, 0, 0);
        frontCover.castShadow = true;
        frontCover.receiveShadow = true;
        hinge.add(frontCover);
        hinge.add(makePage(photoMaterial(coverMap), 0.034, width - 0.24, height - 0.24));
        hinge.add(makePage(photoMaterial(leftMap, THREE.BackSide), -0.059));
        const spine = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, height + 0.1, 20), clothMaterial);
        spine.rotation.x = Math.PI / 2;
        spine.position.set(-0.025, 0.075, 0);
        spine.castShadow = true;
        book.add(spine);
        const floor = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.MeshStandardMaterial({ color: 0x080808, roughness: 1 }));
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = -0.083;
        floor.receiveShadow = true;
        scene.add(floor);
        const ambient = new THREE.HemisphereLight(0xf4f4f1, 0x444b45, 2.1);
        const key = new THREE.DirectionalLight(0xfffaf3, 3.2);
        key.position.set(-3, 9, 5);
        key.castShadow = true;
        key.shadow.mapSize.set(mobile ? 512 : 1024, mobile ? 512 : 1024);
        key.shadow.camera.left = -7;
        key.shadow.camera.right = 7;
        key.shadow.camera.top = 7;
        key.shadow.camera.bottom = -7;
        key.shadow.camera.near = 0.5;
        key.shadow.camera.far = 24;
        key.shadow.bias = -0.0004;
        key.shadow.normalBias = 0.012;
        const fill = new THREE.DirectionalLight(0xeaf0f3, 0.5);
        fill.position.set(5, 4, -2);
        scene.add(ambient, key, fill);

        let targetProgress = 0;
        let currentProgress = 0;
        let frameId = 0;
        let lastTime = 0;
        let nearViewport = true;
        let pageVisible = !document.hidden;
        let viewportWidth = 1;
        let viewportHeight = 1;
        let artworkWidth = 1;
        let artworkHeight = 1;
        let renderedFrames = 0;
        const bounds = new THREE.Box3();
        const center = new THREE.Vector3();
        const corner = new THREE.Vector3();
        const offset = new THREE.Vector3();
        const direction = new THREE.Vector3(0.6, 8.5, 7.2).normalize();
        const right = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), direction).normalize();
        const up = new THREE.Vector3().crossVectors(direction, right).normalize();
        const renderScene = () => {
          const opening = THREE.MathUtils.smoothstep(currentProgress, 0, 0.82);
          hinge.rotation.z = THREE.MathUtils.lerp(0.035, Math.PI + 0.088, opening);
          book.updateMatrixWorld(true);
          bounds.setFromObject(book);
          bounds.getCenter(center);
          // Fit the hinged object between heading and caption. A fixed viewing direction
          // and long lens keep the motion coherent throughout the opening movement.
          const tanV = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
          const tanH = tanV * viewportWidth / viewportHeight;
          let distance = 0;
          for (let index = 0; index < 8; index += 1) {
            corner.set(index & 1 ? bounds.max.x : bounds.min.x, index & 2 ? bounds.max.y : bounds.min.y, index & 4 ? bounds.max.z : bounds.min.z);
            offset.copy(corner).sub(center);
            const horizontal = Math.abs(offset.dot(right)) / (tanH * artworkWidth / viewportWidth);
            const vertical = Math.abs(offset.dot(up)) / (tanV * artworkHeight / viewportHeight);
            distance = Math.max(distance, offset.dot(direction) + Math.max(horizontal, vertical) * 1.1);
          }
          camera.position.copy(center).addScaledVector(direction, distance);
          camera.lookAt(center);
          renderer.render(scene, camera);
          canvas.dataset.frames = String(++renderedFrames);
        };
        const readProgress = () => {
          const rect = section.getBoundingClientRect();
          targetProgress = THREE.MathUtils.clamp(-rect.top / Math.max(1, rect.height - canvas.clientHeight), 0, 1);
        };
        const shouldRender = () => !disposed && nearViewport && pageVisible;
        const tick = (time: number) => {
          frameId = 0;
          if (!shouldRender()) return;
          const delta = Math.min(0.05, Math.max(1 / 120, (time - lastTime) / 1000));
          lastTime = time;
          currentProgress += (targetProgress - currentProgress) * (1 - Math.exp(-12 * delta));
          if (Math.abs(targetProgress - currentProgress) < 0.0001) currentProgress = targetProgress;
          renderScene();
          if (currentProgress !== targetProgress) frameId = requestAnimationFrame(tick);
        };
        const requestRender = () => {
          if (!frameId && shouldRender()) frameId = requestAnimationFrame(tick);
        };
        const handleScroll = () => {
          readProgress();
          requestRender();
        };
        const resize = () => {
          viewportWidth = section.clientWidth;
          viewportHeight = canvas.clientHeight;
          if (!viewportWidth || !viewportHeight || disposed) return;
          const smallScreen = viewportWidth <= 800;
          const heading = headingRef.current;
          const caption = captionRef.current;
          const top = (heading?.offsetTop ?? 96) + (heading?.offsetHeight ?? 160) + 24;
          const bottom = caption?.offsetTop ?? viewportHeight - 64;
          const gutter = smallScreen ? 20 : Math.max(48, viewportWidth * 0.06);
          artworkWidth = Math.max(1, viewportWidth - gutter * 2);
          artworkHeight = Math.max(1, bottom - top - 16);
          renderer.setPixelRatio(Math.min(devicePixelRatio, smallScreen ? 1.3 : 1.65));
          renderer.setSize(viewportWidth, viewportHeight, false);
          camera.aspect = viewportWidth / viewportHeight;
          camera.setViewOffset(viewportWidth, viewportHeight, 0, viewportHeight / 2 - top - artworkHeight / 2, viewportWidth, viewportHeight);
          readProgress();
          currentProgress = targetProgress;
          renderScene();
        };
        const handleVisibility = () => {
          pageVisible = !document.hidden;
          if (pageVisible) handleScroll();
          else {
            cancelAnimationFrame(frameId);
            frameId = 0;
          }
        };
        const handleContextLoss = (event: Event) => {
          event.preventDefault();
          showFallback();
        };
        const handleMotionPreference = () => {
          if (motionPreference.matches) showFallback();
        };
        const visibilityObserver = new IntersectionObserver(([entry]) => {
          nearViewport = entry.isIntersecting;
          if (nearViewport) handleScroll();
          else {
            cancelAnimationFrame(frameId);
            frameId = 0;
          }
        }, { rootMargin: "200px 0px" });
        visibilityObserver.observe(section);
        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", resize);
        document.addEventListener("visibilitychange", handleVisibility);
        motionPreference.addEventListener("change", handleMotionPreference);
        canvas.addEventListener("webglcontextlost", handleContextLoss);
        const contentObserver = new ResizeObserver(resize);
        if (headingRef.current) contentObserver.observe(headingRef.current);
        removeListeners = () => {
          cancelAnimationFrame(frameId);
          visibilityObserver.disconnect();
          contentObserver.disconnect();
          window.removeEventListener("scroll", handleScroll);
          window.removeEventListener("resize", resize);
          document.removeEventListener("visibilitychange", handleVisibility);
          motionPreference.removeEventListener("change", handleMotionPreference);
          canvas.removeEventListener("webglcontextlost", handleContextLoss);
          key.shadow.map?.dispose();
        };
        resize();
        const context = renderer.getContext();
        const sample = new Uint8Array(64 * 64 * 4);
        const point = center.clone().project(camera);
        context.readPixels(
          THREE.MathUtils.clamp(Math.floor((point.x + 1) * canvas.width / 2 - 32), 0, canvas.width - 64),
          THREE.MathUtils.clamp(Math.floor((point.y + 1) * canvas.height / 2 - 32), 0, canvas.height - 64),
          64, 64, context.RGBA, context.UNSIGNED_BYTE, sample,
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
      } catch {
        showFallback();
      }
    };

    if ("IntersectionObserver" in window && "ResizeObserver" in window) {
      observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        observer?.disconnect();
        void startScene();
      }, { rootMargin: "500px 0px" });
      observer.observe(section);
    } else {
      const frame = requestAnimationFrame(showFallback);
      stopScene = () => cancelAnimationFrame(frame);
    }
    return () => {
      cancelled = true;
      observer?.disconnect();
      stopScene();
    };
  }, []);

  return (
    <section ref={sectionRef} id="spatial-archive" className={`${styles.spatialArchive} ${styles[sceneState]}`} aria-labelledby="spatial-archive-title">
      <div className={styles.spatialSticky}>
        <div ref={headingRef} className={styles.spatialCopy}>
          <div>
            <p className={styles.eyebrow}>02 / PHOTO STUDY</p>
            <h2 id="spatial-archive-title">장면을 펼치다.</h2>
          </div>
          <p className={styles.spatialIntroduction}>서도역에서 기록한<br className={styles.spatialDesktopBreak} /> 가을의 빛과 사람들.</p>
        </div>
        <div className={styles.spatialFallback}>
          <Image src={photograph} alt="가을빛이 머문 서도역 앞을 오가는 사람들" width={1600} height={1067} sizes="(max-width: 800px) 90vw, 80vw" />
        </div>
        <canvas ref={canvasRef} className={styles.spatialCanvas} aria-hidden="true" />
        <div ref={captionRef} className={styles.spatialCaption}>
          <p>서도역, 남원<span>Photography / Donggi Yoon</span></p>
          <Link href="/works/dk4film-photo-archive/">사진 작업 보기 <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
      <p className="sr-only">서도역의 사진을 한 권의 가상 사진집으로 펼쳐 보는 비주얼 아카이브입니다.</p>
    </section>
  );
}
