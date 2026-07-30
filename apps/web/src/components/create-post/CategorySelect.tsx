interface Props {
  value: string;
  onChange: (value: string) => void;
}

const categories = [
  "Stationery",
  "Restaurant",
  "Salon",
  "Medical",
  "Grocery",
  "Electronics",
  "Clothing",
];

export default function CategorySelect({
  value,
  onChange,
}: Props) {
  return (
    <div>
      <label className="mb-2 block font-medium">
        Category *
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-slate-300 p-3"
      >
        {categories.map((category) => (
          <option
            key={category}
            value={category}
          >
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}