# Why Blackjack?

**Blackjack** is a family of pure-JS integer codecs optimized for values that **stay put**, **walk by ±1**, or follow a **smooth second difference** (Δ²) — the shapes you get from sensors, counters, game scores, and many time series.

## The idea

Classic Fibonacci / Zeckendorf codes are solid for arbitrary non‑negative integers. Blackjack layers **short operation codes** on top of that stream:

| Op | Meaning | Cost |
|----|---------|------|
| **repeat** | same as previous | 1 bit (variant C) |
| **inc / dec** | prev ± 1 | a few bits |
| **d2 (Δ²)** | continue linear slope | short code |
| **rice** | small residual around slope | Rice(k) |
| **normal** | full integer (Fib or Elias ω) | longer |

So a walk like `100, 100, 101, 102, 103, 102` spends most of its budget on ops, not full re-encodes of each value.

## How v4 fits together

1. **Adaptive header** — pick best of variants C / E / I / G / R for the series.  
2. **Rice k** — estimated from second-difference residuals.  
3. **Elias ω** — escape hatch for huge integers beyond the Fib LUT.  
4. **Combinadic sets** — dense encoding of *unique sorted* ID sets.  
5. **LZ77 file path** — general bytes → match/literal tokens → int streams → Blackjack.

Sister package **slid-phi** attacks a different cut: *known pathways* (universe / gaps / dense / interp…) for list statistics. Use **slid-phi** when you know the distribution; use **Blackjack** when you want an adaptive general series/file codec in pure JS.

## What it improves

- Smaller **on-device** blobs (progress, saves, logs) without native addons.  
- Cheaper **agent / API** payloads that are mostly ints or JSON-ish.  
- A **TSDB-friendly** block codec (`shard-tsdb` / `shard-zip`).

## What it is not

- Not a drop-in for **gzip/zstd** on the public web.  
- Not for already-compressed media or crypto-random data.  
- Ratio is **data-dependent** — always measure on *your* traces; RT is the contract.

## Donate / support

- Donate $29.99: https://buy.stripe.com/eVq9AUd7D0OY0CVdAQ6wE0a  
- Support + Integration $199: https://buy.stripe.com/7sYbJ27NjfJSbhz8gw6wE09  

Site: https://slidphilabs.vercel.app  
