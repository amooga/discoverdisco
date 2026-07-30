const categories = [
  "All",
  "Stationery",
  "Restaurant",
  "Salon",
  "Medical",
  "Grocery",
  "Electronics",
];

interface Props {
  selected: string;
  onSelect: (category: string) => void;
}

export default function CategoryChips({
  selected,
  onSelect,
}: Props) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`whitespace-nowrap rounded-full px-5 py-2 font-medium transition ${
            selected === category
              ? "bg-orange-500 text-white"
              : "bg-white border border-slate-200 hover:bg-slate-100"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}