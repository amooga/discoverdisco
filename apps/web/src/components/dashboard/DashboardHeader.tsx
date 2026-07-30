import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DashboardHeaderProps {
  businessName: string;
  address: string;
}

export default function DashboardHeader({
  businessName,
  address,
}: DashboardHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-medium uppercase tracking-wider text-orange-500">
          Dashboard
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Welcome back 👋
        </h1>

        <div className="mt-4">
          <h2 className="text-xl font-semibold text-slate-800">
            {businessName}
          </h2>

          <p className="mt-1 text-slate-500">{address}</p>
        </div>
      </div>

      <button
        onClick={() => navigate("/create-post")}
        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
      >
        <Plus size={20} />
        Create Post
      </button>
    </div>
  );
}
