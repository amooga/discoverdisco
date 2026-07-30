interface Props {
  title: string;
  image: string;
  category: string;
  description: string;
}

export default function PostPreview({
  title,
  image,
  category,
  description,
}: Props) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="mb-5 text-xl font-bold">
        Live Preview
      </h2>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">

        <div className="aspect-[4/5] bg-slate-100">

          {image ? (
            <img
              src={image}
              className="h-full w-full object-cover"
              alt=""
            />
          ) : (
            <div className="flex h-full items-center justify-center text-slate-400">
              Poster Preview
            </div>
          )}

        </div>

        <div className="space-y-4 p-6">

          <span className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-600">
            {category}
          </span>

          <h3 className="text-2xl font-bold text-slate-900">
            {title || "Advertisement Title"}
          </h3>

          <p className="text-slate-600">
            {description ||
              "Your advertisement description will appear here."}
          </p>

          <div className="border-t border-slate-200 pt-5">

            <h4 className="font-semibold">
              ABC Stationery
            </h4>

            <p className="text-sm text-slate-500">
              Dwarka Sector 10
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}