/**
 * Lightweight bench — integers + file path
 *   node examples/bench.mjs
 */
import {
  compress,
  decompress,
  compressBytes,
  decompressBytes,
  compressFileV3,
  decompressFileV3,
  selfTest,
} from "../index.js";

function assertRT(name, ok) {
  if (!ok) throw new Error("RT fail: " + name);
}

console.log("selfTest", selfTest() ? "PASS" : "FAIL");

function intBench(label, values) {
  const t0 = performance.now();
  const wire = compress(values);
  const t1 = performance.now();
  const back = decompress(wire);
  const t2 = performance.now();
  assertRT(
    label,
    back.length === values.length && back.every((v, i) => v === values[i]),
  );
  console.log({
    label,
    n: values.length,
    bytes: wire.length,
    bitsPerVal: ((wire.length * 8) / values.length).toFixed(2),
    encMs: (t1 - t0).toFixed(2),
    decMs: (t2 - t1).toFixed(2),
  });
}

// zeros
intBench(
  "zeros×256",
  Array.from({ length: 256 }, () => 0),
);
// ramp
intBench(
  "ramp0..255",
  Array.from({ length: 256 }, (_, i) => i),
);
// sensor walk
{
  let v = 500;
  const a = [];
  for (let i = 0; i < 1000; i++) {
    v += [-1, 0, 0, 1][(Math.random() * 4) | 0];
    a.push(v);
  }
  intBench("sensorWalk×1000", a);
}
// random
intBench(
  "rand0..1e6×256",
  Array.from({ length: 256 }, () => (Math.random() * 1e6) | 0),
);

const text = new TextEncoder().encode(
  "the quick brown fox jumps over the lazy dog. ".repeat(200),
);
for (const [label, fn, inv] of [
  ["compressBytes/text", compressBytes, decompressBytes],
  ["compressFileV3/text", compressFileV3, decompressFileV3],
]) {
  const t0 = performance.now();
  const wire = fn(text);
  const t1 = performance.now();
  const back = inv(wire);
  const t2 = performance.now();
  assertRT(
    label,
    back.length === text.length && back.every((b, i) => b === text[i]),
  );
  console.log({
    label,
    orig: text.length,
    packed: wire.length,
    ratio: (wire.length / text.length).toFixed(3),
    encMs: (t1 - t0).toFixed(2),
    decMs: (t2 - t1).toFixed(2),
  });
}
