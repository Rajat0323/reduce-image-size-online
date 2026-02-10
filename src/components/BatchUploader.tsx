"use client";

import React from "react";

type Props = {
  onFilesSelect: (files: File[]) => void;
};

export default function BatchUploader({ onFilesSelect }: Props) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    onFilesSelect(files);
  }

  return (
    <div className="upload-box clickable">
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleChange}
        className="upload-input"
        id="batchUpload"
      />
      <label htmlFor="batchUpload" className="upload-content">
        <div className="upload-icon">📤</div>
        <p>Upload Single or Multiple Images</p>
        <span>JPG, PNG, WEBP Supported</span>
      </label>
    </div>
  );
}
