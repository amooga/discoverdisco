import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";

export default function NavBar() {
  const navigate = useNavigate();

  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );

  const logout = useAuthStore(
    (state) => state.logout
  );

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}

        <Link
          to="/"
          className="text-2xl font-extrabold text-orange-500"
        >
          DiscoverDisco
        </Link>

        {/* Navigation */}

        <div className="flex items-center gap-3">

          <Link
            to="/"
            className="rounded-xl px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
          >
            Explore
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="rounded-xl px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
              >
                Dashboard
              </Link>

              <Link
                to="/advertise"
                className="rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Create Advertisement
              </Link>

              <button
                onClick={handleLogout}
                className="rounded-xl px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-xl px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Register Your Business
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}