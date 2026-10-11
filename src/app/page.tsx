import { PostList } from "@/components/post-list";
import { ProfileCard } from "@/components/profile-card";

export default function Home() {
  return (
    <div className="flex flex-col gap-12">
      <ProfileCard />
      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Latest posts
        </h2>
        <PostList />
      </section>
    </div>
  );
}
