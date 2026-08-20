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

  const business = useBusinessStore((state) => state.business);
  useEffect(() => {
    loadPosts().catch(console.error);
  }, [loadPosts]);

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

  return (
    <main className="min-h-screen bg-slate-50">

      <Navbar />

      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10">

        <DashboardHeader
          businessName="ABC Stationery"
          address="Dwarka Sector 10, New Delhi"
        />

        <StatsSection
          published={active}
          draft={draft}
          expired={expired}
        />

        <BusinessLocation
          latitude={business?.latitude}
          longitude={business?.longitude}
          onSaved={(latitude, longitude) => {
            console.log(
              "Business location saved:",
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