## What changed

<!-- One or two sentences. -->

## Codec surface touched

<!-- e.g. Fib, Rice, Elias ω, Δ², Combinadic, LZ77 path — or "none" -->

## Checks

- [ ] `npm test` passes (`selfTest()` returns true)
- [ ] `node examples/ints.mjs` and `node examples/bytes.mjs` run clean
- [ ] Round-trip holds: `decompress(compress(x))` deep-equals `x` for every
      codec path touched
- [ ] No new dependencies introduced (this package ships zero dependencies)
- [ ] No secrets, keys, or internal lab paths in the diff

<!-- Keep NOTICE attribution intact on redistribution per GPL-3.0-only. -->
