export async function compressImage(
  file: File,
  quality: number,
  format: string,
  width?: number,
  height?: number
): Promise<Blob> {
  const bitmap = await createImageBitmap(file);

  const canvas = document.createElement("canvas");
  canvas.width = width || bitmap.width;
  canvas.height = height || bitmap.height;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");

  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((result) => {
      if (!result) reject("Compression failed");
      else resolve(result);
    }, format, quality);
  });

  return blob;
}

export async function compressMultipleImages(
  files: File[],
  quality: number,
  format: string
) {
  const results = await Promise.all(
    files.map((file) =>
      compressImage(file, quality, format)
    )
  );

  return results;
}
