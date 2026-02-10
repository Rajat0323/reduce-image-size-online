self.onmessage = async function (e) {
  const { file, quality, format, width, height, maintainRatio } = e.data;

  try {
    const bitmap = await createImageBitmap(file);

    let newWidth = width || bitmap.width;
    let newHeight = height || bitmap.height;

    if (maintainRatio && width && !height) {
      newHeight = (bitmap.height / bitmap.width) * width;
    }

    // Create normal canvas (safer than OffscreenCanvas)
    const canvas = new OffscreenCanvas(newWidth, newHeight);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(bitmap, 0, 0, newWidth, newHeight);

    const blob = await canvas.convertToBlob({
      type: format,
      quality: quality,
    });

    self.postMessage({
      success: true,
      blob,
      size: blob.size,
    });
  } catch (error) {
    self.postMessage({
      success: false,
      error: error.message,
    });
  }
};
