import { devtoProfileUrl, githubProfileUrl } from "@/lib/config";
import { DevToIcon } from "./devto-icon";
import { GitHubIcon } from "./github-icon";
import { RssIcon } from "./rss-icon";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-2 px-4 py-6 text-sm text-muted sm:flex-row sm:px-6">
        <nav className="flex gap-4">
          <a
            href={githubProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-foreground"
          >
            <GitHubIcon className="size-4" />
            GitHub
          </a>
          <a
            href={devtoProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-foreground"
          >
            <DevToIcon className="size-4" />
            dev.to
          </a>
          <a
            href="/feed.xml"
            className="inline-flex items-center gap-1.5 hover:text-foreground"
          >
            <RssIcon className="size-4" />
            RSS
          </a>
        </nav>
      </div>
    </footer>
  );
}
