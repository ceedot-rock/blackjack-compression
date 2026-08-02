# blackjack-compression

[![npm](https://img.shields.io/npm/v/blackjack-compression)](https://www.npmjs.com/package/blackjack-compression)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Node](https://img.shields.io/node/v/blackjack-compression)](https://nodejs.org)
[![site](https://img.shields.io/badge/site-slidphilabs.vercel.app-blue)](https://slidphilabs.vercel.app)

**Blackjack v4** — pure JS **integer & byte compression** with full **encode/decode round-trip**.

Fib ops (repeat / ±1 / Δ²) + **Rice** + **Elias ω** + **Combinadic** set coding + **LZ77 file** path. Strong on **runs**, **walks**, and **smooth deltas** where generic compressors waste bits.

| | |
|--|--|
| **npm** | [`blackjack-compression@1.3.5`](https://www.npmjs.com/package/blackjack-compression) |
| **demo** | [GitHub Pages](https://ceedot-rock.github.io/blackjack-compression/) |
| **site** | [slidphilabs.vercel.app](https://slidphilabs.vercel.app) |
| **license** | [MIT](./LICENSE) |

---

## Why this exists

Most stacks reach for gzip/brotli for everything. Integer lists from sensors, game state, counters, and sorted IDs have structure those codecs ignore. Blackjack is a **specialized pure-JS lossless codec** for those shapes — no native deps, works in Node and the browser.

For **record ratios on zeros/ramps/walks**, also see sibling **[Zero Range Wave (ZRW) v5](https://github.com/ceedot-rock/zero-range-wave-compression)**.

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

## Quick start

### Integer lists (primary)

```js
import { compress, decompress } from "blackjack-compression";

const values = [100, 100, 101, 102, 100, 99, 98];
const wire = compress(values);       // Uint8Array
const back = decompress(wire);       // number[] — exact RT
```

### Bytes (delta-mapped)

```js
import { compressBytes, decompressBytes } from "blackjack-compression";

const raw = new TextEncoder().encode("hello ".repeat(80));
const packed = compressBytes(raw);
const out = decompressBytes(packed);
```

### Files / buffers (LZ77 + Blackjack streams)

```js
import { compressFileV3, decompressFileV3 } from "blackjack-compression";
import { readFileSync, writeFileSync } from "node:fs";

const data = readFileSync("input.bin");
writeFileSync("input.bin.bjc", compressFileV3(data));
const restored = decompressFileV3(readFileSync("input.bin.bjc"));
```

### Unique sorted sets (combinadic)

```js
import { compressSet, decompressSet } from "blackjack-compression";

const ids = [1, 5, 10, 100, 1000];
const wire = compressSet(ids);
const back = decompressSet(wire);
```

### Self-test

```bash
npm test
```

---

## What to expect (indicative)

| Shape | Expectation |
|-------|-------------|
| Long runs / ±1 walks | Strong (Fib ops + Rice) |
| Smooth second differences | Δ² path helps |
| Unique sparse sets | Combinadic path |
| High-entropy bytes | Weak / expansion possible |

**RT is the contract; ratio is data-dependent.** For zeros/ramps leaderboards, use [ZRW](https://github.com/ceedot-rock/zero-range-wave-compression).

---

## API reference

| Export | Role |
|--------|------|
| `compress(values)` / `decompress(buf)` | Adaptive Blackjack v4 int streams |
| `compressBytes` / `decompressBytes` | Byte stream via per-byte deltas |
| `compressFileV3` / `decompressFileV3` | LZ77 tokens → packed frame |
| `compressSet` / `decompressSet` | Combinadic ranking of sets |
| `BlackjackCodec` / `AdaptiveCodec` | Fixed / adaptive variants |
| `selfTest()` | Built-in round-trip suite |

---

## Donate to SlidPhiLabs

MIT open source. If this helps your stack:

**→ [Donate $29.99](https://buy.stripe.com/eVq9AUd7D0OY0CVdAQ6wE0a)** · [Support $199](https://buy.stripe.com/7sYbJ27NjfJSbhz8gw6wE09) · [Consulting $250](https://buy.stripe.com/eVqfZi0kR41a4TbgN26wE02)

---

## Related packages

| Package | Role |
|---------|------|
| [zero-range-wave-compression](https://github.com/ceedot-rock/zero-range-wave-compression) | ZRW v5 — beats gzip/brotli on zeros/ramps/walks |
| [shard-zip](https://www.npmjs.com/package/shard-zip) | Adaptive Fib + Blackjack V2 + CLI |
| [slid-phi](https://www.npmjs.com/package/slid-phi) | Omni-Dormant integer pathways |
| [shard-tsdb](https://www.npmjs.com/package/shard-tsdb) | TSDB using this family |
| [CuNi Studio](https://cuni-studio.fly.dev/) | Exact multi-target code playground |

Brand home: **[slidphilabs.vercel.app](https://slidphilabs.vercel.app)**

---

## License

MIT — see [LICENSE](./LICENSE).
