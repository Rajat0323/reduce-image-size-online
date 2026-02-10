"use client";

import React from "react";

type Props = {
  onFileSelect: (file: File) => void;
};

export default function ImageUploader({ onFileSelect }: Props) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  }

  return (
    <div className="upload-box clickable">
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="upload-input"
        id="singleUpload"
      />
      <label htmlFor="singleUpload" className="upload-content">
        <div className="upload-icon">🖼</div>
        <p>Upload Image</p>
      </label>
    </div>
  );
}
