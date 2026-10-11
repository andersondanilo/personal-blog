import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { getArticle, getArticles } from "@/lib/devto";
import { formatDate } from "@/lib/format";

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/posts/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: article.url },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      publishedTime: article.published_at,
      images: article.social_image ? [article.social_image] : undefined,
    },
  };
}

async function Article({ params }: Pick<PageProps<"/posts/[slug]">, "params">) {
  const { slug } = await params;
  const article = await getArticle(slug);

  return (
    <article className="flex flex-col gap-6">
      {article.cover_image && (
        <Image
          src={article.cover_image}
          alt=""
          width={1000}
          height={420}
          sizes="(min-width: 896px) 848px, 100vw"
          preload
          className="aspect-[1000/420] w-full rounded-xl object-cover"
        />
      )}
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          {article.title}
        </h1>
        <p className="text-sm text-muted">
          <time dateTime={article.published_at}>
            {formatDate(article.published_at)}
          </time>
          {" · "}
          {article.reading_time_minutes} min read
        </p>
        {article.tags.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-border px-2 py-0.5 text-xs text-muted"
              >
                #{tag}
              </li>
            ))}
          </ul>
        )}
      </header>
      <div
        className="article-body prose prose-neutral max-w-none dark:prose-invert prose-a:text-accent prose-pre:rounded-lg"
        // Rendered HTML of my own post, as returned by the dev.to API.
        dangerouslySetInnerHTML={{ __html: article.body_html }}
      />
      <footer className="flex flex-col gap-2 border-t border-border pt-6 text-sm text-muted sm:flex-row sm:justify-between">
        <span>
          {article.public_reactions_count} reactions ·{" "}
          {article.comments_count} comments
        </span>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          Discuss on dev.to →
        </a>
      </footer>
    </article>
  );
}

export default function PostPage(props: PageProps<"/posts/[slug]">) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <Link href="/" className="text-sm text-muted hover:text-foreground">
        ← All posts
      </Link>
      <Suspense fallback={<p className="text-muted">Loading post…</p>}>
        <Article params={props.params} />
      </Suspense>
    </div>
  );
}
