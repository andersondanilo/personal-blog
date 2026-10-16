import Image from "next/image";
import { githubProfileUrl, linkedinProfileUrl } from "@/lib/config";
import { getGitHubProfile } from "@/lib/github";
import { GitHubIcon } from "./github-icon";
import { LinkedInIcon } from "./linkedin-icon";

export async function ProfileCard() {
  const profile = await getGitHubProfile();
  const name = profile.name ?? profile.login;

  return (
    <section className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:text-left">
      <Image
        src={profile.avatar_url}
        alt={`Photo of ${name}`}
        width={128}
        height={128}
        preload
        className="size-24 shrink-0 rounded-full border border-border sm:size-32"
      />
      <div className="flex flex-col gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {name}
          </h1>
          {profile.bio && <p className="mt-1 text-muted">{profile.bio}</p>}
        </div>
        <div className="flex items-center justify-center gap-3 sm:justify-start">
          <a
            href={githubProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`@${profile.login} on GitHub`}
            title="GitHub"
            className="inline-flex size-10 items-center justify-center rounded-full bg-foreground text-background transition-opacity hover:opacity-85"
          >
            <GitHubIcon className="size-5" />
          </a>
          <a
            href={linkedinProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} on LinkedIn`}
            title="LinkedIn"
            className="inline-flex size-10 items-center justify-center rounded-full bg-foreground text-background transition-opacity hover:opacity-85"
          >
            <LinkedInIcon className="size-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
