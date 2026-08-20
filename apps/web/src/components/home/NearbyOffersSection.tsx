import { usePostStore } from "../../store/postStore";

export default function NearbyOffersSection() {
  const nearbyPosts = usePostStore((state) => state.nearbyPosts);
  const nearbyLoading = usePostStore((state) => state.nearbyLoading);

  if (nearbyLoading) {
    return (
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-5">
            <p className="text-sm font-semibold text-orange-500">
            📍 NEAR YOU
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
            Finding offers near you...
            </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
            <div
                key={item}
                className="h-72 animate-pulse rounded-3xl bg-slate-100"
            />
            ))}
        </div>
        </section>
    );
	}

  if (!nearbyPosts.length) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center">
          <div className="text-4xl">📍</div>

          <h2 className="mt-3 text-xl font-bold text-slate-900">
            No nearby offers yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
            We couldn't find any active advertisements
            within your selected area.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="text-sm font-semibold text-orange-500">
            📍 NEAR YOU
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
            Offers near you
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Discover what's happening around you.
          </p>
        </div>

        <span className="hidden rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600 sm:block">
          Within 5 km
        </span>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {nearbyPosts.map((post) => (
          <article
            key={post.id}
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            {post.imageUrl ? (
              <img
                src={post.imageUrl}
                alt={post.title}
                className="h-48 w-full object-cover"
              />
            ) : (
              <div className="flex h-48 items-center justify-center bg-gradient-to-br from-orange-100 to-amber-50">
                <span className="text-5xl">🏪</span>
              </div>
            )}

            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold text-slate-900">
                    {post.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {post.description}
                  </p>
                </div>
              </div>

              {post.distanceKm !== undefined && (
                <div className="mt-4 inline-flex rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                  📍 {post.distanceKm} km away
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}