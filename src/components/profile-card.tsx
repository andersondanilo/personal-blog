import Image from "next/image";
import { githubProfileUrl } from "@/lib/config";
import { getGitHubProfile } from "@/lib/github";
import { GitHubIcon } from "./github-icon";

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
        <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-muted sm:justify-start">
          {profile.company && <li>🏢 {profile.company}</li>}
          {profile.location && <li>📍 {profile.location}</li>}
          <li>{profile.public_repos} repositories</li>
          <li>{profile.followers} followers</li>
        </ul>
        <div>
          <a
            href={githubProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-85"
          >
            <GitHubIcon className="size-4" />
            Follow @{profile.login} on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
