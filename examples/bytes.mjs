/**
 * Byte compress / decompress demo
 *   node examples/bytes.mjs
 */
import { compressBytes, decompressBytes, compressFileV3, decompressFileV3 } from "../index.js";

const text = "the quick brown fox jumps over the lazy dog. ".repeat(100);
const raw = new TextEncoder().encode(text);

const a = compressBytes(raw);
const aBack = decompressBytes(a);
const aOk =
  aBack.length === raw.length && aBack.every((b, i) => b === raw[i]);

const b = compressFileV3(raw);
const bBack = decompressFileV3(b);
const bOk =
  bBack.length === raw.length && bBack.every((x, i) => x === raw[i]);

console.log({
  orig: raw.length,
  compressBytes: { packed: a.length, ratio: (a.length / raw.length).toFixed(3), ok: aOk },
  compressFileV3: { packed: b.length, ratio: (b.length / raw.length).toFixed(3), ok: bOk },
});
