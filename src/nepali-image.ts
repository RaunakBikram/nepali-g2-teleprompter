
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
  ctx.font = "bold 18px sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "top;
  ctx.fillText("चुनावमा मिठो बोलेर जनतालाई फस्लाई", 8, 8, 272);
  ctx.fillText("सत्तामा बस्नु भएको श्री भौमानलाई", 8, 34, 272);
  ctx.fillText("मेरो प्रणाम। बल्ल एउटा राम्रो काम", 8, 60, 272);
  ctx.fillText("गर्नु भयो। पत्रकारितको नाममा", 8, 86, 272);
  ctx.fillText("ब्ल्याकमेलिङ गर्दै कमाउँदै आएको", 8, 112, 272);
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
