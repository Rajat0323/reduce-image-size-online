import { useState } from "react";

export function useCompression() {
  const [quality, setQuality] = useState(80);

  return { quality, setQuality };
}
