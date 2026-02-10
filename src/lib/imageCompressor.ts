import { compressImage } from "./imageCompressor";

export async function compressMultipleImages(
  files: File[],
  quality: number
) {
  const results = [];

  for (const file of files) {
    const compressed = await compressImage(file, quality);
    results.push({
      name: file.name,
      blob: compressed
    });
  }

  return results;
}
