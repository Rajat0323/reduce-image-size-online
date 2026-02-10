import { useState } from "react";

export function useBatchUpload() {
  const [images, setImages] = useState<File[]>([]);

  function addImages(files: File[]) {
    setImages(files);
  }

  function clearImages() {
    setImages([]);
  }

  return { images, addImages, clearImages };
}
