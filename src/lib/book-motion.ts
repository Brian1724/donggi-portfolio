export const bookPhase = (progress: number, from: number, to: number) => {
  const t = Math.max(0, Math.min(1, (progress - from) / (to - from)));
  return t * t * (3 - 2 * t);
};

export function bookSequence(progress: number) {
  return {
    opening: bookPhase(progress, 0.12, 0.34),
    firstTurn: bookPhase(progress, 0.5, 0.66),
    secondTurn: bookPhase(progress, 0.77, 0.91),
    exit: bookPhase(progress, 0.93, 1),
    spread: progress < 0.25 ? 0 : progress < 0.6 ? 1 : progress < 0.85 ? 2 : 3,
  };
}

// Integrate the tangent along the sheet: the spine stays fixed and the outer
// edge describes an arc, rather than stretching a rectangle or waving like cloth.
export function pagePoint(x: number, z: number, progress: number, layer = 0) {
  const t = Math.max(0, Math.min(1, progress));
  const angle = t * Math.PI;
  const bend = Math.sin(angle) * 0.48 / 3;
  const px = bend > 0.00001 ? (Math.sin(angle + bend * x) - Math.sin(angle)) / bend : x * Math.cos(angle);
  const lift = bend > 0.00001 ? (Math.cos(angle) - Math.cos(angle + bend * x)) / bend : x * Math.sin(angle);
  const rest = (1 - t) * (0.186 + 0.022 * Math.exp(-x * 4)) + t * (0.28 - x * 0.065);
  return { x: px, y: rest + lift + layer, z };
}
