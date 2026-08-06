import type { PostResponse } from "../../types/api/post";

interface Props {
  post: PostResponse;
  editable?: boolean;
}

export default function PostCard({
  post,
  editable = false,
}: Props) {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

      <div className="aspect-[4/3] bg-slate-100">
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

      <div className="space-y-3 p-5">

        <div className="flex items-center justify-between">

          <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
            {post.category.name}
          </span>

          <span className="text-xs text-slate-500">
            👁 {post.views}
          </span>

        </div>

        <h2 className="text-xl font-bold text-slate-900">
          {post.title}
        </h2>

        <p className="line-clamp-2 text-sm text-slate-600">
          {post.description}
        </p>

        <div className="border-t border-slate-100 pt-4">

          <div className="font-medium">
            {post.business.name}
          </div>

          <div className="text-sm text-slate-500">
            {post.business.locality}
          </div>

        </div>

        {editable && (
          <div className="flex gap-3 pt-2">

            <button className="rounded-xl border px-4 py-2">
              Edit
            </button>

            <button className="rounded-xl border border-red-200 px-4 py-2 text-red-600">
              Delete
            </button>

          </div>
        )}

      </div>

    </article>
  );
}