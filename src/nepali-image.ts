import { speech } from "./speech";
export function createNepaliImage(page: number = 0): Uint8Array {
  const width = 288;
  const height = 144;
  const words = speech.trim().split(/\s+/);
  const lines: string[] = [];
  let currentLine = "";
  const maxTextWidth = 272;

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
  ctx.font = "18px sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  for (const word of words) {
    const testLine = currentLine ? currentLine + " " + word : word;
    const textWidth = ctx.measureText(testLine).width;
    if (textWidth <= maxTextWidth) {
  currentLine = testLine;
    } else {
  lines.push(currentLine);
  currentLine = word;
}
  }
  if (currentLine) {
  lines.push(currentLine);
  }
  const pageLines = lines.slice(page * 8, page * 8 + 8);
  pageLines.forEach((line, index) => {
  ctx.fillText(line, 8, 4 + index * 17, 272);
});
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
