import SearchBar from "./SearchBar";

export default function Hero() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-16 text-center">
        <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
          📍 Discover advertisements near you
        </span>

        <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-slate-900">
          Discover what's happening
          <br />
          around you.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          Browse offers, new arrivals, events and promotions from businesses in
          your neighbourhood.
        </p>

        <SearchBar />
      </div>
    </section>
  );
}
