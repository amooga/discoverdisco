import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="mx-auto mt-8 max-w-3xl">
      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition-all duration-300 focus-within:border-orange-500 focus-within:shadow-md">
        <Search className="h-5 w-5 text-slate-400" />

        <input
          type="text"
          placeholder="Search businesses, products or advertisements..."
          className="w-full border-none bg-transparent text-lg text-slate-700 placeholder:text-slate-400 focus:outline-none"
        />
      </div>
    </div>
  );
}