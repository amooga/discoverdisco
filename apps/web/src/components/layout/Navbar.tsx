import { Search, Bell, Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white font-bold">
            D
          </div>

          <div>
            <h1 className="text-lg font-bold text-gray-900">
              DiscoverDisco
            </h1>

            <p className="text-xs text-gray-500">
              Discover Nearby
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}

        <nav className="hidden items-center gap-8 md:flex">

          <a
            href="#"
            className="font-medium text-gray-600 transition hover:text-blue-600"
          >
            Browse
          </a>

          <a
            href="#"
            className="font-medium text-gray-600 transition hover:text-blue-600"
          >
            Categories
          </a>

          <a
            href="#"
            className="font-medium text-gray-600 transition hover:text-blue-600"
          >
            Businesses
          </a>

        </nav>

        {/* Right Side */}

        <div className="hidden items-center gap-3 md:flex">

          <button className="rounded-xl p-2 hover:bg-gray-100">
            <Search size={20} />
          </button>

          <button className="rounded-xl p-2 hover:bg-gray-100">
            <Bell size={20} />
          </button>

          <button className="rounded-2xl bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700">
            Advertise
          </button>

        </div>

        {/* Mobile */}

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden"
        >
          <Menu />
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t bg-white md:hidden">

          <a
            href="#"
            className="block px-6 py-4 hover:bg-gray-50"
          >
            Browse
          </a>

          <a
            href="#"
            className="block px-6 py-4 hover:bg-gray-50"
          >
            Categories
          </a>

          <a
            href="#"
            className="block px-6 py-4 hover:bg-gray-50"
          >
            Businesses
          </a>

          <div className="p-6">
            <button className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white">
              Advertise
            </button>
          </div>

        </div>
      )}
    </header>
  );
}
