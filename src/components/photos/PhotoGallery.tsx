"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ArchiveStill } from "@/data/stills";
import { getWorkMediaHref } from "@/lib/work-media";
import styles from "./PhotoGallery.module.css";

export function PhotoGallery({ items }: { items: ArchiveStill[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousOverflowRef = useRef("");
  const [selected, setSelected] = useState<ArchiveStill | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!selected || !dialog) return;

    previousOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (!dialog.open) dialog.showModal();

    return () => {
      document.body.style.overflow = previousOverflowRef.current;
    };
  }, [selected]);

  const close = () => {
    dialogRef.current?.close();
    setSelected(null);
  };

  return (
    <>
      <div className={styles.grid}>
        {items.map((still) => (
          <figure key={still.id} className={styles.item}>
            <button
              type="button"
              className={styles.openButton}
              onClick={() => setSelected(still)}
              aria-label={`${still.alt} 크게 보기`}
            >
              <span className={styles.frame} style={{ aspectRatio: still.ratio }}>
                <Image
                  src={still.src}
                  alt={still.alt}
                  fill
                  sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
                />
              </span>
            </button>
            <figcaption>
              <span>{still.label}</span>
              <span>{[still.city, still.country, still.year].filter(Boolean).join(" · ")}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-label={selected?.alt ?? "사진 크게 보기"}
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClose={() => setSelected(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        {selected ? (
          <div className={styles.dialogInner}>
            <button type="button" className={styles.closeButton} onClick={close} aria-label="사진 닫기" title="닫기">
              ×
            </button>
            <figure>
              <Image
                src={selected.src}
                alt={selected.alt}
                width={ratioPart(selected.ratio, 0)}
                height={ratioPart(selected.ratio, 1)}
                sizes="100vw"
                className={styles.dialogImage}
              />
              <figcaption>
                <div><strong>{selected.label}</strong><span>{selected.alt}</span></div>
                <Link href={getWorkMediaHref("still", selected.id)} onClick={close}>프로젝트 보기</Link>
              </figcaption>
            </figure>
          </div>
        ) : null}
      </dialog>
    </>
  );
}

function ratioPart(ratio: string, index: number) {
  const parts = ratio.split("/").map((part) => Number(part.trim()));
  return Math.max(1, Math.round((parts[index] || 1) * 100));
}
