import type { PostResponse } from "../../types/api/post";

interface Props {
  posts: PostResponse[];
}

export default function MyAdvertisements({
  posts,
}: Props) {
  if (posts.length === 0) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold">
          My Advertisements
        </h2>

        <p className="mt-6 text-slate-500">
          You haven't published any advertisements yet.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-6">
        <h2 className="text-2xl font-bold">
          My Advertisements
        </h2>
      </div>

      <div className="divide-y">
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex items-center justify-between p-6"
          >
            <div>
              <h3 className="font-semibold text-slate-900">
                {post.title}
              </h3>

              <p className="text-sm text-slate-500">
                {post.category.name}
              </p>
            </div>

            <div className="text-right">
              <div className="font-medium">
                {post.status}
              </div>

              <div className="text-sm text-slate-500">
                👁 {post.views}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}