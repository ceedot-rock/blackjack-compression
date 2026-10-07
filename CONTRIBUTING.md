# Contributing to blackjack-compression

Thanks for helping keep this integer and byte compressor honest.

## Ground rules

- The round-trip invariant is the whole contract:
  `decompress(compress(x))` must deep-equal `x` for every codec path
  (Fib, Rice, Elias ω, Δ², Combinadic, LZ77).
- Pure JavaScript only. No native addons, no new dependencies.
- Node >= 18.

## Quick checks (before you open a PR)

```sh
npm test                                # selfTest() must return true
node examples/ints.mjs                  # integer examples run clean
node examples/bytes.mjs                 # byte examples run clean
```

CI runs the same three checks on every pull request.

## Changing a codec path

1. Change `index.js` only (plus docs if behavior changes).
2. Add round-trip cases to `selfTest()` in `index.js` covering the path.
3. Run the quick checks. All green or it does not ship.
4. Open a pull request using the template.

## Licensing

blackjack-compression is **GPL-3.0-only**. By contributing you agree your
contribution is distributed under the GNU General Public License v3.
Closed-source distribution of the whole needs a written commercial
exception from Slid Phi Labs (see COMMERCIAL.md) — that exception is not
something a contribution can grant.
