import type { PostResponse } from "../../types/api/post";
import PostCard from "../post/PostCard";

interface Props {
  posts: PostResponse[];
}

export default function FeedGrid({
  posts,
}: Props) {
  if (posts.length === 0) {
    return (
      <div className="py-20 text-center text-slate-500">
        No advertisements available.
      </div>
    );
  }

  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-2 lg:grid-cols-3">

      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
        />
      ))}

    </section>
  );
}