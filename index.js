/** Proprietary stub — no codec on public npm. https://slidphilabs.vercel.app/access */
const MSG =
  "blackjack-compression is proprietary (SlidPhiLabs). " +
  "Public npm only ships a stub. After purchase or Try Gate, you receive the real package. " +
  "https://slidphilabs.vercel.app/access";

function blocked() {
  throw new Error(MSG);
}

export const compress = blocked;
export const decompress = blocked;
export const compressBytes = blocked;
export const decompressBytes = blocked;
export const compressFileV3 = blocked;
export const decompressFileV3 = blocked;
export const compressSet = blocked;
export const decompressSet = blocked;
export const selfTest = () => false;
export const BlackjackCodec = { compress: blocked, decompress: blocked };
export const AdaptiveCodec = BlackjackCodec;
export default { compress, decompress, compressBytes, decompressBytes, selfTest };

console.warn("[SlidPhiLabs] Stub — no codec source in this package. → https://slidphilabs.vercel.app/access");
