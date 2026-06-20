import type { ToolMode } from "@/lib/toolCatalog";

export type ParsedToolHref = {
  mode: ToolMode;
  defaultTargetKB?: number;
  initialWidth?: number;
  initialHeight?: number;
  initialFormat?: string;
};

const pathToMode: Record<string, ToolMode> = {
  "image-compressor": "compressor",
  "image-resizer": "resizer",
  "image-converter": "converter",
  "crop-image": "crop",
  "bulk-image-compressor": "bulk-compressor",
  "rotate-flip-image": "rotate-flip",
  "background-remover": "background-remover",
  "image-upscaler": "upscaler",
};

export function parseToolHref(href: string): ParsedToolHref | null {
  const [pathPart, queryPart] = href.split("?");
  const slug = pathPart.replace(/^\//, "");
  const mode = pathToMode[slug];

  if (!mode) {
    return null;
  }

  const params = new URLSearchParams(queryPart || "");
  const target = Number(params.get("target"));
  const width = Number(params.get("width"));
  const height = Number(params.get("height"));
  const format = params.get("format") || undefined;

  return {
    mode,
    defaultTargetKB: Number.isFinite(target) && target > 0 ? target : undefined,
    initialWidth: Number.isFinite(width) && width > 0 ? width : undefined,
    initialHeight: Number.isFinite(height) && height > 0 ? height : undefined,
    initialFormat: format,
  };
}
