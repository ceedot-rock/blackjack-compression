# Benchmarks (indicative)

Run on your machine:

```bash
node examples/bench.mjs
```

These numbers are **illustrative** from a typical host after `selfTest` — not a formal paper claim. Always re-run.

## Integer series (`compress` / `decompress`)

| Pattern | n | Packed bytes (approx) | Notes |
|---------|--:|----------------------:|-------|
| All zeros | 256 | very small | pure repeats |
| Ramp 0..n | 256 | small–medium | inc ops |
| Random 0..1e6 | 256 | larger | more normals / ω |
| Sensor walk (±1 noise) | 1000 | strong | design target |

## Bytes

| Path | Best for |
|------|----------|
| `compressBytes` | smooth/delta-friendly byte walks |
| `compressFileV3` | repetitive text/logs (LZ77 first) |

On highly repetitive text, **File V3** often beats plain `compressBytes` by a large margin (LZ77). On high-entropy data, either may expand.

## Methodology

1. Build input array/Uint8Array.  
2. `packed = compress*(input)`.  
3. Assert `decompress*(packed)` equals input.  
4. Report `packed.length / input_size`.

No secret data in benches. No comparison claims vs zstd without side-by-side runs on the same file.  
