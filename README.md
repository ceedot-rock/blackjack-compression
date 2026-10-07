# blackjack-compression

[![Audited checks](https://github.com/ceedot-rock/blackjack-compression/actions/workflows/audited-checks.yml/badge.svg)](https://github.com/ceedot-rock/blackjack-compression/actions/workflows/audited-checks.yml)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

**GNU GPLv3** public library from [Slid Phi Labs](https://www.slidphilabs.com).

This repository is a historical open-source integer/byte compressor. It is **not** the hosted **PCC** compressor. AWARE is a retired alias. The lab product catalog is on [slidphilabs.com/products](https://www.slidphilabs.com/products).

The npm package `blackjack-compression` on the public registry is a **stub** that talks to the hosted API. This git tree is the GPLv3 library.

---

**GNU GPLv3** · pure JavaScript integer & byte compression (Blackjack v4).

Fib ops · Rice · Elias ω · Δ² · Combinadic sets · LZ77 file path. Full encode/decode round-trip.

## Install

```bash
npm install blackjack-compression
```

## Quick start

```js
import { compress, decompress, selfTest } from "blackjack-compression";

const ints = [0, 1, 2, 3, 4, 3, 2, 1];
const packed = compress(ints);
const back = decompress(packed);
console.log(back, selfTest());
```

## License & credit

Licensed under the **GNU General Public License v3**. Keep copyright and `NOTICE` attribution. Closed-source distribution needs a [written exception](COMMERCIAL.md). $199 support is help, not a PCC seat.

© 2026 Slid Phi Labs / Corey Tasz

## Support / funding

This library is free. Paid support, custom integration, and the separate commercial product line live at [slidphilabs.com](https://www.slidphilabs.com). Sponsors: see `funding` in `package.json`.

> **Scope:** This package is historical open-source Blackjack tooling. It is **not** the current Slid Phi Labs public product stack (PCC / private encoder stay separate).
