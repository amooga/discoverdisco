import type { PostResponse } from "../../types/api/post";

interface Props {
  post: PostResponse;
}

export default function AdvertisementCard({
  post,
}: Props) {
  return (
    <article className="flex items-center justify-between rounded-2xl border border-slate-200 p-6">

      <div className="flex items-center gap-5">

        <div className="h-24 w-24 overflow-hidden rounded-2xl bg-slate-100">

          {post.imageUrl ? (
            <img
              src={post.imageUrl}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-slate-400">
              No Image
            </div>
          )}

        </div>

        <div>

          <h3 className="text-xl font-semibold">
            {post.title}
          </h3>

          <p className="mt-1 text-slate-500">
            {post.category.name}
          </p>

          <p className="mt-2 line-clamp-2 text-sm text-slate-600">
            {post.description}
          </p>

        </div>

      </div>

      <div className="text-right">

        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
          {post.status}
        </span>

        <div className="mt-4 text-sm text-slate-500">
          👁 {post.views}
        </div>

        <div className="mt-1 text-sm text-slate-500">
          🖱 {post.clicks}
        </div>

      </div>

    </article>
  );
}