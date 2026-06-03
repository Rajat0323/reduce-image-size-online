import { readFile } from "node:fs/promises";
import path from "node:path";

const PUBLIC_DIR = path.join(process.cwd(), "public");

const routes = new Map([
  ["", "index.html"],
  ["jpg-to-pdf-converter", "jpg-to-pdf-converter/index.html"],
  ["blog", "blog/index.html"],
  ["blog/how-to-convert-jpg-to-pdf-online", "blog/how-to-convert-jpg-to-pdf-online/index.html"],
  ["blog/merge-multiple-jpg-files-into-one-pdf", "blog/merge-multiple-jpg-files-into-one-pdf/index.html"],
  ["blog/jpg-vs-pdf-for-documents", "blog/jpg-vs-pdf-for-documents/index.html"]
]);

export async function GET(_request, context) {
  const slugParts = context.params?.slug || [];
  const slug = slugParts.join("/");
  const file = routes.get(slug);

  if (!file) {
    return new Response("Not found", { status: 404 });
  }

  const html = await readFile(path.join(PUBLIC_DIR, file), "utf8");

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate"
    }
  });
}
