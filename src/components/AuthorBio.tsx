import Link from "next/link";

import { SITE_AUTHOR } from "@/seo/author";

type AuthorBioProps = {
  variant?: "compact" | "full";
  className?: string;
};

export default function AuthorBio({ variant = "full", className = "" }: AuthorBioProps) {
  const bio = variant === "compact" ? SITE_AUTHOR.bioShort : SITE_AUTHOR.bioLong;

  return (
    <aside className={`author-bio ${className}`.trim()} aria-label="About the author">
      <div className="author-bio-header">
        <div className="author-bio-avatar" aria-hidden="true">
          {SITE_AUTHOR.name
            .split(" ")
            .map((part) => part[0])
            .join("")}
        </div>
        <div>
          <p className="author-bio-eyebrow">Written by</p>
          <h3 className="author-bio-name">
            <Link href="/about">{SITE_AUTHOR.name}</Link>
          </h3>
          <p className="author-bio-role">
            {SITE_AUTHOR.jobTitle}, {SITE_AUTHOR.organization}
          </p>
        </div>
      </div>

      <p className="author-bio-text">{bio}</p>

      {variant === "full" && (
        <>
          <div className="author-bio-columns">
            <div>
              <h4>Experience</h4>
              <ul>
                {SITE_AUTHOR.experience.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Areas of expertise</h4>
              <ul>
                {SITE_AUTHOR.expertise.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <p className="author-bio-footer">
            Questions or corrections?{" "}
            <Link href="/contact">Contact {SITE_AUTHOR.name.split(" ")[0]}</Link> ·{" "}
            <Link href="/about">Full profile</Link>
          </p>
        </>
      )}
    </aside>
  );
}
