"use client";

import { useRef, useState } from "react";
import JSZip from "jszip";

type ImgType = {
  file: File;
  preview: string;
  compressedBlob?: Blob;
  compressedUrl?: string;
  originalSize: number;
  compressedSize?: number;
};

export default function ReduceImagePage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const downloadRef = useRef<HTMLButtonElement>(null);

  const [images, setImages] = useState<ImgType[]>([]);
  const [quality, setQuality] = useState(0.8);
  const [format, setFormat] = useState("image/jpeg");
  const [width, setWidth] = useState<number | "">("");
  const [height, setHeight] = useState<number | "">("");
  const [maintainRatio, setMaintainRatio] = useState(true);
  const [processing, setProcessing] = useState(false);

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
  }

  async function compressImages() {
  setProcessing(true);

  const worker = new Worker("/workers/imageWorker.js");

  const updatedImages: ImgType[] = [];

  for (const img of images) {
    const result: any = await new Promise((resolve) => {
      worker.onmessage = (e) => resolve(e.data);

      worker.postMessage({
        file: img.file,
        quality,
        format,
        width,
        height,
        maintainRatio,
      });
    });

    if (result.success) {
      updatedImages.push({
        ...img,
        compressedBlob: result.blob,
        compressedUrl: URL.createObjectURL(result.blob),
        compressedSize: result.size,
      });
    }
  }

  worker.terminate();

  setImages(updatedImages);
  setProcessing(false); // 🔥 VERY IMPORTANT

  setTimeout(() => {
    downloadRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, 300);
}



  function getExtension(type: string) {
    if (type === "image/png") return "png";
    if (type === "image/webp") return "webp";
    return "jpg";
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

        zip.file(
          `compressed-${nameWithoutExt}.${ext}`,
          img.compressedBlob!
        );
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
    <div style={{ background: "#f5f7fb", minHeight: "100vh", padding: "60px 20px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
        <h1 style={{ fontSize: 42, marginBottom: 40 }}>
          Reduce Image Size Online
        </h1>

        {/* Upload Box */}
        <div
          onClick={openPicker}
          style={{
            border: "2px dashed #1a73e8",
            borderRadius: 12,
            padding: 70,
            background: "white",
            cursor: "pointer",
            marginBottom: 50,
          }}
        >
          <p style={{ fontSize: 20, color: "#1a73e8", fontWeight: 600 }}>
            Click to Upload Image(s)
          </p>
          <p style={{ marginTop: 10, color: "#666", fontSize: 14 }}>
            You can upload single or multiple images at once
          </p>
        </div>

        <input
          ref={inputRef}
          type="file"
          multiple
          hidden
          accept="image/*"
          onChange={handleFiles}
        />

        {images.length > 0 && (
          <>
            {/* File Count Info */}
            <div
              style={{
                background: "white",
                padding: 20,
                borderRadius: 12,
                marginBottom: 30,
                boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                fontWeight: 600,
                color: "#1a73e8",
              }}
            >
              {images.length === 1
                ? "1 Image Selected"
                : `${images.length} Images Selected`}
            </div>

            {/* Controls Card */}
            <div
              style={{
                background: "white",
                padding: 40,
                borderRadius: 15,
                marginBottom: 50,
                boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
              }}
            >
              <h3 style={{ marginBottom: 25 }}>
                Choose New Size & Format
              </h3>

              <label>
                Quality: {Math.round(quality * 100)}%
              </label>

              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={quality}
                onChange={(e) =>
                  setQuality(Number(e.target.value))
                }
                style={{ width: "100%", marginBottom: 25 }}
              />

              <div style={{ display: "flex", gap: 20, justifyContent: "center", marginBottom: 20 }}>
                <input
                  type="number"
                  placeholder="Width"
                  value={width}
                  onChange={(e) =>
                    setWidth(
                      e.target.value
                        ? Number(e.target.value)
                        : ""
                    )
                  }
                  style={{ padding: 10 }}
                />
                <input
                  type="number"
                  placeholder="Height"
                  value={height}
                  onChange={(e) =>
                    setHeight(
                      e.target.value
                        ? Number(e.target.value)
                        : ""
                    )
                  }
                  style={{ padding: 10 }}
                />
              </div>

              <label>
                <input
                  type="checkbox"
                  checked={maintainRatio}
                  onChange={() =>
                    setMaintainRatio(!maintainRatio)
                  }
                />
                Maintain Ratio
              </label>

              <div style={{ marginTop: 20 }}>
                <select
                  value={format}
                  onChange={(e) =>
                    setFormat(e.target.value)
                  }
                  style={{ padding: 10 }}
                >
                  <option value="image/jpeg">JPG</option>
                  <option value="image/png">PNG</option>
                  <option value="image/webp">WEBP</option>
                </select>
              </div>

              <button
                onClick={compressImages}
                disabled={processing}
                style={{
                  marginTop: 30,
                  background: "#1a73e8",
                  color: "white",
                  padding: "14px 40px",
                  border: "none",
                  borderRadius: 10,
                  fontSize: 16,
                  cursor: "pointer",
                }}
              >
                {processing ? "Processing..." : "Compress Images"}
              </button>
            </div>

            {/* Preview Cards */}
            <div style={{ display: "grid", gap: 30 }}>
              {images.map((img, i) => (
                <div
                  key={i}
                  style={{
                    background: "white",
                    padding: 30,
                    borderRadius: 15,
                    boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
                  }}
                >
                  <p>
                    Original: {(img.originalSize / 1024).toFixed(1)} KB
                  </p>

                  {img.compressedSize && (
                    <>
                      <p>
                        Compressed:{" "}
                        {(img.compressedSize / 1024).toFixed(1)} KB
                      </p>
                      <p>
                        Saved:{" "}
                        {(
                          100 -
                          (img.compressedSize /
                            img.originalSize) *
                            100
                        ).toFixed(1)}
                        %
                      </p>
                    </>
                  )}

                  <img
                    src={img.preview}
                    width={200}
                    style={{ marginTop: 15, borderRadius: 8 }}
                    alt="preview"
                  />
                </div>
              ))}
            </div>

            <button
              ref={downloadRef}
              onClick={downloadHandler}
              style={{
                marginTop: 40,
                background: "#1a73e8",
                color: "white",
                padding: "16px 50px",
                borderRadius: 12,
                border: "none",
                fontSize: 18,
                cursor: "pointer",
              }}
            >
              Download
            </button>
          </>
        )}
      </div>
    </div>
  );
}
