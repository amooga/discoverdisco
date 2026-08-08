import { useCategoryStore } from "../../store/category.store";

interface Props {
  selected: string;
  onSelect: (category: string) => void;
}

export default function CategoryChips({
  selected,
  onSelect,
}: Props) {

  const {
    categories,
    loadCategories,
  } = useCategoryStore();
  
  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelect(category.id)}
          className={`whitespace-nowrap rounded-full px-5 py-2 font-medium transition ${
            selected === category.id
              ? "bg-orange-500 text-white"
              : "bg-white border border-slate-200 hover:bg-slate-100"
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}