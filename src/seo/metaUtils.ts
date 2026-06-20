export function clampMetaText(value: string, maxLength: number) {
  if (value.length <= maxLength) {
    return value;
  }

  const trimmed = value.slice(0, maxLength - 1);
  const lastSpace = trimmed.lastIndexOf(" ");
  return `${trimmed.slice(0, lastSpace > 40 ? lastSpace : trimmed.length).trim()}...`;
}

/** Strip brand suffix so layout title template does not duplicate it. */
export function stripBrandSuffix(title: string) {
  return title.replace(/\s*\|\s*ReduceImageSize\s*$/i, "").trim();
}

export function buildPageTitle(title: string, maxLength = 60) {
  return clampMetaText(stripBrandSuffix(title), maxLength);
}

export function buildMetaDescription(description: string, maxLength = 155) {
  return clampMetaText(description, maxLength);
}
