import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatsSection from "../components/dashboard/StatsSection";
import { usePostStore } from "../store/postStore";

export default function DashboardPage() {
  const posts = usePostStore((state) => state.posts);

  const published = posts.filter(
    (post) => post.status === "published"
  ).length;

  const draft = posts.filter(
    (post) => post.status === "draft"
  ).length;

  const expired = posts.filter(
    (post) => post.status === "expired"
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
      </div>
    </main>
  );
}