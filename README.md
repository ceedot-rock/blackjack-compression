# blackjack-compression

**Apache-2.0** · pure JavaScript integer & byte compression (Blackjack v4).

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

Licensed under the **Apache License, Version 2.0**. You may use this commercially; keep copyright and `NOTICE` attribution.

© 2026 Slid Phi Labs / Corey Tasz

## Support / funding

This library is free. Paid support, custom integration, and the separate commercial product line live at [slidphilabs.com](https://www.slidphilabs.com). Sponsors: see `funding` in `package.json`.

> **Scope:** This package is historical open-source Blackjack tooling. It is **not** the current Slid Phi Labs public product stack (SPL Codec / private engines stay separate and proprietary).
