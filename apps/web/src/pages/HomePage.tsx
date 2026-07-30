import { useMemo, useState } from "react";
import HomeHeader from "../components/home/HomeHeader";
import SearchBar from "../components/home/SearchBar";
import CategoryChips from "../components/home/CategoryChips";
import AdvertisementGrid from "../components/home/AdvertisementGrid";
import { usePostStore } from "../store/postStore";

export default function HomePage() {
  const posts = usePostStore((state) => state.posts);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || post.category === category;

      return (
        post.status === "published" &&
        matchesSearch &&
        matchesCategory
      );
    });
  }, [posts, search, category]);

  return (
    <main className="min-h-screen bg-slate-50">
      <HomeHeader />

      <div className="mx-auto max-w-7xl space-y-8 px-6 py-8">
        <SearchBar
          value={search}
          onChange={setSearch}
        />

        <CategoryChips
          selected={category}
          onSelect={setCategory}
        />

        <AdvertisementGrid posts={filteredPosts} />
      </div>
    </main>
  );
}