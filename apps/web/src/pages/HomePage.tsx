import { useEffect } from "react";
import FeedGrid from "../components/feed/FeedGrid";
import { usePostStore } from "../store/postStore";

export default function HomePage() {
  const {
    feed,
    loadFeed,
  } = usePostStore();

  useEffect(() => {
    loadFeed();
  }, [loadFeed]);

  return (
    <main className="min-h-screen bg-slate-50">

      <section className="border-b bg-white">

        <div className="mx-auto max-w-7xl px-6 py-14">

          <h1 className="text-5xl font-bold">
            Discover Amazing Offers Nearby
          </h1>

          <p className="mt-4 max-w-xl text-lg text-slate-500">
            Find discounts, deals and services from
            businesses around you.
          </p>

        </div>

      </section>

      <FeedGrid posts={feed} />

    </main>
  );
}