import { submitAllPagesForIndexing } from "@/lib/searchIndexing";
import { getAllIndexableUrls, getSitemapUrl } from "@/lib/indexableUrls";

async function main() {
  const urls = getAllIndexableUrls();
  console.log(`Submitting ${urls.length} indexable URLs from ${getSitemapUrl()}`);

  const result = await submitAllPagesForIndexing();
  console.log(JSON.stringify(result, null, 2));

  if (!result.indexNow.ok) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
