"use client";

import { ChangeEvent, DragEvent, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import JSZip from "jszip";
import { useSearchParams } from "next/navigation";
import Cropper, { Area } from "react-easy-crop";

import { MAX_FILE_SIZE } from "@/constants";
import type { ToolMode } from "@/lib/toolCatalog";
import type { ProcessedImage } from "@/lib/imageToolkit";

type WorkspaceItem = {
  file: File;
  originalUrl: string;
  width: number;
  height: number;
  result?: ProcessedImage;
};

type ImageToolWorkspaceProps = {
  mode: ToolMode;
  defaultTargetKB?: number;
};

const formatOptions = [
  { label: "JPG", value: "image/jpeg" },
  { label: "PNG", value: "image/png" },
  { label: "WEBP", value: "image/webp" },
];

const resizePresets = {
  instagram: { label: "Instagram Post", width: 1080, height: 1080 },
  whatsapp: { label: "WhatsApp Photo", width: 800, height: 800 },
  passport: { label: "Passport", width: 413, height: 531 },
};

const cropAspectOptions = [
  { label: "Free", value: "free" },
  { label: "1:1", value: "1" },
  { label: "4:5", value: "0.8" },
  { label: "16:9", value: `${16 / 9}` },
  { label: "9:16", value: `${9 / 16}` },
];

const backgroundOptions = [
  { label: "Transparent", value: "transparent" },
  { label: "White", value: "#ffffff" },
  { label: "Studio", value: "#f4f7fb" },
  { label: "Midnight", value: "#0f172a" },
  { label: "Brand", value: "#6d5efc" },
];

async function readImageDimensions(file: File) {
  const url = URL.createObjectURL(file);

  try {
    const image = new Image();
    image.decoding = "async";
    image.src = url;
    await image.decode();
    return {
      width: image.naturalWidth,
      height: image.naturalHeight,
    };
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

export default function ImageToolWorkspace({
  mode,
  defaultTargetKB,
}: ImageToolWorkspaceProps) {
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<WorkspaceItem[]>([]);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [quality, setQuality] = useState(0.82);
  const [format, setFormat] = useState("image/jpeg");
  const [targetKB, setTargetKB] = useState<number | "">(defaultTargetKB || "");
  const [resizeWidth, setResizeWidth] = useState<number | "">("");
  const [resizeHeight, setResizeHeight] = useState<number | "">("");
  const [resizePercent, setResizePercent] = useState(100);
  const [resizePreset, setResizePreset] = useState<keyof typeof resizePresets | "">("");
  const [rotation, setRotation] = useState(0);
  const [flipX, setFlipX] = useState(false);
  const [flipY, setFlipY] = useState(false);
  const [backgroundTolerance, setBackgroundTolerance] = useState(60);
  const [backgroundColor, setBackgroundColor] = useState("transparent");
  const [upscaleFactor, setUpscaleFactor] = useState(2);
  const [sharpen, setSharpen] = useState(true);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [cropAspect, setCropAspect] = useState("free");
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [comparisonSliders, setComparisonSliders] = useState<Record<string, number>>({});

  const multipleAllowed = mode === "compressor" || mode === "bulk-compressor" || mode === "converter";
  const activeItem = items[0];
  const activeAspect = cropAspect === "free" ? undefined : Number(cropAspect);

  useEffect(() => {
    const queryFormat = searchParams.get("format");
    const queryTarget = searchParams.get("target");

    if (queryFormat && formatOptions.some((option) => option.value === queryFormat)) {
      setFormat(queryFormat);
    } else if (mode === "background-remover") {
      setFormat("image/png");
    } else if (mode === "upscaler") {
      setFormat("image/webp");
    } else if (mode === "converter") {
      setFormat("image/png");
    } else {
      setFormat("image/jpeg");
    }

    if (queryTarget) {
      const parsedTarget = Number(queryTarget);
      setTargetKB(Number.isFinite(parsedTarget) && parsedTarget > 0 ? parsedTarget : "");
    } else {
      setTargetKB(defaultTargetKB || "");
    }
  }, [defaultTargetKB, mode, searchParams]);

  useEffect(() => {
    if (!resizePreset) {
      return;
    }

    const preset = resizePresets[resizePreset];
    setResizeWidth(preset.width);
    setResizeHeight(preset.height);
  }, [resizePreset]);

  const completedCount = useMemo(
    () => items.filter((item) => item.result).length,
    [items]
  );

  function getResizeDimensions(item: WorkspaceItem) {
    if (mode !== "resizer") {
      return {
        width: resizeWidth || undefined,
        height: resizeHeight || undefined,
      };
    }

    const preset = resizePreset ? resizePresets[resizePreset] : null;
    const percentScale = resizePercent / 100;

    return {
      width:
        resizeWidth ||
        preset?.width ||
        Math.max(1, Math.round(item.width * percentScale)),
      height:
        resizeHeight ||
        preset?.height ||
        Math.max(1, Math.round(item.height * percentScale)),
    };
  }

  async function hydrateFiles(fileList: FileList | File[]) {
    const nextFiles = Array.from(fileList);

    if (nextFiles.length === 0) {
      return;
    }

    const validFiles = nextFiles.filter((file) => file.size <= MAX_FILE_SIZE);

    if (validFiles.length !== nextFiles.length) {
      setError(`Each file must be ${formatFileSize(MAX_FILE_SIZE)} or smaller.`);
    } else {
      setError("");
    }

    const hydrated = await Promise.all(
      validFiles.map(async (file) => {
        const dimensions = await readImageDimensions(file);

        return {
          file,
          originalUrl: URL.createObjectURL(file),
          width: dimensions.width,
          height: dimensions.height,
        };
      })
    );

    setItems(multipleAllowed ? hydrated : hydrated.slice(0, 1));
    setProgress(0);
  }

  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    void hydrateFiles(event.target.files || []);
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    void hydrateFiles(event.dataTransfer.files);
  }

  function onDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(true);
  }

  function onDragLeave(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
  }

  async function onProcess() {
    if (items.length === 0) {
      setError("Upload at least one image to continue.");
      return;
    }

    setProcessing(true);
    setError("");
    setProgress(0);

    const worker = new Worker("/workers/imageWorker.js");

    try {
      const nextItems: WorkspaceItem[] = [...items];

      for (let index = 0; index < nextItems.length; index += 1) {
        const item = nextItems[index];
        const resizeDimensions = getResizeDimensions(item);
        
        const result: any = await new Promise((resolve, reject) => {
          worker.onmessage = (e) => resolve(e.data);
          worker.onerror = (e) => reject(new Error("Worker error"));
          
          worker.postMessage({
            mode,
            file: item.file,
            quality,
            format,
            width: resizeDimensions.width,
            height: resizeDimensions.height,
            maintainRatio: true,
            targetSizeKB: typeof targetKB === "number" ? targetKB : undefined,
            cropArea: croppedAreaPixels ? {
              x: Math.round(croppedAreaPixels.x),
              y: Math.round(croppedAreaPixels.y),
              width: Math.round(croppedAreaPixels.width),
              height: Math.round(croppedAreaPixels.height),
            } : undefined,
            rotation,
            flipX,
            flipY,
            tolerance: backgroundTolerance,
            backgroundColor,
            scale: upscaleFactor,
            sharpen,
          });
        });

        if (result.success) {
          nextItems[index] = {
            ...item,
            result: {
              blob: result.blob,
              url: URL.createObjectURL(result.blob),
              width: result.width,
              height: result.height,
            },
          };
        } else {
          throw new Error(result.error || "Processing failed");
        }
        
        setProgress(Math.round(((index + 1) / items.length) * 100));
      }

      setItems(nextItems);
    } catch (processingError) {
      setError(processingError instanceof Error ? processingError.message : "Processing failed");
    } finally {
      worker.terminate();
      setProcessing(false);
    }
  }

  async function onDownloadAll() {
    const readyItems = items.filter((item) => item.result);

    if (readyItems.length === 0) {
      return;
    }

    if (readyItems.length === 1) {
      const item = readyItems[0];
      const anchor = document.createElement("a");
      anchor.href = item.result!.url;
      anchor.download = item.file.name.replace(/\.[^.]+$/, "") + getFileExtension(format, mode);
      anchor.click();
      return;
    }

    const zip = new JSZip();

    readyItems.forEach((item) => {
      zip.file(
        item.file.name.replace(/\.[^.]+$/, "") + getFileExtension(format, mode),
        item.result!.blob
      );
    });

    const blob = await zip.generateAsync({ type: "blob" });
    const anchor = document.createElement("a");
    anchor.href = URL.createObjectURL(blob);
    anchor.download = "reduceimagesize-tools.zip";
    anchor.click();
  }

  async function onShare() {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      return;
    }

    await navigator.clipboard.writeText(window.location.href);
  }

  return (
    <div className="tool-workspace">
      <div className="tool-main">
        <section
          className={`tool-surface upload-surface ${isDragging ? "is-dragging" : ""}`}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple={multipleAllowed}
            onChange={onInputChange}
            className="hidden-input"
          />

          <div className="upload-copy">
            <p className="eyebrow">Drag and drop your images</p>
            <h2>Upload image files for this tool</h2>
            <p>
              Drop JPG, PNG, and WebP files here or browse from your device. Files are processed
              locally and never stored.
            </p>
            <div className="hero-cta">
              <button type="button" className="btn btn-primary" onClick={() => inputRef.current?.click()}>
                Select Images
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => void onShare()}>
                Share Tool
              </button>
            </div>
          </div>

          <div className="upload-meta">
            <strong>{items.length}</strong>
            <span>file{items.length === 1 ? "" : "s"} loaded</span>
          </div>
        </section>

        <div className="tool-panels">
          <section className="tool-surface controls-surface">
            <div className="surface-header">
              <h3>Tool settings</h3>
              <p>Adjust the controls below, then process your image.</p>
            </div>

            {(mode === "compressor" || mode === "bulk-compressor") && (
              <>
                <label className="field-label">Output format</label>
                <div className="chip-row">
                  {formatOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={`chip ${format === option.value ? "active" : ""}`}
                      onClick={() => setFormat(option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>

                <label className="field-label">Compression level: {Math.round(quality * 100)}%</label>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.05"
                  value={quality}
                  onChange={(event) => setQuality(Number(event.target.value))}
                />

                <label className="field-label">Target size in KB</label>
                <input
                  type="number"
                  value={targetKB}
                  onChange={(event) => setTargetKB(event.target.value ? Number(event.target.value) : "")}
                  placeholder="Optional exact KB target"
                  className="tool-input"
                />
              </>
            )}

            {mode === "resizer" && (
              <>
                <label className="field-label">Preset size</label>
                <select
                  value={resizePreset}
                  onChange={(event) => setResizePreset(event.target.value as keyof typeof resizePresets | "")}
                  className="tool-select"
                >
                  <option value="">Custom</option>
                  {Object.entries(resizePresets).map(([key, preset]) => (
                    <option key={key} value={key}>
                      {preset.label}
                    </option>
                  ))}
                </select>

                <div className="double-field">
                  <div>
                    <label className="field-label">Width</label>
                    <input
                      type="number"
                      value={resizeWidth}
                      onChange={(event) => setResizeWidth(event.target.value ? Number(event.target.value) : "")}
                      className="tool-input"
                    />
                  </div>
                  <div>
                    <label className="field-label">Height</label>
                    <input
                      type="number"
                      value={resizeHeight}
                      onChange={(event) => setResizeHeight(event.target.value ? Number(event.target.value) : "")}
                      className="tool-input"
                    />
                  </div>
                </div>

                <label className="field-label">Resize percentage: {resizePercent}%</label>
                <input
                  type="range"
                  min="10"
                  max="200"
                  step="5"
                  value={resizePercent}
                  onChange={(event) => setResizePercent(Number(event.target.value))}
                />
              </>
            )}

            {mode === "converter" && (
              <>
                <label className="field-label">Convert to</label>
                <div className="chip-row">
                  {formatOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={`chip ${format === option.value ? "active" : ""}`}
                      onClick={() => setFormat(option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </>
            )}

            {mode === "rotate-flip" && (
              <>
                <label className="field-label">Rotation</label>
                <div className="chip-row">
                  <button type="button" className="chip" onClick={() => setRotation((value) => value - 90)}>
                    Rotate left
                  </button>
                  <button type="button" className="chip" onClick={() => setRotation((value) => value + 90)}>
                    Rotate right
                  </button>
                </div>

                <div className="chip-row">
                  <button type="button" className={`chip ${flipX ? "active" : ""}`} onClick={() => setFlipX((value) => !value)}>
                    Flip horizontal
                  </button>
                  <button type="button" className={`chip ${flipY ? "active" : ""}`} onClick={() => setFlipY((value) => !value)}>
                    Flip vertical
                  </button>
                </div>
              </>
            )}

            {mode === "background-remover" && (
              <>
                <label className="field-label">Background tolerance: {backgroundTolerance}</label>
                <input
                  type="range"
                  min="12"
                  max="110"
                  step="5"
                  value={backgroundTolerance}
                  onChange={(event) => setBackgroundTolerance(Number(event.target.value))}
                />

                <p className="control-help">
                  Lower values protect the subject more. Increase only when some of the background
                  still remains.
                </p>

                <label className="field-label">Background fill</label>
                <div className="chip-row">
                  {backgroundOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={`chip ${backgroundColor === option.value ? "active" : ""}`}
                      onClick={() => setBackgroundColor(option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>

                <label className="field-label">Custom background color</label>
                <div className="color-picker-row">
                  <input
                    type="color"
                    value={backgroundColor === "transparent" ? "#ffffff" : backgroundColor}
                    onChange={(event) => setBackgroundColor(event.target.value)}
                    className="color-input"
                    aria-label="Choose a custom background color"
                  />
                  <span className="control-help">
                    Choose transparent for cutouts or a solid color for ready-to-share exports.
                  </span>
                </div>
              </>
            )}

            {mode === "upscaler" && (
              <>
                <label className="field-label">Upscale factor</label>
                <div className="chip-row">
                  {[2, 4].map((factor) => (
                    <button
                      key={factor}
                      type="button"
                      className={`chip ${upscaleFactor === factor ? "active" : ""}`}
                      onClick={() => setUpscaleFactor(factor)}
                    >
                      {factor}x
                    </button>
                  ))}
                </div>

                <label className="field-label">Export format</label>
                <div className="chip-row">
                  {formatOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={`chip ${format === option.value ? "active" : ""}`}
                      onClick={() => setFormat(option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>

                <label className="checkbox-row">
                  <input type="checkbox" checked={sharpen} onChange={() => setSharpen((value) => !value)} />
                  Apply extra sharpen pass
                </label>
              </>
            )}

            <div className="hero-cta" style={{ marginTop: 24 }}>
              <button type="button" className="btn btn-primary" onClick={() => void onProcess()} disabled={processing}>
                {processing ? `Processing ${progress}%` : "Process Image"}
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => void onDownloadAll()} disabled={completedCount === 0}>
                Download
              </button>
            </div>

            {processing && (
              <>
                <div className="progress-shell">
                  <div className="progress-bar">
                    <div className="progress-value" style={{ width: `${progress}%` }} />
                  </div>
                </div>
                <div className="processing-callout" role="status" aria-live="polite">
                  <span className="processing-spinner" aria-hidden="true" />
                  <div>
                    <strong>Processing safely in your browser</strong>
                    <p>
                      Your file stays on device. While this runs, you can{" "}
                      <a href="/blog/complete-guide-to-image-tools-india">read the image tools guide</a>.
                    </p>
                  </div>
                </div>
              </>
            )}

            {error && <p className="tool-error">{error}</p>}
          </section>

          <section className="tool-surface result-surface">
            <div className="surface-header">
              <h3>Preview and downloads</h3>
              <p>Compare original and processed files, then download individual results or everything as a ZIP.</p>
            </div>

            {mode === "crop" && activeItem && (
              <div className="crop-editor">
                <div className="crop-stage">
                  <Cropper
                    image={activeItem.originalUrl}
                    crop={crop}
                    zoom={zoom}
                    aspect={activeAspect}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={(_, pixels) => setCroppedAreaPixels(pixels)}
                    showGrid
                  />
                </div>

                <div className="crop-controls">
                  <label className="field-label">Aspect ratio</label>
                  <div className="chip-row">
                    {cropAspectOptions.map((option) => (
                      <button
                        key={option.label}
                        type="button"
                        className={`chip ${cropAspect === option.value ? "active" : ""}`}
                        onClick={() => setCropAspect(option.value)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>

                  <label className="field-label">Zoom: {zoom.toFixed(1)}x</label>
                  <input
                    type="range"
                    min="1"
                    max="3"
                    step="0.1"
                    value={zoom}
                    onChange={(event) => setZoom(Number(event.target.value))}
                  />
                </div>
              </div>
            )}

            <div className="result-grid">
              <AnimatePresence>
                {items.map((item, idx) => (
                  <motion.article
                    key={item.originalUrl}
                    className="result-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div className="result-preview">
                      {item.result ? (
                        <div className="comparison-frame">
                          <img src={item.originalUrl} alt="Original" />
                          <div
                            className="comparison-overlay"
                            style={{ width: `${comparisonSliders[item.originalUrl] ?? 50}%` }}
                          >
                            <img src={item.result.url} alt="Processed" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          </div>
                          <div className="comparison-handle" style={{ left: `${comparisonSliders[item.originalUrl] ?? 50}%` }} />
                          <div className="comparison-labels">Original</div>
                          <div className="comparison-labels">Processed</div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={comparisonSliders[item.originalUrl] ?? 50}
                            onChange={(e) => setComparisonSliders(prev => ({ ...prev, [item.originalUrl]: Number(e.target.value) }))}
                            className="comparison-slider"
                          />
                        </div>
                      ) : (
                        <div className="result-preview-simple">
                          <img src={item.originalUrl} alt={item.file.name} />
                          <div className="result-placeholder">Run the tool to generate a preview</div>
                        </div>
                      )}
                    </div>

                    <div className="result-meta">
                      <h4>{item.file.name}</h4>
                      <p>
                        {formatFileSize(item.file.size)} | {item.width} x {item.height}px
                      </p>
                      {item.result && (
                        <p className="reduction-note">
                          <strong>{formatFileSize(item.result.blob.size)}</strong> â€¢{" "}
                          {Math.max(0, ((item.file.size - item.result.blob.size) / item.file.size) * 100).toFixed(1)}% smaller
                        </p>
                      )}
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function getFileExtension(format: string, mode: ToolMode) {
  if (mode === "background-remover") {
    return ".png";
  }

  if (format === "image/png") {
    return ".png";
  }

  if (format === "image/webp") {
    return ".webp";
  }

  return ".jpg";
}

