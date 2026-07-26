import { redirect } from "next/navigation";

type Props = {
  params: { slug: string };
};

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { getConsolidationRedirect } = require("@/lib/consolidationRedirects.js") as {
  getConsolidationRedirect: (slug: string) => string | null;
};

export function generateStaticParams() {
  return [];
}

export default function LegacySlugPage({ params }: Props) {
  const consolidated = getConsolidationRedirect(params.slug);
  redirect(consolidated || "/");
}
