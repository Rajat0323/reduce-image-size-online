export function getExtension(type: string) {
  if (type === "image/png") return "png";
  if (type === "image/webp") return "webp";
  return "jpg";
}

export function isSupportedFormat(type: string) {
  return ["image/jpeg", "image/png", "image/webp"].includes(type);
}
