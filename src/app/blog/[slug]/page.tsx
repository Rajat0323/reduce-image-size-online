import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
};

export default function BlogPost({ params }: Props) {
  const blogDir = path.join(process.cwd(), "src/content/blog");
  const filePath = path.join(blogDir, `${params.slug}.md`);

  if (!fs.existsSync(filePath)) {
    return notFound();
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(fileContent);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 60 }}>
      <h1 style={{ fontSize: 40 }}>{data.title || params.slug}</h1>
      <div style={{ marginTop: 30, lineHeight: 1.8 }}>
        {content}
      </div>
    </div>
  );
}
