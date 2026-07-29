import AdvertisementCard from "./AdvertisementCard";
import { advertisements } from "../../data/advertisements";

export default function AdvertisementGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">
            Trending Near You
          </h2>

          <p className="mt-2 text-slate-500">
            Local businesses are promoting these offers.
          </p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {advertisements.map((advertisement) => (
          <AdvertisementCard
            key={advertisement.id}
            advertisement={advertisement}
          />
        ))}
      </div>
    </section>
  );
}