import { devtoProfileUrl, githubProfileUrl } from "@/lib/config";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-muted sm:flex-row sm:px-6">
        <p>Posts published on dev.to</p>
        <nav className="flex gap-4">
          <a
            href={githubProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href={devtoProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            dev.to
          </a>
        </nav>
      </div>
    </footer>
  );
}
