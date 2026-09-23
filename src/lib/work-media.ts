import { films, type Film } from "@/data/films";
import { stills, type ArchiveStill } from "@/data/stills";
import { works, type Work } from "@/data/works";

export type ResolvedWorkMedia =
  | { kind: "film"; item: Film }
  | { kind: "still"; item: ArchiveStill };

export function getWorkForMedia(kind: "film" | "still", id: string) {
  return works.find((work) =>
    work.media.some((reference) => reference.kind === kind && reference.id === id),
  );
}

export function getWorkMediaHref(kind: "film" | "still", id: string) {
  const work = getWorkForMedia(kind, id);
  return work ? `/works/${work.slug}/#${kind}-${id}` : "/works/";
}

export function getResolvedWorkMedia(work: Work): ResolvedWorkMedia[] {
  return work.media.flatMap<ResolvedWorkMedia>((reference) => {
    if (reference.kind === "film") {
      const item = films.find((film) => film.id === reference.id);
      return item ? [{ kind: "film" as const, item }] : [];
    }

    const item = stills.find((still) => still.id === reference.id);
    return item ? [{ kind: "still" as const, item }] : [];
  });
}
