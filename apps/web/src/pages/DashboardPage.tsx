import { useEffect } from "react";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatsSection from "../components/dashboard/StatsSection";
import MyAdvertisements from "../components/dashboard/MyAdvertisements";

import { usePostStore } from "../store/postStore";
import BusinessLocation from "../components/dashboard/BusinessLocation";
import { useBusinessStore } from "../store/businessStore";

export default function DashboardPage() {
  const {
    posts,
    loadPosts,
    loading
  } = usePostStore();

  const {
    business,
    loading: businessLoading,
    error: businessError,
    fetchBusiness,
    updateLocation,
  } = useBusinessStore();

  useEffect(() => {
    loadPosts().catch(console.error);
  }, [loadPosts]);

  useEffect(() => {
    void fetchBusiness();
  }, [fetchBusiness]);

  const active = posts.filter(
    (post) => post.status === "ACTIVE"
  ).length;

  const expired = posts.filter((post) => {
    if (!post.validUntil) return false;

    return (
      new Date(post.validUntil) < new Date()
    );
  }).length;

  const draft = posts.filter(
    (post) => post.status === "DRAFT"
  ).length;


  // --------------------------------
  // Business loading
  // --------------------------------
  if (businessLoading && !business) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Navbar />

        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="animate-pulse space-y-6">
            <div className="h-28 rounded-3xl bg-slate-200" />

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
              <div className="h-28 rounded-3xl bg-slate-200" />
              <div className="h-28 rounded-3xl bg-slate-200" />
              <div className="h-28 rounded-3xl bg-slate-200" />
            </div>

            <div className="h-64 rounded-3xl bg-slate-200" />
          </div>
        </div>

        <Footer />
      </main>
    );
  }

  // --------------------------------
  // Business loading error
  // --------------------------------
  if (!business) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Navbar />

        <div className="mx-auto max-w-2xl px-6 py-16">
          <div className="rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm">
            <div className="text-4xl">
              ⚠️
            </div>

            <h1 className="mt-4 text-xl font-bold text-slate-900">
              Unable to load your business
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              {businessError ||
                "Business information could not be loaded."}
            </p>

            <button
              type="button"
              onClick={() => void fetchBusiness()}
              className="mt-6 rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Try Again
            </button>
          </div>
        </div>

        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">

      <Navbar />

      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10">

       <DashboardHeader
          businessName={business?.name || ""}
          address={[
            business?.locality,
            business?.city,
          ]
            .filter(Boolean)
            .join(", ")}
        />

        <StatsSection
          published={active}
          draft={draft}
          expired={expired}
        />

        <BusinessLocation
          latitude={business?.latitude}
          longitude={business?.longitude}
          onSaved={async (
            latitude,
            longitude
          ) => {
            await updateLocation(
              latitude,
              longitude
            );
          }}  
        />

        {loading ? (
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
            Loading advertisements...
          </div>
        ) : (
          <MyAdvertisements posts={posts} />
        )}

      </div>

      <Footer />

    </main>
  );
}