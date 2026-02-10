"use client";

type Props = {
  onDownload: () => void;
};

export default function DownloadButton({ onDownload }: Props) {
  return (
    <button onClick={onDownload} className="primary-btn full">
      Download Images
    </button>
  );
}
