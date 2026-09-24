"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ResponsiveImage as Image } from "@/components/ResponsiveImage";
import type { ArchiveStill } from "@/data/stills";
import styles from "./PhotoGallery.module.css";

type PhotoGroup = { title: string; description: string; items: ArchiveStill[] };

export function PhotoGallery({ groups }: { groups: PhotoGroup[] }) {
  const items = useMemo(() => groups.flatMap((group) => group.items), [groups]);
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
      {groups.map((group, groupIndex) => (
        <section key={group.title} className={styles.sequence} aria-labelledby={`photo-sequence-${groupIndex}`}>
          <div className={styles.sequenceHeading}>
            <div>
              <p>{String(groupIndex + 1).padStart(2, "0")} / PHOTO SEQUENCE</p>
              <h2 id={`photo-sequence-${groupIndex}`}>{group.title}</h2>
            </div>
            <p>{group.description}</p>
          </div>
          <div className={styles.grid}>
            {group.items.map((still) => {
              const index = items.findIndex((item) => item.id === still.id);
              const caption = `${romanNumeral(index + 1)} — ${still.label.replace(/^[IVX]+\s*—\s*/, "")}`;
              return (
                <figure key={still.id} className={styles.item}>
                  <button type="button" className={styles.openButton} onClick={() => open(index)} aria-label={`${index + 1}번 사진, ${still.alt} 크게 보기`}>
                    <span className={styles.frame} style={{ aspectRatio: still.ratio }}>
                      <Image src={still.src} alt={still.alt} fill sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw" />
                    </span>
                  </button>
                  <figcaption>
                    <span aria-label={`${index + 1} — ${still.label.replace(/^[IVX]+\s*—\s*/, "")}`}>{caption}</span>
                    <span>{[...new Set([still.city, still.country, still.year].filter(Boolean))].join(" · ")}</span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </section>
      ))}

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
                  <strong>{romanNumeral(selectedIndex! + 1)} — {selected.label.replace(/^[IVX]+\s*—\s*/, "")}</strong>
                  <span>{selected.alt}</span>
                  {exif.length ? <dl className={styles.exifList}>{exif.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl> : null}
                </div>
                <div className={styles.dialogActions}>
                  <div className={styles.dialogNav} aria-label="사진 이동">
                    <button type="button" onClick={() => move(-1)} aria-label="이전 사진">←</button>
                    <span>{selectedIndex! + 1} / {items.length}</span>
                    <button type="button" onClick={() => move(1)} aria-label="다음 사진">→</button>
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
        ) : null}
      </dialog>
    </>
  );
}

function romanNumeral(index: number) {
  return ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"][index - 1] ?? String(index);
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
