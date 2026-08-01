/**
 * Tiny CLI: compress or restore a file with compressFileV3
 *
 *   node examples/file-cli.mjs compress input.bin
 *   node examples/file-cli.mjs decompress input.bin.bjc
 */
import { readFileSync, writeFileSync } from "node:fs";
import { compressFileV3, decompressFileV3 } from "../index.js";

const [cmd, input, outArg] = process.argv.slice(2);

if (!cmd || !input || !["compress", "decompress"].includes(cmd)) {
  console.log(`Usage:
  node examples/file-cli.mjs compress <file> [out.bjc]
  node examples/file-cli.mjs decompress <file.bjc> [out.bin]`);
  process.exit(1);
}

const data = readFileSync(input);

if (cmd === "compress") {
  const out = outArg || input + ".bjc";
  const packed = compressFileV3(data);
  writeFileSync(out, packed);
  console.log(
    `compressed ${data.length} → ${packed.length} bytes (${((packed.length / data.length) * 100).toFixed(1)}%) → ${out}`,
  );
} else {
  const out = outArg || input.replace(/\.bjc$/i, "") + ".out";
  const raw = decompressFileV3(data);
  writeFileSync(out, raw);
  console.log(`decompressed ${data.length} → ${raw.length} bytes → ${out}`);
}
