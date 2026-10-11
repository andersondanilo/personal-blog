import Image from "next/image";
import Link from "next/link";
import { getArticles } from "@/lib/devto";
import { formatDate } from "@/lib/format";

export async function PostList() {
  const articles = await getArticles();

  if (articles.length === 0) {
    return <p className="text-muted">No posts yet.</p>;
  }

  return (
    <ul className="grid gap-6 sm:grid-cols-2">
      {articles.map((article) => (
        <li key={article.id}>
          <Link
            href={`/posts/${article.slug}`}
            className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg"
          >
            {article.cover_image && (
              <Image
                src={article.cover_image}
                alt=""
                width={1000}
                height={420}
                sizes="(min-width: 896px) 430px, (min-width: 640px) 50vw, 100vw"
                className="aspect-[1000/420] w-full object-cover"
              />
            )}
            <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
              <p className="text-xs text-muted">
                <time dateTime={article.published_at}>
                  {formatDate(article.published_at)}
                </time>
                {" · "}
                {article.reading_time_minutes} min read
              </p>
              <h3 className="text-lg font-semibold leading-snug group-hover:text-accent">
                {article.title}
              </h3>
              <p className="line-clamp-3 text-sm text-muted">
                {article.description}
              </p>
              {article.tag_list.length > 0 && (
                <ul className="mt-auto flex flex-wrap gap-2 pt-2">
                  {article.tag_list.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-border px-2 py-0.5 text-xs text-muted"
                    >
                      #{tag}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
