"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { photoBook } from "@/data/photo-book";
import { advanceBook, bookSequence, pagePoint } from "@/lib/book-motion";
import styles from "../CinematicOnePage.module.css";

type SceneState = "loading" | "ready" | "fallback";
const photograph = photoBook.panorama;
const coverPhotograph = photoBook.cover;

export function SpatialArchive() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const [sceneState, setSceneState] = useState<SceneState>("loading");
  const [spread, setSpread] = useState(0);

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
        const { RoundedBoxGeometry } = await import("three/addons/geometries/RoundedBoxGeometry.js");
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
        const coverMap = await new THREE.TextureLoader().loadAsync(coverPhotograph);
        if (cancelled || disposed) {
          coverMap.dispose();
          return;
        }
        coverMap.colorSpace = THREE.SRGBColorSpace;
        coverMap.anisotropy = texture.anisotropy;
        textures.add(coverMap);
        const loadPrint = async (path: string) => {
          const map = await new THREE.TextureLoader().loadAsync(path);
          if (cancelled || disposed) { map.dispose(); throw new Error("Scene disposed"); }
          map.colorSpace = THREE.SRGBColorSpace;
          map.anisotropy = texture.anisotropy;
          textures.add(map);
          return map;
        };
        const portraitMap = await loadPrint(photoBook.portrait);
        const detailMap = await loadPrint(photoBook.detail);
        const closingMap = await loadPrint(photoBook.closing);
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
        // A repeating woven height field gives the cloth texture without another image download.
        const weavePixels = new Uint8Array(128 * 128 * 4);
        for (let y = 0; y < 128; y += 1) {
          for (let x = 0; x < 128; x += 1) {
            const value = Math.round(128 + 32 * Math.sin(x * Math.PI / 4) + 24 * Math.sin(y * Math.PI / 4));
            const index = (y * 128 + x) * 4;
            weavePixels.set([value, value, value, 255], index);
          }
        }
        const weave = new THREE.DataTexture(weavePixels, 128, 128);
        weave.wrapS = weave.wrapT = THREE.RepeatWrapping;
        weave.repeat.set(12, 16);
        weave.magFilter = THREE.LinearFilter;
        weave.minFilter = THREE.LinearMipmapLinearFilter;
        weave.generateMipmaps = true;
        weave.needsUpdate = true;
        textures.add(weave);
        const paperMaterial = new THREE.MeshStandardMaterial({ color: 0xdedcd3, roughness: 0.96 });
        const clothMaterial = new THREE.MeshStandardMaterial({ color: 0x303631, roughness: 0.9, bumpMap: weave, bumpScale: 0.012 });
        const linerMaterial = new THREE.MeshPhysicalMaterial({ color: 0xe6e3da, roughness: 0.94 });
        const insideLinerMaterial = linerMaterial.clone();
        insideLinerMaterial.side = THREE.BackSide;
        const photoMaterial = (map: InstanceType<typeof THREE.Texture>, side: 0 | 1 | 2 = THREE.FrontSide) => new THREE.MeshPhysicalMaterial({
          map, side, roughness: 0.72, clearcoat: 0.12, clearcoatRoughness: 0.65,
          emissiveMap: map, emissive: 0xffffff, emissiveIntensity: 0.08,
        });
        const width = 3;
        const height = 4;
        const backCover = new THREE.Mesh(new RoundedBoxGeometry(width + 0.12, 0.08, height + 0.12, 3, 0.026), clothMaterial);
        backCover.position.set(width / 2, -0.04, 0);
        backCover.castShadow = true;
        backCover.receiveShadow = true;
        book.add(backCover);
        const leafGeometry = new THREE.BoxGeometry(width - 0.04, 0.007, height - 0.04);
        for (let index = 0; index < 20; index += 1) {
          const leaf = new THREE.Mesh(leafGeometry, paperMaterial);
          leaf.position.set(width / 2 + Math.sin(index * 1.7) * 0.002, 0.009 + index * 0.0085, 0);
          leaf.castShadow = false;
          leaf.receiveShadow = true;
          book.add(leaf);
        }
        const makePage = (material: InstanceType<typeof THREE.MeshPhysicalMaterial>, y: number, pageWidth = width, pageHeight = height, curvature = 0.045) => {
          const geometry = new THREE.PlaneGeometry(pageWidth, pageHeight, 40, 20);
          const positions = geometry.getAttribute("position");
          for (let index = 0; index < positions.count; index += 1) {
            const x = positions.getX(index) + width / 2;
            const z = -positions.getY(index);
            // The paper rises slightly at its bound edge, without free-floating waves.
            const curve = curvature * Math.exp(-x * 4) * (material.side === THREE.BackSide ? -1 : 1);
            positions.setXYZ(index, x, y + curve, z);
          }
          geometry.computeVertexNormals();
          const page = new THREE.Mesh(geometry, material);
          page.castShadow = true;
          page.receiveShadow = true;
          return page;
        };
        book.add(makePage(linerMaterial, 0.179));
        const closingPrint = makePage(photoMaterial(closingMap), 0.184, 2.32, 2.32 * closingMap.image.height / closingMap.image.width);
        closingPrint.position.z = -0.12;
        book.add(closingPrint);
        const hinge = new THREE.Group();
        hinge.position.y = 0.212;
        book.add(hinge);
        const frontCover = new THREE.Mesh(new RoundedBoxGeometry(width + 0.12, 0.064, height + 0.12, 3, 0.022), clothMaterial);
        frontCover.position.set(width / 2, 0, 0);
        frontCover.castShadow = true;
        frontCover.receiveShadow = true;
        hinge.add(frontCover);
        const coverPrint = makePage(photoMaterial(coverMap), 0.036, 2.08, 2.08 * coverMap.image.height / coverMap.image.width, 0);
        coverPrint.position.z = 0.16;
        coverPrint.castShadow = false;
        hinge.add(coverPrint);
        hinge.add(makePage(insideLinerMaterial, -0.04));
        const leftPrint = makePage(photoMaterial(leftMap, THREE.BackSide), -0.046, 2.76, 3.68);
        leftPrint.position.z = -0.025;
        hinge.add(leftPrint);

        type MovingSurface = { mesh: InstanceType<typeof THREE.Mesh>; original: Float32Array; back: boolean };
        const makeLeaf = (frontMap: InstanceType<typeof THREE.Texture>, backMap: InstanceType<typeof THREE.Texture> | null, fullSpread: boolean, layer: number) => {
          const surfaces: MovingSurface[] = [];
          const addSurface = (map: InstanceType<typeof THREE.Texture> | null, back: boolean, print: boolean) => {
            let w = print ? (fullSpread && !back ? 2.76 : 2.32) : width;
            const image = map?.image as HTMLImageElement | undefined;
            const ratio = image ? image.height / image.width : 1;
            const h = print ? (fullSpread && !back ? 3.68 : Math.min(3.36, w * ratio)) : height;
            if (print && !(fullSpread && !back)) w = h / ratio;
            const geometry = new THREE.PlaneGeometry(w, h, mobile ? 32 : 48, mobile ? 12 : 20);
            const original = new Float32Array(geometry.getAttribute("position").array);
            const material = map ? photoMaterial(map, back ? THREE.BackSide : THREE.FrontSide) : new THREE.MeshPhysicalMaterial({ color: 0xe6e3da, roughness: 0.94, side: back ? THREE.BackSide : THREE.FrontSide });
            if (map && back) {
              const reversed = map.clone();
              reversed.offset.x = 1;
              reversed.repeat.x = -1;
              textures.add(reversed);
              material.map = reversed;
              material.emissiveMap = reversed;
            }
            const mesh = new THREE.Mesh(geometry, material);
            mesh.castShadow = !print;
            mesh.receiveShadow = true;
            book.add(mesh);
            surfaces.push({ mesh, original, back });
          };
          addSurface(null, false, false);
          addSurface(null, true, false);
          addSurface(frontMap, false, true);
          if (backMap) addSurface(backMap, true, true);
          let previous = -1;
          return (turn: number) => {
            if (turn === previous) return;
            previous = turn;
            surfaces.forEach(({ mesh, original, back }, surfaceIndex) => {
              const positions = mesh.geometry.getAttribute("position");
              const thickness = (back ? -1 : 1) * (surfaceIndex > 1 ? 0.006 : 0.002);
              for (let index = 0; index < positions.count; index += 1) {
                const point = pagePoint(original[index * 3] + width / 2, -original[index * 3 + 1], turn, layer + (layer === 0.012 ? turn * 0.04 : 0));
                positions.setXYZ(index, point.x - Math.sin(turn * Math.PI) * thickness, point.y + Math.cos(turn * Math.PI) * thickness, point.z);
              }
              positions.needsUpdate = true;
              mesh.geometry.computeVertexNormals();
              mesh.geometry.computeBoundingBox();
              mesh.geometry.computeBoundingSphere();
            });
          };
        };
        // Lower leaf turns second; each reverse carries the next spread's left page.
        const turnSecond = makeLeaf(detailMap, null, false, 0.012);
        const turnFirst = makeLeaf(rightMap, portraitMap, true, 0.024);

        // Typography is printed on the cloth, separate from the untouched photograph.
        const titleCanvas = document.createElement("canvas");
        titleCanvas.width = 1024;
        titleCanvas.height = 180;
        const titleContext = titleCanvas.getContext("2d");
        if (titleContext) {
          titleContext.fillStyle = "#e6e3da";
          titleContext.textAlign = "center";
          titleContext.font = "500 84px sans-serif";
          titleContext.fillText("FIELD NOTES", 512, 85);
          titleContext.font = "400 28px sans-serif";
          titleContext.fillText("DONGGI YOON / VISUAL ARCHIVE", 512, 144);
          const titleMap = new THREE.CanvasTexture(titleCanvas);
          titleMap.colorSpace = THREE.SRGBColorSpace;
          titleMap.anisotropy = texture.anisotropy;
          textures.add(titleMap);
          const titleMaterial = new THREE.MeshPhysicalMaterial({ map: titleMap, transparent: true, roughness: 0.88, depthWrite: false });
          const title = makePage(titleMaterial, 0.038, 2.52, 0.443, 0);
          title.position.z = -1.66;
          title.castShadow = false;
          hinge.add(title);
        }
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
        const ambient = new THREE.HemisphereLight(0xf4f4f1, 0x444b45, 2.4);
        const key = new THREE.DirectionalLight(0xfffaf3, 2.7);
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
        // Fit the whole sequence once: page turns must not drive camera zoom or panning.
        const poseBounds = new THREE.Box3();
        for (let sample = 0; sample <= 24; sample += 1) {
          const pose = bookSequence(sample / 24);
          hinge.rotation.z = THREE.MathUtils.lerp(0.035, Math.PI + 0.088, pose.opening);
          turnFirst(pose.firstTurn);
          turnSecond(pose.secondTurn);
          book.updateMatrixWorld(true);
          bounds.union(poseBounds.setFromObject(book));
        }
        const center = new THREE.Vector3();
        const corner = new THREE.Vector3();
        const offset = new THREE.Vector3();
        const direction = new THREE.Vector3();
        const right = new THREE.Vector3();
        const up = new THREE.Vector3();
        let shownSpread = 0;
        const renderScene = () => {
          const { opening, firstTurn, secondTurn, spread: nextSpread } = bookSequence(currentProgress);
          hinge.rotation.z = THREE.MathUtils.lerp(0.035, Math.PI + 0.088, opening);
          turnFirst(firstTurn);
          turnSecond(secondTurn);
          direction.set(0.6, viewportWidth <= 800 ? 13 : 10, 6.5).normalize();
          right.crossVectors(new THREE.Vector3(0, 1, 0), direction).normalize();
          up.crossVectors(direction, right).normalize();
          if (shownSpread !== nextSpread) { shownSpread = nextSpread; setSpread(nextSpread); }
          canvas.dataset.spread = String(nextSpread);
          canvas.dataset.progress = currentProgress.toFixed(3);
          book.updateMatrixWorld(true);
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
          currentProgress = advanceBook(currentProgress, targetProgress, delta);
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
          <p className={styles.spatialIntroduction}>가을빛의 서도역에서 도시의 저녁까지.</p>
        </div>
        <div className={styles.spatialFallback}>
          <Image src={photograph} alt="가을빛이 머문 서도역 앞을 오가는 사람들" width={1600} height={1067} sizes="(max-width: 800px) 90vw, 80vw" />
        </div>
        <canvas ref={canvasRef} className={styles.spatialCanvas} aria-hidden="true" />
        <div ref={captionRef} className={styles.spatialCaption}>
          <p>{sceneState === "fallback" ? photoBook.captions[1] : photoBook.captions[spread]}<span>Photography / Donggi Yoon</span></p>
          <Link href="/works/dk4film-photo-archive/">사진 작업 보기 <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
      <p className="sr-only">앙코르의 빛을 담은 표지, 서도역의 가을 풍경, 역으로 향하는 사람들과 밤의 도로, 해 질 무렵의 도시로 이어지는 가상 사진집입니다. 같은 사진은 사진 작업 페이지에서도 볼 수 있습니다.</p>
    </section>
  );
}
