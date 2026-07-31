import { Heart, MapPin } from "lucide-react";
import type { Post } from "../../types/post";

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  return (
    <article className="group overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-80 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <button className="absolute right-4 top-4 rounded-full bg-white/90 p-2 shadow">
          <Heart className="h-5 w-5 text-slate-700" />
        </button>

        {post.status && (
          <span className="absolute bottom-4 left-4 rounded-full bg-orange-500 px-4 py-2 text-sm font-bold text-white">
            {post.status}
          </span>
        )}
      </div>

      <div className="space-y-3 p-5">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
            {post.category}
          </span>

          {/* {post.featured && (
            <span className="text-xs font-semibold text-orange-600">
              Featured
            </span>
          )} */}
        </div>

        <h3 className="text-xl font-bold text-slate-900">
          {post.title}
        </h3>

        <p className="font-medium text-slate-600">
          {post.businessName}
        </p>

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <MapPin className="h-4 w-4" />
          <span>
            {post.locality} • {post.distance}
          </span>
        </div>
      </div>
    </article>
  );
}