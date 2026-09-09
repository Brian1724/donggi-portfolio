import assert from "node:assert/strict";
import { bookSequence, pagePoint } from "../src/lib/book-motion.ts";

let previous = bookSequence(0);
for (let step = 0; step <= 1000; step += 1) {
  const progress = step / 1000;
  const current = bookSequence(progress);
  for (const key of ["opening", "firstTurn", "secondTurn", "exit"]) {
    assert(current[key] >= previous[key] && current[key] <= 1, `${key} must be bounded and monotonic`);
  }
  assert(current.firstTurn === 0 || current.opening === 1);
  assert(current.secondTurn === 0 || current.firstTurn === 1);
  for (let x = 0; x <= 3; x += 0.125) {
    const point = pagePoint(x, 1, progress);
    assert(Object.values(point).every(Number.isFinite));
    assert.equal(point.z, 1);
    assert(point.y > -0.01 && point.y < 3.5);
    assert(Math.abs(point.x) <= 3.001);
  }
  assert.equal(Math.abs(pagePoint(0, 0, progress).x), 0, "bound edge must not move sideways");
  previous = current;
}
assert.equal(pagePoint(3, 0, 0).x, 3);
assert.equal(pagePoint(3, 0, 1).x, -3);
assert(pagePoint(3, 0, 0.5).y > 2.5, "outer edge must arch over the binding");
assert.equal(bookSequence(1).spread, 3);
console.log("PASS: three spreads, sequential turns, fixed spine axis, finite curved geometry");
