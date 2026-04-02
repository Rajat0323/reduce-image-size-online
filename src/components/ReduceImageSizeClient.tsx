"use client";

import { useEffect, useRef, useState } from "react";
import JSZip from "jszip";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

import "../styles/tool.css";

type ImgType = {
  file: File;
  preview: string;
  compressedBlob?: Blob;
  compressedUrl?: string;
  originalSize: number;
  compressedSize?: number;
  targetSizeKB?: number;
  targetReached?: boolean;
  outputWidth?: number;
  outputHeight?: number;
  qualityUsed?: number;
};

const qualityPresets = [
  { label: "Fast (60%)", value: 0.6 },
  { label: "Balanced (80%)", value: 0.8 },
  { label: "High (95%)", value: 0.95 },
];

const targetPresets = [20, 50, 100, 200];
const allowedFormats = ["image/jpeg", "image/png", "image/webp"];

export default function ReduceImageSizeClient() {
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const downloadRef = useRef<HTMLButtonElement>(null);

  const [images, setImages] = useState<ImgType[]>([]);
  const [quality, setQuality] = useState(0.8);
  const [format, setFormat] = useState("image/jpeg");
  const [targetSizeKB, setTargetSizeKB] = useState<number | "">("");
  const [width, setWidth] = useState<number | "">("");
  const [height, setHeight] = useState<number | "">("");
  const [maintainRatio, setMaintainRatio] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [comparisonSliders, setComparisonSliders] = useState<Record<number, number>>({});

  useEffect(() => {
    const target = searchParams.get("target");
    const formatParam = searchParams.get("format");

    if (target) {
      const parsedTarget = Number(target);

      if (Number.isFinite(parsedTarget) && parsedTarget > 0) {
        setTargetSizeKB(parsedTarget);
      }
    }

    if (formatParam && allowedFormats.includes(formatParam)) {
      setFormat(formatParam);
    }
  }, [searchParams]);

  function openPicker() {
    inputRef.current?.click();
  }

  function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    const mapped = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      originalSize: file.size,
    }));
    setImages(mapped);
    setError("");
  }

  async function compressImages() {
    if (images.length === 0) {
      setError("Upload at least one image to start compression.");
      return;
    }

    setProcessing(true);
    setError("");
    setProgress(0);

    const worker = new Worker("/workers/imageWorker.js");
    const updatedImages: ImgType[] = [];
    let processed = 0;

    for (const img of images) {
      try {
        const result: any = await new Promise((resolve, reject) => {
          const timeout = setTimeout(
            () => reject(new Error("Compression timeout")),
            30000
          );

          worker.onmessage = (e) => {
            clearTimeout(timeout);
            resolve(e.data);
          };

          worker.onerror = () => {
            clearTimeout(timeout);
            reject(new Error("Worker error"));
          };

          worker.postMessage({
            file: img.file,
            quality,
            format,
            width,
            height,
            maintainRatio,
            targetSizeKB: targetSizeKB || null,
          });
        });

        if (result.success) {
          updatedImages.push({
            ...img,
            compressedBlob: result.blob,
            compressedUrl: URL.createObjectURL(result.blob),
            compressedSize: result.size,
            targetSizeKB: result.targetSizeKB || undefined,
            targetReached: result.targetReached,
            outputWidth: result.width,
            outputHeight: result.height,
            qualityUsed: result.qualityUsed,
          });
        } else {
          setError(
            `Failed to compress ${img.file.name}: ${result.error || "Unknown error"}`
          );
        }
      } catch (err: any) {
        setError(`Error compressing ${img.file.name}: ${err.message}`);
      }

      processed++;
      setProgress(Math.round((processed / images.length) * 100));
    }

    worker.terminate();
    setImages(updatedImages);
    setProcessing(false);
    setProgress(0);

    setTimeout(() => {
      downloadRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 300);
  }

  function formatSize(bytes: number) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  function getExtension(type: string) {
    if (type === "image/png") return "png";
    if (type === "image/webp") return "webp";
    return "jpg";
  }

  function getTargetMessage(img: ImgType) {
    if (!img.targetSizeKB || !img.compressedSize) {
      return null;
    }

    const diff = Math.abs(img.compressedSize / 1024 - img.targetSizeKB);

    if (img.targetReached) {
      return `Target met: ${img.targetSizeKB} KB or smaller`;
    }

    return `Closest result: ${formatSize(img.compressedSize)} (${diff.toFixed(1)} KB away from ${img.targetSizeKB} KB)`;
  }

  async function downloadHandler() {
    const readyImages = images.filter((i) => i.compressedBlob);

    if (readyImages.length === 1) {
      const img = readyImages[0];
      const a = document.createElement("a");
      a.href = img.compressedUrl!;

      const ext = getExtension(format);
      const nameWithoutExt = img.file.name.replace(/\.[^/.]+$/, "");

      a.download = `compressed-${nameWithoutExt}.${ext}`;
      a.click();
      return;
    }

    if (readyImages.length > 1) {
      const zip = new JSZip();

      readyImages.forEach((img) => {
        const ext = getExtension(format);
        const nameWithoutExt = img.file.name.replace(/\.[^/.]+$/, "");

        zip.file(`compressed-${nameWithoutExt}.${ext}`, img.compressedBlob!);
      });

      const content = await zip.generateAsync({
        type: "blob",
      });

      const a = document.createElement("a");
      a.href = URL.createObjectURL(content);
      a.download = "compressed-images.zip";
      a.click();
    }
  }

  return (
    <div className="tool-root">
      <section className="tool-hero" id="tool">
        <h1>Online Image Compressor</h1>
        <p>
          Compress JPG, PNG and WEBP instantly. Target 20KB, 50KB, 100KB or 200KB
          without uploading your files.
        </p>
      </section>

      <div className="tool-wrapper">
        <div className="tool-content">
          {error && <div className="tool-alert">{error}</div>}

          <motion.div
            className="upload-panel"
            onClick={openPicker}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <p>Click to Upload Image(s)</p>
            <p style={{ marginTop: 10 }}>You can upload single or multiple images at once</p>
          </motion.div>

          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFiles}
            className="hidden-input"
          />

          {images.length > 0 && (
            <>
              <div className="tool-card">
                <h3>Choose size and format</h3>

                <div className="target-size-section">
                  <label htmlFor="target-size">Target file size in KB (optional)</label>
                  <div className="quality-presets">
                    {targetPresets.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        className={`preset-button ${targetSizeKB === preset ? "active" : ""}`}
                        onClick={() =>
                          setTargetSizeKB((current) => (current === preset ? "" : preset))
                        }
                      >
                        {preset} KB
                      </button>
                    ))}
                  </div>
                  <input
                    id="target-size"
                    type="number"
                    min="1"
                    placeholder="Enter target size in KB"
                    value={targetSizeKB}
                    onChange={(e) =>
                      setTargetSizeKB(e.target.value ? Number(e.target.value) : "")
                    }
                  />
                  <p className="control-helper">
                    Exact-size targeting works best with JPG or WEBP. Leave it blank for
                    manual quality-based compression.
                  </p>
                </div>

                <div className="quality-presets">
                  {qualityPresets.map((preset) => (
                    <button
                      key={preset.value}
                      type="button"
                      className={`preset-button ${quality === preset.value ? "active" : ""}`} 
                      onClick={() => setQuality(preset.value)}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                <label>Quality ceiling: {Math.round(quality * 100)}%</label>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.1"
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                />

                <div className="control-row">
                  <input
                    type="number"
                    placeholder="Width"
                    value={width}
                    onChange={(e) =>
                      setWidth(e.target.value ? Number(e.target.value) : "")
                    }
                  />
                  <input
                    type="number"
                    placeholder="Height"
                    value={height}
                    onChange={(e) =>
                      setHeight(e.target.value ? Number(e.target.value) : "")
                    }
                  />
                </div>

                <label>
                  <input
                    type="checkbox"
                    checked={maintainRatio}
                    onChange={() => setMaintainRatio(!maintainRatio)}
                  />
                  Maintain Ratio
                </label>

                <div className="select-control">
                  <select value={format} onChange={(e) => setFormat(e.target.value)}>
                    <option value="image/jpeg">JPG</option>
                    <option value="image/png">PNG</option>
                    <option value="image/webp">WEBP</option>
                  </select>
                </div>

                <motion.button
                  className="compress-button"
                  onClick={compressImages}
                  disabled={processing}
                  whileHover={{ scale: processing ? 1 : 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.1 }}
                >
                  {processing ? `Processing... ${progress}%` : "Compress Images"}
                </motion.button>

                {processing && (
                  <div className="progress-wrapper">
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: `${progress}%` }} />
                    </div>
                    <p className="footnote">
                      Compressing {Math.round((progress / 100) * images.length)} of {images.length} images...
                    </p>
                  </div>
                )}
              </div>

              <div className="preview-grid">
                {images.map((img, i) => (
                  <motion.div
                    key={i}
                    className="preview-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                  >
                    {img.compressedSize && (
                      <>
                        <div className="comparison-frame">
                          <img src={img.preview} alt="Original" />

                          <div
                            className="comparison-overlay"
                            style={{ width: `${comparisonSliders[i] ?? 50}%` }}
                          >
                            <img
                              src={img.compressedUrl}
                              alt="Compressed"
                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                          </div>

                          <div
                            className="comparison-handle"
                            style={{ left: `${comparisonSliders[i] ?? 50}%` }}
                          />

                          <div className="comparison-labels">Original</div>
                          <div className="comparison-labels">Compressed</div>

                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={comparisonSliders[i] ?? 50}
                            onChange={(e) =>
                              setComparisonSliders({
                                ...comparisonSliders,
                                [i]: Number(e.target.value),
                              })
                            }
                            className="comparison-slider"
                          />
                        </div>
                        <p className="footnote" style={{ marginTop: 10 }}>
                          Drag the slider to compare
                        </p>
                      </>
                    )}

                    <div className="compression-stats">
                      <div className="stat-pill">
                        <strong>{formatSize(img.originalSize)}</strong>
                        <span>Original Size</span>
                      </div>

                      {img.compressedSize && (
                        <>
                          <div className="stat-pill" style={{ background: "#f0fdf4", borderColor: "#10b981" }}>
                            <strong>{formatSize(img.compressedSize)}</strong>
                            <span>Compressed Size</span>
                          </div>

                          <div className="stat-pill" style={{ background: "#fef3c7", borderColor: "#f59e0b" }}>
                            <strong>
                              {(100 - (img.compressedSize / img.originalSize) * 100).toFixed(1)}%
                            </strong>
                            <span>Reduction</span>
                          </div>
                        </>
                      )}
                    </div>

                    <p className="footnote">
                      {img.file.name} | {img.file.type || "image"}
                    </p>
                    {img.outputWidth && img.outputHeight && (
                      <p className="footnote">
                        Output: {img.outputWidth} x {img.outputHeight}px
                        {img.qualityUsed
                          ? ` at ${(img.qualityUsed * 100).toFixed(0)}% quality`
                          : ""}
                      </p>
                    )}
                    {getTargetMessage(img) && (
                      <p className={`footnote ${img.targetReached ? "target-success" : "target-note"}`}>
                        {getTargetMessage(img)}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>

              <motion.button
                ref={downloadRef}
                className="download-button"
                onClick={downloadHandler}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.1 }}
              >
                Download Compressed
              </motion.button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
