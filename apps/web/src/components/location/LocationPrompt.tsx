import { useState } from "react";
import { getUserLocation } from "../../services/location.service";

interface LocationPromptProps {
  onLocation: (
    latitude: number,
    longitude: number
  ) => void;
}

export default function LocationPrompt({
  onLocation,
}: LocationPromptProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function requestLocation() {
    setLoading(true);
    setError("");

    try {
      const location = await getUserLocation();

      onLocation(
        location.latitude,
        location.longitude
      );
    } catch (error) {
      console.error(error);

      setError(
        "We couldn't access your location. Please allow location access in your browser."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl border border-orange-100 bg-orange-50 p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            📍 Find offers near you
          </h3>

          <p className="mt-1 text-sm text-slate-600">
            Allow location access to discover
            offers from shops around you.
          </p>
        </div>

        <button
          type="button"
          onClick={requestLocation}
          disabled={loading}
          className="rounded-2xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Finding you..."
            : "Allow Location"}
        </button>
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}