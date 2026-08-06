import { useEffect } from "react";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatsSection from "../components/dashboard/StatsSection";
import { usePostStore } from "../store/postStore";
import MyAdvertisements from "../components/dashboard/MyAdvertisements";

export default function DashboardPage() {
  const posts = usePostStore((state) => state.posts);
  const loading = usePostStore((state) => state.loading);
  const loadPosts = usePostStore((state) => state.loadPosts);

  useEffect(() => {
    loadPosts().catch(console.error);
  }, [loadPosts]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        Loading...
      </main>
    );
  }

  const published = posts.filter(
    (post) => post.status === "ACTIVE"
  ).length;

  const draft = posts.filter(
    (post) => post.status === "DRAFT"
  ).length;

  const expired = posts.filter(
    (post) => post.status === "EXPIRED"
  ).length;

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10">
        <DashboardHeader
          businessName="ABC Stationery"
          address="Dwarka Sector 10, New Delhi"
        />

        <StatsSection
          published={published}
          draft={draft}
          expired={expired}
        />

        <MyAdvertisements posts={posts} />
      </div>
    </main>
  );
}