import type { PostResponse } from "../../types/api/post";
import AdvertisementCard from "./AdvertisementCard";

interface Props {
  posts: PostResponse[];
}

export default function MyAdvertisements({
  posts,
}: Props) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      <div className="mb-8 flex items-center justify-between">

        <div>
          <h2 className="text-2xl font-bold">
            My Advertisements
          </h2>

          <p className="mt-1 text-slate-500">
            Manage all your published advertisements.
          </p>
        </div>

      </div>

      {posts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center">

          <h3 className="text-xl font-semibold">
            No advertisements yet
          </h3>

          <p className="mt-2 text-slate-500">
            Publish your first advertisement to
            reach customers nearby.
          </p>

        </div>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <AdvertisementCard
              key={post.id}
              post={post}
            />
          ))}
        </div>
      )}

    </section>
  );
}