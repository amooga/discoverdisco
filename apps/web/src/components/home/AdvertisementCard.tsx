import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Post } from "../../types/post";

interface Props {
  post: Post;
}

export default function AdvertisementCard({
  post,
}: Props) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() =>
        navigate(`/advertisements/${post.id}`)
      }
      className="cursor-pointer overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="aspect-[4/3] bg-slate-200">
        {post.image ? (
          <img
            src={post.image}
            className="h-full w-full object-cover"
            alt={post.title}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-400">
            No Image
          </div>
        )}
      </div>

      <div className="space-y-3 p-5">
        <span className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-600">
          {post.category}
        </span>

        <h2 className="text-xl font-bold text-slate-900">
          {post.title}
        </h2>

        <p className="line-clamp-2 text-slate-600">
          {post.description}
        </p>

        <div className="flex items-center justify-between pt-3">
          <div>
            <p className="font-semibold">
              ABC Stationery
            </p>

            <div className="flex items-center gap-1 text-sm text-slate-500">
              <MapPin size={14} />
              0.8 km
            </div>
          </div>

          <span className="text-orange-500 font-medium">
            View →
          </span>
        </div>
      </div>
    </div>
  );
}