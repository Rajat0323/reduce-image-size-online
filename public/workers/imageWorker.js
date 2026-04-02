function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getDimensions(bitmap, width, height, maintainRatio, scale) {
  const scaledWidth = Math.max(1, Math.round(bitmap.width * scale));
  const scaledHeight = Math.max(1, Math.round(bitmap.height * scale));

  let nextWidth = width || scaledWidth;
  let nextHeight = height || scaledHeight;

  if (maintainRatio) {
    if (width && !height) {
      nextHeight = Math.max(1, Math.round((bitmap.height / bitmap.width) * width));
    } else if (height && !width) {
      nextWidth = Math.max(1, Math.round((bitmap.width / bitmap.height) * height));
    }
  }

  return {
    width: Math.max(1, Math.round(nextWidth)),
    height: Math.max(1, Math.round(nextHeight)),
  };
}

async function renderBitmap(bitmap, options) {
  const dimensions = getDimensions(
    bitmap,
    options.width,
    options.height,
    options.maintainRatio,
    options.scale
  );

  const canvas = new OffscreenCanvas(dimensions.width, dimensions.height);
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Canvas context is not available");
  }

  ctx.drawImage(bitmap, 0, 0, dimensions.width, dimensions.height);

  const blob = await canvas.convertToBlob({
    type: options.format,
    quality: options.quality,
  });

  return {
    blob,
    size: blob.size,
    width: dimensions.width,
    height: dimensions.height,
    quality: options.quality,
  };
}

function storeCandidate(result, targetBytes, bucket) {
  const distance = Math.abs(result.size - targetBytes);
  const next = { ...result, distance };

  if (result.size <= targetBytes) {
    if (!bucket.bestUnder || result.size > bucket.bestUnder.size) {
      bucket.bestUnder = next;
    }
  }

  if (!bucket.bestOverall || distance < bucket.bestOverall.distance) {
    bucket.bestOverall = next;
  }
}

async function compressToTarget(bitmap, options) {
  const targetBytes = options.targetSizeKB * 1024;
  const userLockedDimensions = Boolean(options.width || options.height);
  const qualityAdjustable =
    options.format === "image/jpeg" || options.format === "image/webp";

  const bucket = {
    bestUnder: null,
    bestOverall: null,
  };

  let scale = 1;

  for (let scaleAttempt = 0; scaleAttempt < 5; scaleAttempt += 1) {
    if (qualityAdjustable) {
      let low = 0.05;
      let high = clamp(options.quality, 0.1, 0.98);

      for (let iteration = 0; iteration < 7; iteration += 1) {
        const quality = clamp((low + high) / 2, 0.05, 0.98);
        const result = await renderBitmap(bitmap, {
          ...options,
          quality,
          scale,
        });

        storeCandidate(result, targetBytes, bucket);

        if (result.size > targetBytes) {
          high = quality - 0.01;
        } else {
          low = quality + 0.01;
        }
      }

      const maxQualityResult = await renderBitmap(bitmap, {
        ...options,
        quality: clamp(options.quality, 0.1, 0.98),
        scale,
      });

      storeCandidate(maxQualityResult, targetBytes, bucket);
    } else {
      const result = await renderBitmap(bitmap, {
        ...options,
        scale,
      });

      storeCandidate(result, targetBytes, bucket);
    }

    if (bucket.bestUnder || userLockedDimensions) {
      break;
    }

    scale *= 0.9;
  }

  const finalResult = bucket.bestUnder || bucket.bestOverall;

  if (!finalResult) {
    throw new Error("Unable to generate a compressed image");
  }

  return {
    ...finalResult,
    targetSizeKB: options.targetSizeKB,
    targetReached: finalResult.size <= targetBytes,
  };
}

async function cropBitmap(bitmap, options) {
  const canvas = new OffscreenCanvas(options.cropArea.width, options.cropArea.height);
  const ctx = canvas.getContext("2d");

  if (!ctx) throw new Error("Canvas context is not available");

  ctx.drawImage(
    bitmap,
    options.cropArea.x,
    options.cropArea.y,
    options.cropArea.width,
    options.cropArea.height,
    0,
    0,
    options.cropArea.width,
    options.cropArea.height
  );

  const blob = await canvas.convertToBlob({
    type: options.format,
    quality: options.quality,
  });

  return {
    blob,
    size: blob.size,
    width: options.cropArea.width,
    height: options.cropArea.height,
    quality: options.quality,
  };
}

async function rotateFlipBitmap(bitmap, options) {
  const radians = (options.rotation * Math.PI) / 180;
  const swapAxis = Math.abs(options.rotation) % 180 !== 0;
  
  const width = swapAxis ? bitmap.height : bitmap.width;
  const height = swapAxis ? bitmap.width : bitmap.height;

  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext("2d");

  if (!ctx) throw new Error("Canvas context is not available");

  ctx.translate(width / 2, height / 2);
  ctx.scale(options.flipX ? -1 : 1, options.flipY ? -1 : 1);
  ctx.rotate(radians);
  ctx.drawImage(bitmap, -bitmap.width / 2, -bitmap.height / 2);

  const blob = await canvas.convertToBlob({
    type: options.format,
    quality: options.quality,
  });

  return {
    blob,
    size: blob.size,
    width,
    height,
    quality: options.quality,
  };
}

function sampleBackgroundColor(data, width, height) {
  const samples = [];
  const stepX = Math.max(1, Math.round(width / 24));
  const stepY = Math.max(1, Math.round(height / 24));

  for (let x = 0; x < width; x += stepX) {
    samples.push((x + 0 * width) * 4);
    samples.push((x + (height - 1) * width) * 4);
  }

  for (let y = 0; y < height; y += stepY) {
    samples.push((0 + y * width) * 4);
    samples.push((width - 1 + y * width) * 4);
  }

  const total = samples.reduce(
    (acc, point) => {
      acc.r += data[point];
      acc.g += data[point + 1];
      acc.b += data[point + 2];
      return acc;
    },
    { r: 0, g: 0, b: 0 }
  );

  return {
    r: total.r / samples.length,
    g: total.g / samples.length,
    b: total.b / samples.length,
  };
}

function colorDistance(data, idx, target) {
  const dr = data[idx] - target.r;
  const dg = data[idx + 1] - target.g;
  const db = data[idx + 2] - target.b;

  return Math.sqrt(dr * dr + dg * dg + db * db);
}

function parseHexColor(value) {
  if (!value || value === "transparent") {
    return null;
  }

  const normalized = value.replace("#", "");
  const hex =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => char + char)
          .join("")
      : normalized;

  if (hex.length !== 6) {
    return null;
  }

  return {
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16),
  };
}

async function removeBackgroundBitmap(bitmap, options) {
  const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
  const ctx = canvas.getContext("2d");

  if (!ctx) throw new Error("Canvas context is not available");

  ctx.drawImage(bitmap, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const background = sampleBackgroundColor(imageData.data, canvas.width, canvas.height);
  const threshold = Math.max(10, options.tolerance);
  const visited = new Uint8Array(canvas.width * canvas.height);
  const queue = [];

  function enqueue(x, y) {
    const idx = y * canvas.width + x;
    if (visited[idx]) {
      return;
    }

    const pixelIdx = idx * 4;
    if (colorDistance(imageData.data, pixelIdx, background) > threshold) {
      return;
    }

    visited[idx] = 1;
    queue.push(idx);
  }

  for (let x = 0; x < canvas.width; x += 1) {
    enqueue(x, 0);
    enqueue(x, canvas.height - 1);
  }

  for (let y = 0; y < canvas.height; y += 1) {
    enqueue(0, y);
    enqueue(canvas.width - 1, y);
  }

  while (queue.length > 0) {
    const current = queue.shift();
    const x = current % canvas.width;
    const y = Math.floor(current / canvas.width);
    const pixelIdx = current * 4;

    imageData.data[pixelIdx + 3] = 0;

    if (x > 0) enqueue(x - 1, y);
    if (x < canvas.width - 1) enqueue(x + 1, y);
    if (y > 0) enqueue(x, y - 1);
    if (y < canvas.height - 1) enqueue(x, y + 1);
  }

  for (let y = 1; y < canvas.height - 1; y += 1) {
    for (let x = 1; x < canvas.width - 1; x += 1) {
      const idx = y * canvas.width + x;
      if (visited[idx]) {
        continue;
      }

      const pixelIdx = idx * 4;
      const nearBackground =
        visited[idx - 1] ||
        visited[idx + 1] ||
        visited[idx - canvas.width] ||
        visited[idx + canvas.width];

      if (nearBackground) {
        const distance = colorDistance(imageData.data, pixelIdx, background);
        if (distance < threshold + 18) {
          imageData.data[pixelIdx + 3] = Math.max(
            88,
            Math.round((distance / (threshold + 18)) * 255)
          );
        }
      }
    }
  }

  ctx.putImageData(imageData, 0, 0);
  const fill = parseHexColor(options.backgroundColor);
  let outputCanvas = canvas;

  if (fill) {
    const filledCanvas = new OffscreenCanvas(canvas.width, canvas.height);
    const filledCtx = filledCanvas.getContext("2d");

    if (!filledCtx) throw new Error("Canvas context is not available");

    filledCtx.fillStyle = `rgb(${fill.r}, ${fill.g}, ${fill.b})`;
    filledCtx.fillRect(0, 0, filledCanvas.width, filledCanvas.height);
    filledCtx.drawImage(canvas, 0, 0);
    outputCanvas = filledCanvas;
  }

  const blob = await outputCanvas.convertToBlob({ type: "image/png" });

  return {
    blob,
    size: blob.size,
    width: outputCanvas.width,
    height: outputCanvas.height,
    quality: 0.92,
  };
}

function applySharpen(ctx, width, height) {
  const source = ctx.getImageData(0, 0, width, height);
  const output = ctx.createImageData(width, height);
  const weights = [0, -1, 0, -1, 5, -1, 0, -1, 0];
  const side = 3;
  const half = 1;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const destIdx = (y * width + x) * 4;
      for (let c = 0; c < 3; c++) {
        let v = 0;
        for (let ky = 0; ky < side; ky++) {
          for (let kx = 0; kx < side; kx++) {
            const sx = Math.min(width - 1, Math.max(0, x + kx - half));
            const sy = Math.min(height - 1, Math.max(0, y + ky - half));
            v += source.data[(sy * width + sx) * 4 + c] * weights[ky * side + kx];
          }
        }
        output.data[destIdx + c] = Math.min(255, Math.max(0, v));
      }
      output.data[destIdx + 3] = source.data[destIdx + 3];
    }
  }
  ctx.putImageData(output, 0, 0);
}

async function upscaleBitmap(bitmap, options) {
  const width = Math.round(bitmap.width * options.scale);
  const height = Math.round(bitmap.height * options.scale);
  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext("2d");

  if (!ctx) throw new Error("Canvas context is not available");

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(bitmap, 0, 0, width, height);

  if (options.sharpen) applySharpen(ctx, width, height);

  const blob = await canvas.convertToBlob({ type: options.format, quality: options.quality });

  return {
    blob,
    size: blob.size,
    width,
    height,
    quality: options.quality,
  };
}

self.onmessage = async function (e) {
  const { mode, file, quality, format, width, height, maintainRatio, targetSizeKB, cropArea, rotation, flipX, flipY, tolerance, backgroundColor, scale, sharpen } = e.data;

  try {
    const bitmap = await createImageBitmap(file);
    let result;

    if (mode === "crop") {
      result = await cropBitmap(bitmap, { cropArea, format, quality });
    } else if (mode === "rotate-flip") {
      result = await rotateFlipBitmap(bitmap, { rotation, flipX, flipY, format, quality });
    } else if (mode === "background-remover") {
      result = await removeBackgroundBitmap(bitmap, { tolerance, backgroundColor });
    } else if (mode === "upscaler") {
      result = await upscaleBitmap(bitmap, { scale, format, quality, sharpen });
    } else if (targetSizeKB) {
      result = await compressToTarget(bitmap, { quality, format, width, height, maintainRatio, targetSizeKB });
    } else {
      result = await renderBitmap(bitmap, { quality, format, width, height, maintainRatio, scale: 1 });
    }

    self.postMessage({
      success: true,
      blob: result.blob,
      size: result.size,
      width: result.width,
      height: result.height,
      qualityUsed: result.quality,
      targetSizeKB: result.targetSizeKB || null,
      targetReached: result.targetReached || false,
    });
  } catch (error) {
    self.postMessage({ success: false, error: error.message });
  }
};
