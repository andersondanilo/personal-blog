import { getArticles } from "@/lib/devto";
import { siteConfig } from "@/lib/config";
import { getGitHubProfile } from "@/lib/github";

const escape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function GET() {
  const [profile, articles] = await Promise.all([
    getGitHubProfile(),
    getArticles(),
  ]);
  const name = profile.name ?? profile.login;
  const { siteUrl } = siteConfig;

  const items = articles
    .map((article) => {
      const link = `${siteUrl}/posts/${article.slug}`;
      return `    <item>
      <title>${escape(article.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${new Date(article.published_at).toUTCString()}</pubDate>
      <description>${escape(article.description)}</description>
${article.tag_list.map((tag) => `      <category>${escape(tag)}</category>\n`).join("")}    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(`${name} · Blog`)}</title>
    <link>${siteUrl}</link>
    <description>${escape(profile.bio ?? `Blog posts by ${name}`)}</description>
    <language>en</language>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate",
    },
  });
}
