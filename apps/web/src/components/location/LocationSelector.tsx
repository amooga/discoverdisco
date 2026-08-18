import { useState } from "react";
import { getUserLocation } from "../../services/location.service";

interface LocationSelectorProps {
  location: {
    latitude: number;
    longitude: number;
  } | null;

  onLocationChange: (
    latitude: number,
    longitude: number
  ) => Promise<void> | void;
}

export default function LocationSelector({
  location,
  onLocationChange,
}: LocationSelectorProps) {
  const [loading, setLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [error, setError] = useState("");

  async function useCurrentLocation() {
    setLoading(true);
    setError("");

    try {
      const currentLocation = await getUserLocation();

      await onLocationChange(
        currentLocation.latitude,
        currentLocation.longitude
      );

      setShowOptions(false);
    } catch (error) {
      console.error(error);

      setError(
        "Unable to access your current location."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setShowOptions((value) => !value)}
        className="inline-flex items-center gap-2 rounded-full border border-orange-100 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-600 transition hover:bg-orange-100"
      >
        <span>📍</span>

        <span>
          {location
            ? "Offers near you"
            : "Set your location"}
        </span>

        <span className="text-xs">⌄</span>
      </button>

      {showOptions && (
        <div className="absolute left-0 top-full z-30 mt-2 w-72 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">
          <button
            type="button"
            onClick={useCurrentLocation}
            disabled={loading}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-slate-50 disabled:opacity-60"
          >
            <span className="text-xl">📍</span>

            <div>
              <p className="font-semibold text-slate-900">
                {loading
                  ? "Finding you..."
                  : "Use my current location"}
              </p>

              <p className="text-xs text-slate-500">
                Find offers around you
              </p>
            </div>
          </button>

          <button
            type="button"
            className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-slate-50"
            onClick={() => {
              alert(
                "Area search will be available soon."
              );
            }}
          >
            <span className="text-xl">🔎</span>

            <div>
              <p className="font-semibold text-slate-900">
                Search an area
              </p>

              <p className="text-xs text-slate-500">
                Browse offers somewhere else
              </p>
            </div>
          </button>

          {error && (
            <p className="px-3 pb-2 pt-2 text-xs text-red-600">
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  );
}