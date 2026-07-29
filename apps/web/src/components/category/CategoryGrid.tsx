import CategoryCard from "./CategoryCard";
import { categories } from "../../data/categories";

export default function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">
          Browse Categories
        </h2>

        <p className="mt-2 text-slate-500">
          Find local offers by category.
        </p>
      </div>

      <div
        className="
        grid

        grid-cols-2

        gap-5

        md:grid-cols-4

        lg:grid-cols-8
        "
      >
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            title={category.name}
            icon={category.icon}
          />
        ))}
      </div>
    </section>
  );
}