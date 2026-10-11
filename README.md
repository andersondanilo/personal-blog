# Personal Blog

A Next.js blog that reads its content from two places:

- **Profile** (name, photo, bio, location) from the GitHub API: https://github.com/andersondanilo
- **Posts** from the dev.to API: https://dev.to/andersondanilo

Both are cached and refreshed every hour (`cacheLife("hours")`), so new dev.to posts and profile changes show up without a redeploy.

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Configuration

- Usernames live in `src/lib/config.ts`.
- `GITHUB_TOKEN` (optional): set it to raise the GitHub API rate limit from 60 to 5000 requests/hour.

## Structure

- `src/lib/github.ts`, `src/lib/devto.ts`: API clients
- `src/app/page.tsx`: profile + post list
- `src/app/posts/[slug]/page.tsx`: a single post, rendered from dev.to's `body_html`
