# blackjack-compression

[![npm](https://img.shields.io/npm/v/blackjack-compression)](https://www.npmjs.com/package/blackjack-compression)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Node](https://img.shields.io/node/v/blackjack-compression)](https://nodejs.org)
[![site](https://img.shields.io/badge/site-slidphilabs.vercel.app-blue)](https://slidphilabs.vercel.app)

**Blackjack v4** — pure JS integer & byte compression with full **encode/decode round-trip**.

Fib ops (repeat / ±1 / Δ²) + **Rice** + **Elias ω** + **Combinadic** set coding + **LZ77 file** path.

| | |
|--|--|
| **npm** | [`blackjack-compression`](https://www.npmjs.com/package/blackjack-compression) |
| **version** | **1.3.4** |
| **site** | [slidphilabs.vercel.app](https://slidphilabs.vercel.app) |
| **license** | [MIT](./LICENSE) |

---

## Install

```bash
npm i blackjack-compression
```

Node **≥ 18**. ESM only (`"type": "module"`).

```js
import {
  compress,
  decompress,
  compressBytes,
  decompressBytes,
  compressFileV3,
  decompressFileV3,
  compressSet,
  decompressSet,
  selfTest,
  BlackjackCodec,
  AdaptiveCodec,
} from "blackjack-compression";
```

---

## Donate to SlidPhiLabs

MIT open source. If this helps your stack, consider a **one-time $29.99 donation** supporting SlidPhiLabs compression research.

**→ [Donate $29.99](https://buy.stripe.com/eVq9AUd7D0OY0CVdAQ6wE0a)**

Also: [Support + Integration $199](https://buy.stripe.com/7sYbJ27NjfJSbhz8gw6wE09) · [Consulting $250](https://buy.stripe.com/eVqfZi0kR41a4TbgN26wE02)

---

## Quick start

### Integer lists (primary)

```js
import { compress, decompress } from "blackjack-compression";

const values = [100, 100, 101, 102, 100, 99, 98];
const wire = compress(values);       // Uint8Array
const back = decompress(wire);       // number[]
console.log(back);                   // same as values
```

Best on **runs**, **±1 walks**, and **smooth second differences** (Δ²). Random large ints still round-trip; ratio may not beat generic codecs.

### Bytes (delta-mapped)

```js
import { compressBytes, decompressBytes } from "blackjack-compression";

const raw = new TextEncoder().encode("hello ".repeat(80));
const packed = compressBytes(raw);
const out = decompressBytes(packed);
// out is Uint8Array equal to raw
```

### Files / buffers (LZ77 + Blackjack streams)

```js
import { compressFileV3, decompressFileV3 } from "blackjack-compression";
import { readFileSync, writeFileSync } from "node:fs";

const data = readFileSync("input.bin");
const packed = compressFileV3(data);
writeFileSync("input.bin.bjc", packed);

const restored = decompressFileV3(readFileSync("input.bin.bjc"));
```

### Unique sorted sets (combinadic)

```js
import { compressSet, decompressSet } from "blackjack-compression";

const ids = [1, 5, 10, 100, 1000];
const wire = compressSet(ids);
const back = decompressSet(wire); // sorted unique ints
```

### Self-test

```bash
npm test
# or
node -e "import('blackjack-compression').then(m => process.exit(m.selfTest() ? 0 : 1))"
```

---

## API reference

| Export | Role |
|--------|------|
| `compress(values: number[]): Uint8Array` | Adaptive Blackjack v4 over non-negative-friendly int streams |
| `decompress(buf: Uint8Array): number[]` | Inverse of `compress` |
| `compressBytes(bytes: Uint8Array): Uint8Array` | Byte stream via per-byte deltas + `compress` |
| `decompressBytes(buf: Uint8Array): Uint8Array` | Inverse of `compressBytes` |
| `compressFileV3(bytes: Uint8Array): Uint8Array` | LZ77 tokens → separate int streams → packed frame |
| `decompressFileV3(buf: Uint8Array): Uint8Array` | Inverse of `compressFileV3` |
| `compressSet(uniqueSortedInts): Uint8Array` | Combinadic ranking of sets |
| `decompressSet(buf): number[]` | Inverse of `compressSet` |
| `BlackjackCodec` | Fixed variant (`C`/`E`/`I`/`G`/`R`) + Rice `k` |
| `AdaptiveCodec` | Picks best variant header (same as `compress` path) |
| `selfTest(): boolean` | Built-in round-trip suite |
| `zigzag` / `unzigzag` / `encodeRiceBits` / `encodeOmegaBits` / `optimalRiceK` | Low-level helpers |

**Wire notes**

- `compress` / `compressBytes` bitstreams: little-endian bit length `u32` + packed bits (see `packBits` in source).
- `compressFileV3`: header `origLen, typeLen, litLen, distLen, lenLen` (5× `u32` LE) + four sub-streams.

---

## When to use / not use

| Use | Avoid |
|-----|--------|
| Sensor walks, counters, scores | Already-compressed media |
| Repetitive text/logs as bytes | Cryptographic randomness |
| Sorted ID sets (`compressSet`) | Need gzip/zstd interoperability |
| Pure JS (browser or Node) | Huge cold archives (use zstd) |

Sister packages: [`slid-phi`](https://www.npmjs.com/package/slid-phi) (int pathway codec), [`shard-zip`](https://www.npmjs.com/package/shard-zip), [`shard-tsdb`](https://www.npmjs.com/package/shard-tsdb).

---

## Examples

```bash
node examples/ints.mjs
node examples/bytes.mjs
node examples/file-cli.mjs path/to/file
```

See [`examples/`](./examples/).

---

## Benchmarks (indicative)

Run your own on target data. Rough ratios on this stack’s design targets:

| Shape | Expectation |
|-------|-------------|
| Long runs / ±1 walks | Strong (Fib ops + Rice) |
| Smooth second differences | Δ² path helps |
| Unique sparse sets | Combinadic path |
| High-entropy bytes | Weak / expansion possible |

Always verify with `decompress*` — RT is the contract; ratio is data-dependent.

---

## Version

- **1.3.x** — Blackjack v4 + full RT (`compress`/`decompress`, bytes, file V3, sets)
- Homepage: https://slidphilabs.vercel.app

---

## License

MIT — see [LICENSE](./LICENSE).
