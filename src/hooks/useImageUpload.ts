import { useState } from "react";

export function useImageUpload() {
  const [files, setFiles] = useState<File[]>([]);

  function onSelect(newFiles: FileList | null) {
    if (newFiles) {
      setFiles(Array.from(newFiles));
    }
  }

  return { files, onSelect };
}
