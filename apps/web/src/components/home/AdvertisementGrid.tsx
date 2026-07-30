import AdvertisementCard from "./AdvertisementCard";
import type { Post } from "../../types/post";

interface Props {
  posts: Post[];
}

export default function AdvertisementGrid({
  posts,
}: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {posts.map((post) => (
        <AdvertisementCard
          key={post.id}
          post={post}
        />
      ))}
    </div>
  );
}