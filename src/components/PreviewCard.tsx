"use client";

type Props = {
  preview: string;
  originalSize: number;
  compressedSize?: number;
};

export default function PreviewCard({
  preview,
  originalSize,
  compressedSize,
}: Props) {
  return (
    <div className="feature-card">
      <img src={preview} width={200} alt="preview" />

      <p>Original: {(originalSize / 1024).toFixed(1)} KB</p>

      {compressedSize && (
        <>
          <p>Compressed: {(compressedSize / 1024).toFixed(1)} KB</p>
          <p>
            Saved:{" "}
            {(100 - (compressedSize / originalSize) * 100).toFixed(1)}%
          </p>
        </>
      )}
    </div>
  );
}
