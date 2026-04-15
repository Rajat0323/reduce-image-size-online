"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

type Props = {
  slug: string;
  status: string;
};

export default function SeoArticleAdminActions({ slug, status }: Props) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function publishDraft() {
    setMessage("");
    startTransition(async () => {
      try {
        const response = await fetch(`/api/admin/articles/${slug}/publish`, {
          method: "POST",
          cache: "no-store",
        });

        if (!response.ok) {
          const error = (await response.json().catch(() => null)) as { detail?: string } | null;
          throw new Error(error?.detail || "Publishing failed.");
        }

        setMessage("Draft published successfully.");
        router.refresh();
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "Publishing failed.");
      }
    });
  }

  return (
    <div className="article-actions article-actions-wrap">
      {status !== "published" ? (
        <button className="btn btn-primary" type="button" onClick={publishDraft} disabled={isPending}>
          {isPending ? "Publishing..." : "Publish draft"}
        </button>
      ) : null}

      <Link className="btn btn-ghost" href="/articles">
        Public article hub
      </Link>

      {status === "published" ? (
        <Link className="btn btn-ghost" href={`/articles/${slug}`}>
          Open public page
        </Link>
      ) : null}

      {message ? <p className="admin-feedback">{message}</p> : null}
    </div>
  );
}
