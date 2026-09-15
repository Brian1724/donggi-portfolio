"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./CameraStudy.module.css";

export function CameraStudy() {
  const host = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<"loading" | "ready" | "fallback">("loading");

  useEffect(() => {
    const element = host.current;
    const surface = canvas.current;
    if (!element || !surface) return;

    let cancelled = false;
    let cleanup = () => {};

    const start = async () => {
      try {
        const THREE = await import("three");
        const { GLTFLoader } = await import("three/addons/loaders/GLTFLoader.js");
        const { RoomEnvironment } = await import("three/addons/environments/RoomEnvironment.js");
        if (cancelled) return;

        const renderer = new THREE.WebGLRenderer({
          canvas: surface,
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.08;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        const scene = new THREE.Scene();
        const pmrem = new THREE.PMREMGenerator(renderer);
        const room = new RoomEnvironment();
        const environment = pmrem.fromScene(room, 0.04);
        room.dispose();
        pmrem.dispose();
        scene.environment = environment.texture;

        const camera = new THREE.PerspectiveCamera(30, 1, 0.001, 10);
        const key = new THREE.DirectionalLight(0xffffff, 3.1);
        key.position.set(-2.4, 3.2, 4.8);
        key.castShadow = true;
        key.shadow.mapSize.set(1024, 1024);
        key.shadow.camera.near = 0.1;
        key.shadow.camera.far = 8;
        const rim = new THREE.DirectionalLight(0x94a9ba, 1.15);
        rim.position.set(3.5, 1.2, -2.5);
        const fill = new THREE.HemisphereLight(0xf7f8f6, 0x20262c, 1.25);
        scene.add(key, rim, fill);

        let frame = 0;
        let last = 0;
        let visible = true;
        let disposed = false;
        let removeListeners = () => {};

        const disposeObject = (object: import("three").Object3D) => {
          const textures = new Set<import("three").Texture>();
          object.traverse((child) => {
            if (!(child instanceof THREE.Mesh)) return;
            child.geometry.dispose();
            (Array.isArray(child.material) ? child.material : [child.material]).forEach((material) => {
              Object.values(material).forEach((value) => {
                if (value instanceof THREE.Texture) textures.add(value);
              });
              material.dispose();
            });
          });
          textures.forEach((texture) => texture.dispose());
        };

        cleanup = () => {
          if (disposed) return;
          disposed = true;
          cancelAnimationFrame(frame);
          removeListeners();
          disposeObject(scene);
          environment.dispose();
          renderer.dispose();
        };

        const gltf = await new GLTFLoader().loadAsync("/media/Sony_A7C_II.glb");
        if (cancelled) {
          disposeObject(gltf.scene);
          return;
        }

        const modelBounds = new THREE.Box3().setFromObject(gltf.scene);
        const modelCenter = modelBounds.getCenter(new THREE.Vector3());
        gltf.scene.position.sub(modelCenter);
        gltf.scene.traverse((child) => {
          if (!(child instanceof THREE.Mesh)) return;
          child.castShadow = true;
          child.receiveShadow = true;
        });

        const object = new THREE.Group();
        object.add(gltf.scene);
        scene.add(object);
        object.updateMatrixWorld(true);

        const bounds = new THREE.Box3().setFromObject(object);
        const size = bounds.getSize(new THREE.Vector3());
        const ground = new THREE.Mesh(
          new THREE.PlaneGeometry(
            Math.max(size.x, size.z) * 4.2,
            Math.max(size.x, size.z) * 4.2,
          ),
          new THREE.ShadowMaterial({ color: 0x000000, opacity: 0.2 }),
        );
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = bounds.min.y - size.y * 0.015;
        ground.receiveShadow = true;
        scene.add(ground);

        const direction = new THREE.Vector3(-0.17, 0.114, 0.23).normalize();
        const origin = new THREE.Vector3();
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
        let currentAngle = 0;
        let targetAngle = 0;

        const fitDistance = () => {
          const right = new THREE.Vector3(direction.z, 0, -direction.x).normalize();
          const up = direction.clone().cross(right).normalize();
          const tangent = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
          let distance = 0;
          for (const x of [bounds.min.x, bounds.max.x]) {
            for (const y of [bounds.min.y, bounds.max.y]) {
              for (const z of [bounds.min.z, bounds.max.z]) {
                const point = new THREE.Vector3(x, y, z);
                distance = Math.max(
                  distance,
                  point.dot(direction) + Math.max(
                    Math.abs(point.dot(right)) / (tangent * camera.aspect),
                    Math.abs(point.dot(up)) / tangent,
                  ),
                );
              }
            }
          }
          return distance * 1.04;
        };

        const sampleCanvas = () => {
          const gl = renderer.getContext();
          const sampleSize = 24;
          const pixels = new Uint8Array(sampleSize * sampleSize * 4);
          gl.readPixels(
            Math.max(0, Math.floor(surface.width / 2 - sampleSize / 2)),
            Math.max(0, Math.floor(surface.height / 2 - sampleSize / 2)),
            sampleSize,
            sampleSize,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            pixels,
          );
          let min = 255;
          let max = 0;
          for (let index = 0; index < pixels.length; index += 4) {
            min = Math.min(min, pixels[index]);
            max = Math.max(max, pixels[index]);
          }
          surface.dataset.pixelRange = `${min}-${max}`;
          surface.dataset.triangles = String(renderer.info.render.triangles);
          surface.dataset.rendered = "true";
        };

        const request = () => {
          if (!frame && !disposed && visible && !document.hidden) {
            frame = requestAnimationFrame(render);
          }
        };

        const render = (now: number) => {
          frame = 0;
          const delta = Math.min((now - (last || now)) / 1000, 0.05);
          last = now;
          currentAngle = reducedMotion.matches
            ? 0
            : THREE.MathUtils.lerp(currentAngle, targetAngle, Math.min(1, delta * 3.5));
          object.rotation.y = currentAngle;
          renderer.render(scene, camera);
          sampleCanvas();
          if (Math.abs(currentAngle - targetAngle) > 0.0002) request();
        };

        const updateAngle = () => {
          const rect = element.getBoundingClientRect();
          const travel = window.innerHeight + rect.height;
          const progress = THREE.MathUtils.clamp(
            (window.innerHeight - rect.top) / travel,
            0,
            1,
          );
          targetAngle = reducedMotion.matches ? 0 : (progress - 0.5) * 0.1;
          last = 0;
          request();
        };

        const resize = () => {
          renderer.setSize(element.clientWidth, element.clientHeight, false);
          camera.aspect = element.clientWidth / element.clientHeight;
          camera.updateProjectionMatrix();
          camera.position.copy(origin).addScaledVector(direction, fitDistance());
          camera.lookAt(origin);
          updateAngle();
        };

        const visibilityChange = () => {
          last = 0;
          if (document.hidden) {
            cancelAnimationFrame(frame);
            frame = 0;
          } else {
            request();
          }
        };
        const contextLost = (event: Event) => {
          event.preventDefault();
          cleanup();
          if (!cancelled) setState("fallback");
        };
        const resizeObserver = new ResizeObserver(resize);
        const observer = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
          last = 0;
          if (visible) {
            updateAngle();
          } else {
            cancelAnimationFrame(frame);
            frame = 0;
          }
        });

        resizeObserver.observe(element);
        observer.observe(element);
        window.addEventListener("scroll", updateAngle, { passive: true });
        document.addEventListener("visibilitychange", visibilityChange);
        reducedMotion.addEventListener("change", updateAngle);
        surface.addEventListener("webglcontextlost", contextLost);
        removeListeners = () => {
          resizeObserver.disconnect();
          observer.disconnect();
          window.removeEventListener("scroll", updateAngle);
          document.removeEventListener("visibilitychange", visibilityChange);
          reducedMotion.removeEventListener("change", updateAngle);
          surface.removeEventListener("webglcontextlost", contextLost);
        };

        resize();
        renderer.render(scene, camera);
        sampleCanvas();
        setState("ready");
      } catch {
        cleanup();
        if (!cancelled) setState("fallback");
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        void start();
      }
    }, { rootMargin: "300px" });
    observer.observe(element);

    return () => {
      cancelled = true;
      observer.disconnect();
      cleanup();
    };
  }, []);

  const ready = state === "ready";

  return (
    <section id="spatial-archive" className={styles.section} aria-labelledby="camera-title">
      <header className={styles.heading}>
        <p className={styles.eyebrow}>02 / OBJECT STUDY</p>
        <h2 id="camera-title">시선을 만드는 도구.</h2>
        <p>Sony A7C II, 오래 바라본 장면을 기록하는 카메라.</p>
      </header>
      <div ref={host} className={styles.stage}>
        {!ready && (
          <Image
            src="/media/Sony_A7C_II_preview.webp"
            alt="Sony A7C II의 정면 사선 구도. 검은 몸체와 렌즈 마운트, 상단 다이얼"
            fill
            sizes="(max-width: 800px) 94vw, 1120px"
            className={styles.fallback}
          />
        )}
        <canvas
          ref={canvas}
          className={styles.canvas}
          style={{ opacity: ready ? 1 : 0 }}
          aria-label="Sony A7C II 카메라 3D 오브젝트"
          role="img"
        />
      </div>
      <p className="sr-only" role="status">
        {state === "loading"
          ? "3D 모델을 불러오는 중"
          : state === "fallback"
            ? "3D 대신 카메라 미리보기 이미지를 표시합니다"
            : "3D 모델 준비 완료"}
      </p>
      <Link className={styles.link} href="/works/">
        사진과 영상 보기 <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}
