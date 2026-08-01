/**
 * Integer list compress / decompress demo
 *   node examples/ints.mjs
 */
import { compress, decompress, selfTest } from "../index.js";

console.log("selfTest:", selfTest() ? "PASS" : "FAIL");

const samples = [
  [0, 0, 0, 0, 0],
  [0, 1, 2, 3, 4, 5],
  [100, 100, 100, 101, 101, 102, 100],
  [0, 1e6, 1000001, 1000002],
];

for (const values of samples) {
  const wire = compress(values);
  const back = decompress(wire);
  const ok =
    back.length === values.length && back.every((v, i) => v === values[i]);
  const rawBytes = values.length * 8; // rough JSON-ish
  console.log({
    n: values.length,
    packed: wire.length,
    vsFloat64: (wire.length / rawBytes).toFixed(3),
    ok,
    head: values.slice(0, 6),
  });
}
