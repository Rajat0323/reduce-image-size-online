self.onmessage = async (e) => {
  const { file, quality } = e.data;

  const bitmap = await createImageBitmap(file);
  const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
  const ctx = canvas.getContext("2d");

  ctx.drawImage(bitmap, 0, 0);

  const blob = await canvas.convertToBlob({
    type: "image/jpeg",
    quality: quality / 100
  });

  self.postMessage(blob);
};
