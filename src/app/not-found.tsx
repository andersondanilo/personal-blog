import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="text-muted">This post doesn&apos;t exist or was removed.</p>
      <Link href="/" className="text-accent hover:underline">
        Back to the blog
      </Link>
    </div>
  );
}
