import { Bell, MapPin, User } from "lucide-react";

export default function HomeHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div>
          <h1 className="text-2xl font-bold text-orange-500">
            DiscoverDisco
          </h1>

          <div className="mt-1 flex items-center gap-1 text-sm text-slate-500">
            <MapPin size={14} />
            Dwarka Sector 10
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Bell
            className="cursor-pointer text-slate-600"
            size={22}
          />

          <User
            className="cursor-pointer text-slate-600"
            size={22}
          />
        </div>
      </div>
    </header>
  );
}