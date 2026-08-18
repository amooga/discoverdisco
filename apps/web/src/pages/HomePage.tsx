import { useEffect, useState } from "react";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import FeedGrid from "../components/feed/FeedGrid";
import LocationPrompt from "../components/location/LocationPrompt";
import NearbyOffersSection from "../components/home/NearbyOffersSection";
import LocationSelector from "../components/location/LocationSelector";

import { usePostStore } from "../store/postStore";
import { getSavedLocation, saveLocation } from "../services/location.storage";

export default function HomePage() {
  const {
    feed,
    loadFeed,
    loading,
  } = usePostStore();

  const loadNearbyPosts = usePostStore(
    (state) => state.loadNearbyPosts
  );

  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    loadFeed().catch(console.error);
  }, [loadFeed]);

  useEffect(() => {
    const savedLocation = getSavedLocation();

    if (!savedLocation) {
      return;
    }

    setUserLocation(savedLocation);

    void loadNearbyPosts(
      savedLocation.latitude,
      savedLocation.longitude,
      5
    );
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">

      <Navbar />

      {/* Hero Section */}

      <section className="bg-gradient-to-r from-orange-500 to-orange-400 text-white">

        <div className="mx-auto max-w-7xl px-6 py-20">

          <h1 className="max-w-3xl text-5xl font-bold leading-tight">
            Discover Amazing Offers
            <br />
            Around You
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-orange-100">
            Explore discounts, promotions and services
            from trusted local businesses near you.
          </p>

          {/* Search */}

          <div className="mt-10 flex flex-col gap-4 rounded-3xl bg-white p-4 shadow-xl md:flex-row">

            <input
              type="text"
              placeholder="Search for shops, offers..."
              className="flex-1 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-slate-900 placeholder:text-slate-400 outline-none focus:border-orange-500"
            />

            <button
              className="rounded-2xl bg-orange-500 px-8 py-4 font-semibold text-white transition hover:bg-orange-600"
            >
              Search
            </button>

          </div>

        </div>

      </section>

      {/* Featured Title */}

      <section className="mx-auto mt-12 max-w-7xl px-6">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-3xl font-bold text-slate-900">
              Latest Advertisements
            </h2>

            <p className="mt-2 text-slate-500">
              Fresh offers from businesses around your locality.
            </p>

          </div>

        </div>

      </section>


      {/* User Location  */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
       <LocationSelector
          location={userLocation}
          onLocationChange={async (
            latitude,
            longitude
          ) => {
            const location = {
              latitude,
              longitude,
            };

            setUserLocation(location);
            saveLocation(location);

            await loadNearbyPosts(
              latitude,
              longitude,
              5
            );
          }}
        />
      </div>

      <NearbyOffersSection />

      {/* Feed */}

      {loading ? (

        <div className="py-24 text-center text-slate-500">
          Loading advertisements...
        </div>

      ) : (

        <FeedGrid posts={feed} />

      )}

      <Footer />

    </main>
  );
}