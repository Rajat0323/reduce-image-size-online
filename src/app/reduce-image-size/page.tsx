import { redirect } from "next/navigation";

type LegacyReduceImageSizePageProps = {
  searchParams?: {
    target?: string;
    format?: string;
  };
};

export default function LegacyReduceImageSizePage({
  searchParams,
}: LegacyReduceImageSizePageProps) {
  const nextSearchParams = new URLSearchParams();

  if (searchParams?.target) {
    nextSearchParams.set("target", searchParams.target);
  }

  if (searchParams?.format) {
    nextSearchParams.set("format", searchParams.format);
  }

  const query = nextSearchParams.toString();
  redirect(query ? `/image-compressor?${query}` : "/image-compressor");
}
