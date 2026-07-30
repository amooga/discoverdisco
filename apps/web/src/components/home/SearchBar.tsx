import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  value,
  onChange,
}: Props) {
  return (
    <div className="relative">
      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search nearby offers..."
        className="w-full rounded-2xl border border-slate-300 bg-white py-3 pl-12 pr-4 focus:border-orange-500 focus:outline-none"
      />
    </div>
  );
}