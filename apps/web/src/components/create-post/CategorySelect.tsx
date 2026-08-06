import { useEffect, useState } from "react";

import {
  getCategories,
  type Category,
} from "../../services/category.service";

interface Props {
  value: string;
  onChange: (value: string, name: string) => void;
}

export default function CategorySelect({
  value,
  onChange,
}: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
        try {
          const data = await getCategories();

          setCategories(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
    }

    loadCategories();
  }, []);

  if (loading) {
    return <p>Loading categories...</p>;
  }

  console.log("Categories:", categories);

  return (
    <div>
      <label className="mb-2 block font-medium">
        Category *
      </label>

      <select
        value={value}
        onChange={(e) => {onChange(e.target.value, e.target.options[e.target.selectedIndex].text) }}
        className="w-full rounded-2xl border border-slate-300 p-3"
      >
        {categories.map((category) => (
          <option
            key={category.id}
            value={category.id}
          >
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}