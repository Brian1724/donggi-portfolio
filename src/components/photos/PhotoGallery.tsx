"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ResponsiveImage as Image } from "@/components/ResponsiveImage";
import type { ArchiveStill } from "@/data/stills";
import { getWorkMediaHref } from "@/lib/work-media";
import styles from "./PhotoGallery.module.css";

export function PhotoGallery({ items }: { items: ArchiveStill[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const previousOverflowRef = useRef("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selected = selectedIndex === null ? null : items[selectedIndex];

  useEffect(() => {
    const syncFromHash = () => {
      const match = window.location.hash.match(/^#still=(.+)$/);
      const index = match ? items.findIndex((item) => item.id === decodeURIComponent(match[1])) : -1;
      if (index >= 0) setSelectedIndex(index);
      else {
        dialogRef.current?.close();
        setSelectedIndex(null);
      }
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [items]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!selected || !dialog) return;
    previousOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (!dialog.open) dialog.showModal();
    return () => { document.body.style.overflow = previousOverflowRef.current; };
  }, [selected]);

  const exif = useMemo(() => selected ? [
    ["Camera", selected.exif?.camera ?? selected.camera],
    ["Lens", selected.exif?.lens],
    ["Shutter", selected.exif?.shutter],
    ["Aperture", selected.exif?.aperture],
    ["ISO", selected.exif?.iso],
  ].filter((entry): entry is [string, string] => Boolean(entry[1])) : [], [selected]);

  const open = (index: number) => {
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    setSelectedIndex(index);
    setHash(items[index].id);
  };

  const close = () => {
    dialogRef.current?.close();
    setSelectedIndex(null);
    clearHash("still");
    window.requestAnimationFrame(() => lastFocusedRef.current?.focus());
  };

  const move = (offset: number) => {
    if (selectedIndex === null) return;
    const next = (selectedIndex + offset + items.length) % items.length;
    setSelectedIndex(next);
    setHash(items[next].id, true);
  };

  return (
    <>
      <div className={styles.grid}>
        {items.map((still, index) => (
          <figure key={still.id} className={styles.item}>
            <button type="button" className={styles.openButton} onClick={() => open(index)} aria-label={`${index + 1}번 사진, ${still.alt} 크게 보기`}>
              <span className={styles.frame} style={{ aspectRatio: still.ratio }}>
                <Image src={still.src} alt={still.alt} fill sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw" />
              </span>
            </button>
            <figcaption>
              <span aria-label={`${index + 1} — ${still.label.replace(/^[IVX]+\s*—\s*/, "")}`}>{still.label}</span>
              <span>{[still.city, still.country, still.year].filter(Boolean).join(" · ")}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-label={selected?.alt ?? "사진 크게 보기"}
        onCancel={(event) => { event.preventDefault(); close(); }}
        onClose={() => setSelectedIndex(null)}
        onClick={(event) => { if (event.target === event.currentTarget) close(); }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
          if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
        }}
      >
        {selected ? (
          <div className={styles.dialogInner}>
            <button type="button" className={styles.closeButton} onClick={close} aria-label="사진 닫기" title="닫기">×</button>
            <figure>
              <Image src={selected.src} alt={selected.alt} width={ratioPart(selected.ratio, 0)} height={ratioPart(selected.ratio, 1)} sizes="100vw" className={styles.dialogImage} />
              <figcaption>
                <div className={styles.dialogCopy}>
                  <strong>{selected.label}</strong>
                  <span>{selected.alt}</span>
                  {exif.length ? <dl className={styles.exifList}>{exif.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl> : null}
                </div>
                <div className={styles.dialogActions}>
                  <div className={styles.dialogNav} aria-label="사진 이동">
                    <button type="button" onClick={() => move(-1)} aria-label="이전 사진">←</button>
                    <span>{selectedIndex! + 1} / {items.length}</span>
                    <button type="button" onClick={() => move(1)} aria-label="다음 사진">→</button>
                  </div>
                  <Link href={getWorkMediaHref("still", selected.id)} onClick={close}>프로젝트 보기</Link>
                </div>
              </figcaption>
            </figure>
          </div>
        ) : null}
      </dialog>
    </>
  );
}

function setHash(id: string, replace = false) {
  const url = new URL(window.location.href);
  url.hash = `still=${encodeURIComponent(id)}`;
  window.history[replace ? "replaceState" : "pushState"](null, "", url);
}

function clearHash(kind: string) {
  if (!window.location.hash.startsWith(`#${kind}=`)) return;
  const url = new URL(window.location.href);
  url.hash = "";
  window.history.replaceState(null, "", url);
}

function ratioPart(ratio: string, index: number) {
  const parts = ratio.split("/").map((part) => Number(part.trim()));
  const scale = 1800 / Math.max(...parts);
  return Math.max(1, Math.round((parts[index] || 1) * scale));
}
