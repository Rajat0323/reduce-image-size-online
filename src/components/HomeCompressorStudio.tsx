"use client";

import {
  ChangeEvent,
  ClipboardEvent,
  DragEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

import { MAX_FILE_SIZE } from "@/constants";

type StudioItem = {
  file: File;
  originalUrl: string;
  width: number;
  height: number;
  result?: {
    blob: Blob;
    url: string;
    width: number;
    height: number;
  };
};

const FORMAT_OPTIONS = [
  { label: "Auto", value: "auto" },
  { label: "JPG", value: "image/jpeg" },
  { label: "PNG", value: "image/png" },
  { label: "WEBP", value: "image/webp" },
] as const;

const TARGET_CHIPS: Array<{ label: string; value: string }> = [
  { label: "Auto ★", value: "auto" },
  { label: "20 KB", value: "20" },
  { label: "50 KB", value: "50" },
  { label: "100 KB", value: "100" },
  { label: "200 KB", value: "200" },
  { label: "500 KB", value: "500" },
  { label: "1 MB", value: "1024" },
  { label: "Custom", value: "custom" },
];

async function normalizeUploadFile(file: File) {
  const lowerName = file.name.toLowerCase();
  const isHeic =
    file.type === "image/heic" ||
    file.type === "image/heif" ||
    lowerName.endsWith(".heic") ||
    lowerName.endsWith(".heif");

  if (!isHeic) {
    return file;
  }

  const { default: heic2any } = await import("heic2any");
  const converted = await heic2any({
    blob: file,
    toType: "image/jpeg",
    quality: 0.92,
  });
  const blob = Array.isArray(converted) ? converted[0] : converted;
  return new File([blob], file.name.replace(/\.heic?$/i, ".jpg"), {
    type: "image/jpeg",
    lastModified: Date.now(),
  });
}

async function readImageDimensions(file: File) {
  const url = URL.createObjectURL(file);
  try {
    const image = new Image();
    image.decoding = "async";
    image.src = url;
    await image.decode();
    return { width: image.naturalWidth, height: image.naturalHeight };
  } finally {
    URL.revokeObjectURL(url);
  }
}

function formatFileSize(size: number) {
  if (size >= 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  }
  return `${(size / 1024).toFixed(1)} KB`;
}

function extensionForFormat(format: string) {
  if (format === "image/png") return ".png";
  if (format === "image/webp") return ".webp";
  return ".jpg";
}

function resolveOutputFormat(selected: string, file: File) {
  if (selected !== "auto") {
    return selected;
  }
  if (file.type === "image/png" || file.type === "image/webp") {
    return file.type;
  }
  return "image/jpeg";
}

function UploadIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path
        d="M24 32V12m0 0l-7 7m7-7l7 7"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 30v4a4 4 0 004 4h20a4 4 0 004-4v-4"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function HomeCompressorStudio() {
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const [item, setItem] = useState<StudioItem | null>(null);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [format, setFormat] = useState("auto");
  const [targetPreset, setTargetPreset] = useState("auto");
  const [customTarget, setCustomTarget] = useState("");
  const [customUnit, setCustomUnit] = useState<"KB" | "MB">("KB");
  const [quality, setQuality] = useState(82);
  const [resizeWidth, setResizeWidth] = useState<number | "">("");
  const [resizeHeight, setResizeHeight] = useState<number | "">("");
  const [maintainRatio, setMaintainRatio] = useState(true);
  const [removeMetadata, setRemoveMetadata] = useState(true);
  const [sharpen, setSharpen] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("transparent");

  useEffect(() => {
    const queryTarget = searchParams.get("target");
    const queryFormat = searchParams.get("format");
    const queryWidth = searchParams.get("width");
    const queryHeight = searchParams.get("height");

    if (queryTarget) {
      const n = Number(queryTarget);
      if (Number.isFinite(n) && n > 0) {
        const match = TARGET_CHIPS.find((p) => p.value === String(n));
        if (match) {
          setTargetPreset(match.value);
        } else {
          setTargetPreset("custom");
          setCustomTarget(String(n));
          setCustomUnit("KB");
        }
      }
    }

    if (queryFormat) {
      const normalized =
        queryFormat === "jpeg" || queryFormat === "jpg"
          ? "image/jpeg"
          : queryFormat === "png"
            ? "image/png"
            : queryFormat === "webp"
              ? "image/webp"
              : queryFormat.startsWith("image/")
                ? queryFormat
                : "";
      if (normalized && FORMAT_OPTIONS.some((o) => o.value === normalized)) {
        setFormat(normalized);
      }
    }

    if (queryWidth) {
      const w = Number(queryWidth);
      if (Number.isFinite(w) && w > 0) setResizeWidth(w);
    }
    if (queryHeight) {
      const h = Number(queryHeight);
      if (Number.isFinite(h) && h > 0) setResizeHeight(h);
    }
  }, [searchParams]);

  const targetKB = useMemo(() => {
    if (targetPreset === "auto") return undefined;
    if (targetPreset === "custom") {
      const n = Number(customTarget);
      if (!Number.isFinite(n) || n <= 0) return undefined;
      return customUnit === "MB" ? Math.round(n * 1024) : Math.round(n);
    }
    return Number(targetPreset);
  }, [customTarget, customUnit, targetPreset]);

  async function hydrateFile(file: File | null | undefined) {
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      setError(`Each file must be ${formatFileSize(MAX_FILE_SIZE)} or smaller.`);
      return;
    }

    try {
      const normalized = await normalizeUploadFile(file);
      const dimensions = await readImageDimensions(normalized);
      if (item?.originalUrl) URL.revokeObjectURL(item.originalUrl);
      if (item?.result?.url) URL.revokeObjectURL(item.result.url);

      setItem({
        file: normalized,
        originalUrl: URL.createObjectURL(normalized),
        width: dimensions.width,
        height: dimensions.height,
      });
      setError("");
    } catch {
      setError("Could not read that image. Try JPG, PNG, WebP, or HEIC.");
    }
  }

  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    void hydrateFile(event.target.files?.[0]);
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    void hydrateFile(event.dataTransfer.files?.[0]);
  }

  function onPaste(event: ClipboardEvent<HTMLDivElement>) {
    const files = event.clipboardData?.files;
    if (files?.[0]) {
      event.preventDefault();
      void hydrateFile(files[0]);
    }
  }

  useEffect(() => {
    function handleWindowPaste(event: globalThis.ClipboardEvent) {
      const file = event.clipboardData?.files?.[0];
      if (file && file.type.startsWith("image/")) {
        event.preventDefault();
        void hydrateFile(file);
      }
    }
    window.addEventListener("paste", handleWindowPaste);
    return () => window.removeEventListener("paste", handleWindowPaste);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onCompress() {
    if (!item) {
      setError("Upload an image first.");
      return;
    }

    setProcessing(true);
    setError("");
    const worker = new Worker("/workers/imageWorker.js");
    const outputFormat = resolveOutputFormat(format, item.file);

    try {
      const result: {
        success: boolean;
        blob?: Blob;
        width?: number;
        height?: number;
        error?: string;
      } = await new Promise((resolve, reject) => {
        worker.onmessage = (e) => resolve(e.data);
        worker.onerror = () => reject(new Error("Worker error"));
        worker.postMessage({
          mode: "compressor",
          file: item.file,
          quality: quality / 100,
          format: outputFormat,
          width: resizeWidth || undefined,
          height: resizeHeight || undefined,
          maintainRatio,
          targetSizeKB: targetKB,
          backgroundColor,
          scale: 1,
          sharpen,
        });
      });

      if (!result.success || !result.blob) {
        throw new Error(result.error || "Compression failed");
      }

      if (item.result?.url) URL.revokeObjectURL(item.result.url);

      setItem({
        ...item,
        result: {
          blob: result.blob,
          url: URL.createObjectURL(result.blob),
          width: result.width || item.width,
          height: result.height || item.height,
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Compression failed");
    } finally {
      worker.terminate();
      setProcessing(false);
    }
  }

  function onDownload() {
    if (!item?.result) return;
    const outputFormat = resolveOutputFormat(format, item.file);
    const anchor = document.createElement("a");
    anchor.href = item.result.url;
    anchor.download =
      item.file.name.replace(/\.[^.]+$/, "") +
      "-compressed" +
      extensionForFormat(outputFormat);
    anchor.click();
  }

  function clearImage() {
    if (item?.originalUrl) URL.revokeObjectURL(item.originalUrl);
    if (item?.result?.url) URL.revokeObjectURL(item.result.url);
    setItem(null);
    setError("");
  }

  const savings =
    item?.result != null
      ? Math.max(0, Math.round((1 - item.result.blob.size / item.file.size) * 100))
      : null;

  return (
    <div className="home-studio" id="compressor" onPaste={onPaste}>
      <div className="home-studio-shell">
        <section
          className={`home-studio-dropzone ${isDragging ? "is-dragging" : ""} ${item ? "has-file" : ""}`}
          onDrop={onDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setIsDragging(false);
          }}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*,.heic,.heif,.tif,.tiff,.bmp,.avif,.svg"
            onChange={onInputChange}
            className="hidden-input"
          />

          {!item ? (
            <div className="home-studio-empty">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className="home-upload-visual">
                  <UploadIcon />
                </div>
                <h2>Drop your image here</h2>
                <p className="home-studio-lead">
                  Drag & drop, browse, or paste. Compress, convert, and resize in one place — no
                  extra pages.
                </p>
                <div className="home-studio-actions">
                  <button
                    type="button"
                    className="home-btn home-btn-primary"
                    onClick={() => inputRef.current?.click()}
                  >
                    Choose image
                  </button>
                  <span className="home-studio-hint">or press Ctrl / ⌘ + V</span>
                </div>
                <ul className="home-studio-formats" aria-label="Supported formats">
                  {["JPG", "PNG", "WEBP", "HEIC", "BMP", "GIF", "TIFF", "AVIF"].map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ) : (
            <div className="home-studio-workspace">
              <div className="home-studio-previews">
                <article className="home-studio-preview-card">
                  <header>
                    <h3>Before</h3>
                    <button type="button" className="home-studio-text-btn" onClick={clearImage}>
                      Replace
                    </button>
                  </header>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.originalUrl} alt="Original upload preview" />
                  <dl>
                    <div>
                      <dt>Size</dt>
                      <dd>{formatFileSize(item.file.size)}</dd>
                    </div>
                    <div>
                      <dt>Dimensions</dt>
                      <dd>
                        {item.width} × {item.height}
                      </dd>
                    </div>
                    <div>
                      <dt>Format</dt>
                      <dd>{item.file.type.replace("image/", "").toUpperCase() || "IMAGE"}</dd>
                    </div>
                  </dl>
                </article>

                <article className="home-studio-preview-card">
                  <header>
                    <h3>After</h3>
                    {savings != null && <span className="home-studio-savings">−{savings}%</span>}
                  </header>
                  <AnimatePresence mode="wait">
                    {item.result ? (
                      <motion.div
                        key="result"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        style={{ display: "flex", flexDirection: "column", flex: 1 }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.result.url} alt="Compressed preview" />
                        <dl>
                          <div>
                            <dt>New size</dt>
                            <dd>{formatFileSize(item.result.blob.size)}</dd>
                          </div>
                          <div>
                            <dt>Dimensions</dt>
                            <dd>
                              {item.result.width} × {item.result.height}
                            </dd>
                          </div>
                          <div>
                            <dt>Saved</dt>
                            <dd>
                              {formatFileSize(Math.max(0, item.file.size - item.result.blob.size))}
                            </dd>
                          </div>
                        </dl>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="waiting"
                        className="home-studio-waiting"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <p>Set format &amp; target, then hit Compress.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              </div>

              <div className="home-studio-controls">
                <div className="home-control-block">
                  <span className="label">Convert to</span>
                  <div className="home-seg" role="group" aria-label="Output format">
                    {FORMAT_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        className={format === option.value ? "active" : ""}
                        onClick={() => setFormat(option.value)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="home-control-block">
                  <span className="label">Target file size</span>
                  <div className="home-chips" role="group" aria-label="Target size presets">
                    {TARGET_CHIPS.map((chip) => (
                      <button
                        key={chip.value}
                        type="button"
                        className={targetPreset === chip.value ? "active" : ""}
                        onClick={() => setTargetPreset(chip.value)}
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                </div>

                {targetPreset === "custom" && (
                  <div className="home-studio-custom-target">
                    <label className="home-studio-field">
                      <span>Target size</span>
                      <input
                        type="number"
                        min="1"
                        step="1"
                        value={customTarget}
                        onChange={(e) => setCustomTarget(e.target.value)}
                        placeholder="e.g. 75"
                      />
                    </label>
                    <label className="home-studio-field">
                      <span>Unit</span>
                      <select
                        value={customUnit}
                        onChange={(e) => setCustomUnit(e.target.value as "KB" | "MB")}
                      >
                        <option value="KB">KB</option>
                        <option value="MB">MB</option>
                      </select>
                    </label>
                  </div>
                )}

                <button
                  type="button"
                  className="home-studio-text-btn"
                  onClick={() => setShowAdvanced((v) => !v)}
                  aria-expanded={showAdvanced}
                >
                  {showAdvanced ? "Hide advanced options" : "Show advanced options"}
                </button>

                {showAdvanced && (
                  <div className="home-studio-advanced">
                    <label className="home-studio-field">
                      <span>Quality: {quality}</span>
                      <input
                        type="range"
                        min={10}
                        max={100}
                        value={quality}
                        onChange={(e) => setQuality(Number(e.target.value))}
                      />
                    </label>

                    <div className="home-studio-custom-target">
                      <label className="home-studio-field">
                        <span>Resize width</span>
                        <input
                          type="number"
                          min={1}
                          value={resizeWidth}
                          onChange={(e) =>
                            setResizeWidth(e.target.value ? Number(e.target.value) : "")
                          }
                          placeholder="Auto"
                        />
                      </label>
                      <label className="home-studio-field">
                        <span>Resize height</span>
                        <input
                          type="number"
                          min={1}
                          value={resizeHeight}
                          onChange={(e) =>
                            setResizeHeight(e.target.value ? Number(e.target.value) : "")
                          }
                          placeholder="Auto"
                        />
                      </label>
                    </div>

                    <label className="home-studio-check">
                      <input
                        type="checkbox"
                        checked={maintainRatio}
                        onChange={(e) => setMaintainRatio(e.target.checked)}
                      />
                      Maintain aspect ratio
                    </label>

                    <label className="home-studio-check">
                      <input
                        type="checkbox"
                        checked={removeMetadata}
                        onChange={(e) => setRemoveMetadata(e.target.checked)}
                      />
                      Remove metadata on export
                    </label>

                    <label className="home-studio-check">
                      <input
                        type="checkbox"
                        checked={sharpen}
                        onChange={(e) => setSharpen(e.target.checked)}
                      />
                      Sharpen after resize
                    </label>

                    <label className="home-studio-field">
                      <span>Background color</span>
                      <select
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                      >
                        <option value="transparent">Transparent</option>
                        <option value="#ffffff">White</option>
                        <option value="#000000">Black</option>
                        <option value="#f4f7fb">Studio light</option>
                      </select>
                    </label>
                  </div>
                )}

                {processing && (
                  <div className="home-progress" aria-hidden="true">
                    <i />
                  </div>
                )}

                <div className="home-studio-cta-row">
                  <button
                    type="button"
                    className="home-btn home-btn-primary"
                    onClick={() => void onCompress()}
                    disabled={processing}
                  >
                    {processing ? "Compressing…" : "Compress image"}
                  </button>
                  <button
                    type="button"
                    className="home-btn home-btn-secondary"
                    onClick={onDownload}
                    disabled={!item.result}
                  >
                    Download
                  </button>
                </div>

                {removeMetadata && (
                  <p className="home-studio-note">
                    Export rewrites the file in-browser, so camera EXIF and GPS are not kept in the
                    download.
                  </p>
                )}
              </div>
            </div>
          )}
        </section>
      </div>

      {error && (
        <p className="home-studio-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
