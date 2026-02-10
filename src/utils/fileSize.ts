export function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024)
    return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function getSavedPercentage(
  original: number,
  compressed: number
) {
  return (
    100 - (compressed / original) * 100
  ).toFixed(1);
}
