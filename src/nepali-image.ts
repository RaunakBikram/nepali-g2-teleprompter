
export function createNepaliImage(): Uint8Array {
  const width = 288;
  const height = 144;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas unavailable");
  }

  // Black background
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, width, height);

  // Draw Nepali text
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 26px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("नमस्कार नेपाल", 144, 72, 270);

  // Convert pixels to grayscale bytes
  const rgba = ctx.getImageData(0, 0, width, height).data;
  const gray = new Uint8Array(width * height);

  for (let i = 0; i < gray.length; i++) {
    const p = i * 4;
    gray[i] = Math.round(
      0.299 * rgba[p] +
      0.587 * rgba[p + 1] +
      0.114 * rgba[p + 2]
    );
  }

  return gray;
}
