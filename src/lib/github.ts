import { cacheLife } from "next/cache";
import { siteConfig } from "./config";

export type GitHubProfile = {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  twitter_username: string | null;
  public_repos: number;
  followers: number;
};

export async function getGitHubProfile(): Promise<GitHubProfile> {
  "use cache";
  cacheLife("hours");

  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  // Optional: raises the rate limit from 60 to 5000 requests/hour.
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const res = await fetch(
    `https://api.github.com/users/${siteConfig.githubUsername}`,
    { headers },
  );
  if (!res.ok) {
    throw new Error(`GitHub API responded with ${res.status}`);
  }
  return res.json();
}
