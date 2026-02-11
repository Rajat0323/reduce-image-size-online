import fs from "fs";
import path from "path";
import Link from "next/link";

const baseUrl = "https://www.reduceimagesizeonline.com";

export default function RelatedPosts({ currentSlug }: { currentSlug: string }) {
  const blogDir = path.join(process.cwd(), "src/content/blog");
  const files = fs.readdirSync(blogDir);

  const slugs = files
    .map((file) => file.replace(".md", ""))
    .filter((slug) => slug !== currentSlug)
    .slice(0, 3); // show 3 related

  if (slugs.length === 0) return null;

  return (
    <div style={{ marginTop: 60 }}>
      <h3>Related Articles</h3>
      <ul>
        {slugs.map((slug) => (
          <li key={slug}>
            <Link href={`/blog/${slug}`}>
              {slug.replace(/-/g, " ")}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
