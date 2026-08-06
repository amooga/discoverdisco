import { Link } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <Link
          to="/"
          className="text-2xl font-bold text-orange-600"
        >
          DiscoverDisco
        </Link>

        <nav className="hidden gap-8 text-sm font-medium text-slate-600 md:flex">

          <Link
            to="/"
            className="hover:text-orange-600"
          >
            Home
          </Link>

          <Link
            to="/categories"
            className="hover:text-orange-600"
          >
            Categories
          </Link>

          <Link
            to="/nearby"
            className="hover:text-orange-600"
          >
            Nearby
          </Link>

        </nav>

        <div className="flex items-center gap-3">

          {token ? (
            <>
              <Link
                to="/create-post"
                className="rounded-xl bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
              >
                + Post
              </Link>

              <Link
                to="/dashboard"
                className="rounded-xl border border-slate-300 px-4 py-2 hover:bg-slate-50"
              >
                Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-xl border border-slate-300 px-4 py-2 hover:bg-slate-50"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-xl bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
              >
                Register
              </Link>
            </>
          )}

        </div>

      </div>
    </header>
  );
}