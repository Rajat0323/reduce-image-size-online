export type ProcessedImage = {
  blob: Blob;
  url: string;
  width: number;
  height: number;
};

export type CropArea = {
  x: number;
  y: number;
  width: number;
  height: number;
};

async function fileToImage(file: File) {
  const objectUrl = URL.createObjectURL(file);

  try {
    const image = new Image();
    image.decoding = "async";
    image.src = objectUrl;
    await image.decode();
    return image;
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

function makeCanvas(width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality = 0.92) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Unable to create image blob"));
          return;
        }

        resolve(blob);
      },
      type,
      quality
    );
  });
}

async function exportCanvas(canvas: HTMLCanvasElement, type: string, quality = 0.92) {
  const blob = await canvasToBlob(canvas, type, quality);
  return {
    blob,
    url: URL.createObjectURL(blob),
    width: canvas.width,
    height: canvas.height,
  };
}

export async function compressImageFile(
  file: File,
  options: { quality: number; format: string; targetKB?: number; width?: number; height?: number }
) {
  const image = await fileToImage(file);
  const width = options.width || image.naturalWidth;
  const height = options.height || image.naturalHeight;
  const canvas = makeCanvas(width, height);
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Canvas context is not available");
  }

  ctx.drawImage(image, 0, 0, width, height);

  let quality = options.quality;
  let bestBlob = await canvasToBlob(canvas, options.format, quality);

  if (options.targetKB) {
    let low = 0.1;
    let high = quality;
    let bestUnderTarget: Blob | null = bestBlob.size <= options.targetKB * 1024 ? bestBlob : null;

    for (let index = 0; index < 7; index += 1) {
      quality = (low + high) / 2;
      const blob = await canvasToBlob(canvas, options.format, quality);

      if (blob.size <= options.targetKB * 1024) {
        bestUnderTarget = blob;
        low = quality;
      } else {
        high = quality;
      }

      bestBlob = blob;
    }

    if (bestUnderTarget) {
      bestBlob = bestUnderTarget;
    }
  }

  return {
    blob: bestBlob,
    url: URL.createObjectURL(bestBlob),
    width,
    height,
  };
}

export async function resizeImageFile(
  file: File,
  options: { width: number; height: number; format: string; quality: number }
) {
  const image = await fileToImage(file);
  const canvas = makeCanvas(options.width, options.height);
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Canvas context is not available");
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(image, 0, 0, options.width, options.height);

  return exportCanvas(canvas, options.format, options.quality);
}

export async function convertImageFile(file: File, options: { format: string; quality: number }) {
  const image = await fileToImage(file);
  const canvas = makeCanvas(image.naturalWidth, image.naturalHeight);
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Canvas context is not available");
  }

  ctx.drawImage(image, 0, 0);
  return exportCanvas(canvas, options.format, options.quality);
}

export async function cropImageFile(
  file: File,
  options: { cropArea: CropArea; format: string; quality: number }
) {
  const image = await fileToImage(file);
  const canvas = makeCanvas(options.cropArea.width, options.cropArea.height);
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Canvas context is not available");
  }

  ctx.drawImage(
    image,
    options.cropArea.x,
    options.cropArea.y,
    options.cropArea.width,
    options.cropArea.height,
    0,
    0,
    options.cropArea.width,
    options.cropArea.height
  );

  return exportCanvas(canvas, options.format, options.quality);
}

export async function rotateFlipImageFile(
  file: File,
  options: { rotation: number; flipX: boolean; flipY: boolean; format: string; quality: number }
) {
  const image = await fileToImage(file);
  const radians = (options.rotation * Math.PI) / 180;
  const swapAxis = Math.abs(options.rotation) % 180 !== 0;
  const canvas = makeCanvas(
    swapAxis ? image.naturalHeight : image.naturalWidth,
    swapAxis ? image.naturalWidth : image.naturalHeight
  );
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Canvas context is not available");
  }

  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(options.flipX ? -1 : 1, options.flipY ? -1 : 1);
  ctx.rotate(radians);
  ctx.drawImage(image, -image.naturalWidth / 2, -image.naturalHeight / 2);

  return exportCanvas(canvas, options.format, options.quality);
}

function sampleBackgroundColor(data: Uint8ClampedArray, width: number, height: number) {
  const points = [
    0,
    (width - 1) * 4,
    (width * (height - 1)) * 4,
    (width * height - 1) * 4,
  ];

  const total = points.reduce(
    (accumulator, point) => {
      accumulator.r += data[point];
      accumulator.g += data[point + 1];
      accumulator.b += data[point + 2];
      return accumulator;
    },
    { r: 0, g: 0, b: 0 }
  );

  return {
    r: total.r / points.length,
    g: total.g / points.length,
    b: total.b / points.length,
  };
}

export async function removeBackgroundFile(
  file: File,
  options: { tolerance: number }
) {
  const image = await fileToImage(file);
  const canvas = makeCanvas(image.naturalWidth, image.naturalHeight);
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Canvas context is not available");
  }

  ctx.drawImage(image, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const background = sampleBackgroundColor(imageData.data, canvas.width, canvas.height);

  for (let offset = 0; offset < imageData.data.length; offset += 4) {
    const delta =
      Math.abs(imageData.data[offset] - background.r) +
      Math.abs(imageData.data[offset + 1] - background.g) +
      Math.abs(imageData.data[offset + 2] - background.b);

    if (delta < options.tolerance) {
      imageData.data[offset + 3] = 0;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return exportCanvas(canvas, "image/png", 0.92);
}

function applySharpen(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const source = ctx.getImageData(0, 0, width, height);
  const output = ctx.createImageData(width, height);
  const weights = [0, -1, 0, -1, 5, -1, 0, -1, 0];
  const side = 3;
  const half = 1;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const destinationOffset = (y * width + x) * 4;

      for (let channel = 0; channel < 3; channel += 1) {
        let value = 0;

        for (let ky = 0; ky < side; ky += 1) {
          for (let kx = 0; kx < side; kx += 1) {
            const sourceX = Math.min(width - 1, Math.max(0, x + kx - half));
            const sourceY = Math.min(height - 1, Math.max(0, y + ky - half));
            const sourceOffset = (sourceY * width + sourceX) * 4;
            value += source.data[sourceOffset + channel] * weights[ky * side + kx];
          }
        }

        output.data[destinationOffset + channel] = Math.min(255, Math.max(0, value));
      }

      output.data[destinationOffset + 3] = source.data[destinationOffset + 3];
    }
  }

  ctx.putImageData(output, 0, 0);
}

export async function upscaleImageFile(
  file: File,
  options: { scale: number; format: string; quality: number; sharpen: boolean }
) {
  const image = await fileToImage(file);
  const width = Math.round(image.naturalWidth * options.scale);
  const height = Math.round(image.naturalHeight * options.scale);
  const canvas = makeCanvas(width, height);
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Canvas context is not available");
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(image, 0, 0, width, height);

  if (options.sharpen) {
    applySharpen(ctx, width, height);
  }

  return exportCanvas(canvas, options.format, options.quality);
}
