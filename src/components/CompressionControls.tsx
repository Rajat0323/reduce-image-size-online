"use client";

import React from "react";

type Props = {
  quality: number;
  setQuality: (v: number) => void;
  format: string;
  setFormat: (v: string) => void;
  width: number | "";
  height: number | "";
  setWidth: (v: number | "") => void;
  setHeight: (v: number | "") => void;
  maintainRatio: boolean;
  setMaintainRatio: (v: boolean) => void;
  onCompress: () => void;
  processing: boolean;
};

export default function CompressionControls({
  quality,
  setQuality,
  format,
  setFormat,
  width,
  height,
  setWidth,
  setHeight,
  maintainRatio,
  setMaintainRatio,
  onCompress,
  processing,
}: Props) {
  return (
    <div className="tool-card">
      <div className="option">
        <label>Quality: {Math.round(quality * 100)}%</label>
        <input
          type="range"
          min="0.1"
          max="1"
          step="0.1"
          value={quality}
          onChange={(e) => setQuality(Number(e.target.value))}
        />
      </div>

      <div className="option">
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

      <div className="option">
        <label>
          <input
            type="checkbox"
            checked={maintainRatio}
            onChange={() => setMaintainRatio(!maintainRatio)}
          />
          Maintain Ratio
        </label>
      </div>

      <div className="option">
        <select value={format} onChange={(e) => setFormat(e.target.value)}>
          <option value="image/jpeg">JPG</option>
          <option value="image/png">PNG</option>
          <option value="image/webp">WEBP</option>
        </select>
      </div>

      <button
        onClick={onCompress}
        className="primary-btn full"
        disabled={processing}
      >
        {processing ? "Processing..." : "Compress Images"}
      </button>
    </div>
  );
}
