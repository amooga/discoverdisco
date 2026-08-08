import { useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useCategoryStore } from "../store/category.store";

export default function CategoriesPage() {
  const {
    categories,
    loadCategories,
  } = useCategoryStore();

  useEffect(() => {
    loadCategories().catch(console.error);
  }, [loadCategories]);

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-4xl font-bold text-slate-900">
          Browse Categories
        </h1>

        <p className="mt-3 text-slate-600">
          Explore offers by category.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => (
            <button
              key={category.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-orange-400 hover:shadow-lg"
            >
              <h2 className="text-xl font-semibold text-slate-900">
                {category.name}
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                View all {category.name.toLowerCase()} offers
              </p>
            </button>
          ))}
        </div>

        {categories.length === 0 && (
          <div className="mt-12 rounded-2xl bg-white p-10 text-center shadow-sm">
            <p className="text-slate-500">
              No categories available.
            </p>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}