import Image from "next/image";
import Link from "next/link";
import { githubProfileUrl } from "@/lib/config";
import { getGitHubProfile } from "@/lib/github";
import { GitHubIcon } from "./github-icon";

export async function SiteHeader() {
  const profile = await getGitHubProfile();
  const name = profile.name ?? profile.login;

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-2 font-semibold">
          <Image
            src={profile.avatar_url}
            alt=""
            width={32}
            height={32}
            className="size-8 shrink-0 rounded-full"
          />
          <span className="truncate">{name}</span>
        </Link>
        <a
          href={githubProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex shrink-0 items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm transition-colors hover:bg-card"
        >
          <GitHubIcon className="size-4" />
          <span className="hidden sm:inline">GitHub</span>
          <span className="sr-only sm:hidden">GitHub profile</span>
        </a>
      </div>
    </header>
  );
}
