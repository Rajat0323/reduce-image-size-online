import fs from "fs";
import path from "path";
import Link from "next/link";

export default function BlogPage() {
  const blogDir = path.join(process.cwd(), "src/content/blog");

  const files = fs
    .readdirSync(blogDir)
    .filter((file) => file.endsWith(".md"));

  const blogs = files.map((file) => {
    const slug = file.replace(".md", "");
    return {
      slug,
      title: slug.replace(/-/g, " "),
    };
  });

  return (
    <div style={{ background: "#f8fbff", minHeight: "100vh", padding: "80px 20px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        
        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <h1 style={{ fontSize: 44, marginBottom: 15 }}>
            Image Optimization Blog
          </h1>
          <p style={{ color: "#64748b", fontSize: 18 }}>
            Learn how to reduce image size, improve performance and boost SEO.
          </p>
        </div>

        {/* Blog Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 30,
          }}
        >
          {blogs.map((blog) => (
            <Link
              key={blog.slug}
              href={`/blog/${blog.slug}`}
              style={{
                background: "white",
                padding: 30,
                borderRadius: 18,
                boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
                textDecoration: "none",
                transition: "all 0.2s ease",
                border: "1px solid #e2e8f0",
              }}
            >
              <h2 style={{ fontSize: 22, color: "#1e3a8a", marginBottom: 12 }}>
                {blog.title}
              </h2>

              <p style={{ color: "#475569", fontSize: 15 }}>
                Click to read full article →
              </p>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
