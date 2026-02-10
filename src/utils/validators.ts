export function validateFile(file: File) {
  const maxSize = 10 * 1024 * 1024; // 10MB

  if (!file.type.startsWith("image/")) {
    return "Only image files are allowed.";
  }

  if (file.size > maxSize) {
    return "File size must be under 10MB.";
  }

  return null;
}
