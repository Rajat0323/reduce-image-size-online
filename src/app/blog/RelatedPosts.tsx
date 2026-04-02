import Link from "next/link";

import { getAllPosts } from "@/lib/blog";

export default function RelatedPosts({ currentSlug }: { currentSlug: string }) {
  const posts = getAllPosts()
    .filter((post) => post.slug !== currentSlug)
    .slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section className="blog-stack">
      <div>
        <p className="section-heading">Related articles</p>
        <p className="section-subtitle">
          Keep exploring exact-size workflows, quality tips, and practical image optimization
          strategies.
        </p>
      </div>

      <div className="blog-card-grid">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
            <span className="eyebrow-link">Related guide</span>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <div className="blog-card-footer">
              <span>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <span className="blog-card-cta">Read next</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
