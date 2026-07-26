"use client";

import {
  ChangeEvent,
  DragEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import JSZip from "jszip";

type PageResult = {
  pageNumber: number;
  url: string;
  blob: Blob;
  width: number;
  height: number;
};

const FORMAT_OPTIONS = [
  { label: "PNG", value: "image/png", ext: ".png" },
  { label: "JPG", value: "image/jpeg", ext: ".jpg" },
  { label: "WEBP", value: "image/webp", ext: ".webp" },
] as const;

function formatFileSize(size: number) {
  if (size >= 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  }
  return `${(size / 1024).toFixed(1)} KB`;
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

export default function HomePdfToImageStudio() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<PageResult[]>([]);

  const [format, setFormat] = useState<(typeof FORMAT_OPTIONS)[number]["value"]>("image/png");
  const [quality, setQuality] = useState(92);
  const [scale, setScale] = useState(2);
  const [pageMode, setPageMode] = useState<"all" | "range">("all");
  const [pageFrom, setPageFrom] = useState(1);
  const [pageTo, setPageTo] = useState(1);

  const formatMeta = useMemo(
    () => FORMAT_OPTIONS.find((item) => item.value === format) || FORMAT_OPTIONS[0],
    [format]
  );

  useEffect(() => {
    return () => {
      results.forEach((item) => URL.revokeObjectURL(item.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadPdfInfo(nextFile: File) {
    const pdfjs = await import("pdfjs-dist");
    pdfjs.GlobalWorkerOptions.workerSrc = "/workers/pdf.worker.min.mjs";
    const data = new Uint8Array(await nextFile.arrayBuffer());
    const doc = await pdfjs.getDocument({ data }).promise;
    const count = doc.numPages;
    setPageCount(count);
    setPageFrom(1);
    setPageTo(count);
    await doc.destroy();
  }

  async function hydrateFile(nextFile: File | null | undefined) {
    if (!nextFile) return;

    const isPdf =
      nextFile.type === "application/pdf" || nextFile.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      setError("Please upload a PDF file.");
      return;
    }

    if (nextFile.size > 40 * 1024 * 1024) {
      setError("PDF must be 40 MB or smaller.");
      return;
    }

    try {
      results.forEach((item) => URL.revokeObjectURL(item.url));
      setResults([]);
      setFile(nextFile);
      setError("");
      setProgress(0);
      await loadPdfInfo(nextFile);
    } catch {
      setError("Could not read that PDF. Try another file.");
      setFile(null);
      setPageCount(0);
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

  function clearFile() {
    results.forEach((item) => URL.revokeObjectURL(item.url));
    setResults([]);
    setFile(null);
    setPageCount(0);
    setProgress(0);
    setError("");
  }

  async function onConvert() {
    if (!file) {
      setError("Upload a PDF first.");
      return;
    }

    const from = pageMode === "all" ? 1 : Math.max(1, Math.min(pageFrom, pageCount));
    const to =
      pageMode === "all" ? pageCount : Math.max(from, Math.min(pageTo, pageCount));

    setProcessing(true);
    setError("");
    setProgress(0);

    try {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = "/workers/pdf.worker.min.mjs";
      const data = new Uint8Array(await file.arrayBuffer());
      const doc = await pdfjs.getDocument({ data }).promise;
      const nextResults: PageResult[] = [];
      const total = to - from + 1;

      for (let pageNumber = from; pageNumber <= to; pageNumber += 1) {
        const page = await doc.getPage(pageNumber);
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement("canvas");
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          throw new Error("Canvas is not available");
        }

        await page.render({
          canvasContext: ctx,
          viewport,
        }).promise;

        const blob = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob(
            (value) => {
              if (!value) {
                reject(new Error("Could not export image"));
                return;
              }
              resolve(value);
            },
            format,
            quality / 100
          );
        });

        nextResults.push({
          pageNumber,
          blob,
          url: URL.createObjectURL(blob),
          width: canvas.width,
          height: canvas.height,
        });

        setProgress(Math.round(((pageNumber - from + 1) / total) * 100));
      }

      await doc.destroy();
      results.forEach((item) => URL.revokeObjectURL(item.url));
      setResults(nextResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed");
    } finally {
      setProcessing(false);
    }
  }

  function downloadOne(result: PageResult) {
    const anchor = document.createElement("a");
    const base = (file?.name || "document").replace(/\.pdf$/i, "");
    anchor.href = result.url;
    anchor.download = `${base}-page-${result.pageNumber}${formatMeta.ext}`;
    anchor.click();
  }

  async function downloadAll() {
    if (results.length === 0) return;

    if (results.length === 1) {
      downloadOne(results[0]);
      return;
    }

    const zip = new JSZip();
    const base = (file?.name || "document").replace(/\.pdf$/i, "");
    results.forEach((result) => {
      zip.file(`${base}-page-${result.pageNumber}${formatMeta.ext}`, result.blob);
    });
    const blob = await zip.generateAsync({ type: "blob" });
    const anchor = document.createElement("a");
    anchor.href = URL.createObjectURL(blob);
    anchor.download = `${base}-images.zip`;
    anchor.click();
  }

  return (
    <div className="home-studio" id="converter">
      <div className="home-studio-shell">
        <section
          className={`home-studio-dropzone ${isDragging ? "is-dragging" : ""} ${file ? "has-file" : ""}`}
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
            accept="application/pdf,.pdf"
            onChange={onInputChange}
            className="hidden-input"
          />

          {!file ? (
            <div className="home-studio-empty">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className="home-upload-visual">
                  <UploadIcon />
                </div>
                <h2>Drop your PDF here</h2>
                <p className="home-studio-lead">
                  Convert PDF pages to PNG, JPG, or WEBP in your browser. Private — files stay on
                  your device.
                </p>
                <div className="home-studio-actions">
                  <button
                    type="button"
                    className="home-btn home-btn-primary"
                    onClick={() => inputRef.current?.click()}
                  >
                    Choose PDF
                  </button>
                  <span className="home-studio-hint">PDF only · up to 40 MB</span>
                </div>
                <ul className="home-studio-formats" aria-label="Output formats">
                  {["PDF → PNG", "PDF → JPG", "PDF → WEBP"].map((label) => (
                    <li key={label}>{label}</li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ) : (
            <div className="home-studio-workspace">
              <div className="home-studio-previews home-studio-previews-pdf">
                <article className="home-studio-preview-card">
                  <header>
                    <h3>PDF</h3>
                    <button type="button" className="home-studio-text-btn" onClick={clearFile}>
                      Replace
                    </button>
                  </header>
                  <div className="home-studio-waiting home-pdf-meta">
                    <strong>{file.name}</strong>
                    <p>
                      {formatFileSize(file.size)} · {pageCount} page{pageCount === 1 ? "" : "s"}
                    </p>
                  </div>
                  <dl>
                    <div>
                      <dt>Type</dt>
                      <dd>PDF</dd>
                    </div>
                    <div>
                      <dt>Pages</dt>
                      <dd>{pageCount}</dd>
                    </div>
                    <div>
                      <dt>Status</dt>
                      <dd>{results.length > 0 ? "Converted" : "Ready"}</dd>
                    </div>
                  </dl>
                </article>

                <article className="home-studio-preview-card">
                  <header>
                    <h3>Images</h3>
                    {results.length > 0 && (
                      <span className="home-studio-savings">{results.length} file(s)</span>
                    )}
                  </header>
                  <AnimatePresence mode="wait">
                    {results.length > 0 ? (
                      <motion.div
                        key="results"
                        className="home-pdf-results"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {results.map((result) => (
                          <button
                            key={result.pageNumber}
                            type="button"
                            className="home-pdf-thumb"
                            onClick={() => downloadOne(result)}
                            title={`Download page ${result.pageNumber}`}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={result.url} alt={`Page ${result.pageNumber}`} />
                            <span>
                              Page {result.pageNumber} · {formatFileSize(result.blob.size)}
                            </span>
                          </button>
                        ))}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="waiting"
                        className="home-studio-waiting"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <p>Choose output format, then convert.</p>
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
                  <span className="label">Pages</span>
                  <div className="home-chips" role="group" aria-label="Page range">
                    <button
                      type="button"
                      className={pageMode === "all" ? "active" : ""}
                      onClick={() => setPageMode("all")}
                    >
                      All pages
                    </button>
                    <button
                      type="button"
                      className={pageMode === "range" ? "active" : ""}
                      onClick={() => setPageMode("range")}
                    >
                      Range
                    </button>
                  </div>
                </div>

                {pageMode === "range" && (
                  <div className="home-studio-custom-target">
                    <label className="home-studio-field">
                      <span>From</span>
                      <input
                        type="number"
                        min={1}
                        max={pageCount || 1}
                        value={pageFrom}
                        onChange={(e) => setPageFrom(Number(e.target.value) || 1)}
                      />
                    </label>
                    <label className="home-studio-field">
                      <span>To</span>
                      <input
                        type="number"
                        min={1}
                        max={pageCount || 1}
                        value={pageTo}
                        onChange={(e) => setPageTo(Number(e.target.value) || 1)}
                      />
                    </label>
                  </div>
                )}

                <label className="home-studio-field">
                  <span>Quality: {quality}</span>
                  <input
                    type="range"
                    min={40}
                    max={100}
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                  />
                </label>

                <label className="home-studio-field">
                  <span>Resolution scale: {scale.toFixed(1)}x</span>
                  <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.5}
                    value={scale}
                    onChange={(e) => setScale(Number(e.target.value))}
                  />
                </label>

                {processing && (
                  <div className="home-progress" aria-hidden="true">
                    <i style={{ width: `${Math.max(progress, 12)}%`, animation: "none" }} />
                  </div>
                )}

                <div className="home-studio-cta-row">
                  <button
                    type="button"
                    className="home-btn home-btn-primary"
                    onClick={() => void onConvert()}
                    disabled={processing}
                  >
                    {processing ? `Converting… ${progress}%` : "Convert to image"}
                  </button>
                  <button
                    type="button"
                    className="home-btn home-btn-secondary"
                    onClick={() => void downloadAll()}
                    disabled={results.length === 0}
                  >
                    {results.length > 1 ? "Download ZIP" : "Download"}
                  </button>
                </div>

                <p className="home-studio-note">
                  Conversion runs in your browser. Your PDF is not uploaded to our servers.
                </p>
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
