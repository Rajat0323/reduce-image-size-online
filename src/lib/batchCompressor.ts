export async function compressImage(
  file: File,
  quality: number
): Promise<Blob> {
  const imageBitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = imageBitmap.width;
  canvas.height = imageBitmap.height;

  ctx?.drawImage(imageBitmap, 0, 0);

  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
      },
      "image/jpeg",
      quality / 100
    );
  });
}
