import { useState } from "react";
import {
  getUserLocation,
  searchLocations,
  type LocationSearchResult,
} from "../../services/location.service";
import businessService from "../../services/businessService";

interface BusinessLocationProps {
  latitude?: number | null;
  longitude?: number | null;
  onSaved?: (
    latitude: number,
    longitude: number
  ) => void;
}

export default function BusinessLocation({
  latitude,
  longitude,
  onSaved,
}: BusinessLocationProps) {
  const [loading, setLoading] = useState(false);

  const [searching, setSearching] =
    useState(false);

  const [query, setQuery] = useState("");

  const [results, setResults] = useState<
    LocationSearchResult[]
  >([]);

  const [error, setError] = useState("");

  const hasLocation =
    latitude !== null &&
    latitude !== undefined &&
    longitude !== null &&
    longitude !== undefined;

  async function saveLocation(
    lat: number,
    lng: number
  ) {
    setLoading(true);
    setError("");

    try {
      await businessService.updateLocation(
        lat,
        lng
      );

      onSaved?.(lat, lng);
    } catch (error) {
      console.error(error);

      setError(
        "Unable to save your shop location."
      );
    } finally {
      setLoading(false);
    }
  }

  async function useCurrentLocation() {
    setLoading(true);
    setError("");

    try {
      const location =
        await getUserLocation();

      await saveLocation(
        location.latitude,
        location.longitude
      );
    } catch (error) {
      console.error(error);

      setError(
        "Unable to access your current location."
      );

      setLoading(false);
    }
  }

  async function searchArea() {
    if (query.trim().length < 3) {
      setError(
        "Enter at least 3 characters."
      );
      return;
    }

    setSearching(true);
    setError("");

    try {
      const locations =
        await searchLocations(query);

      setResults(locations);

      if (!locations.length) {
        setError(
          "No locations found."
        );
      }
    } catch (error) {
      console.error(error);

      setError(
        "Unable to search locations."
      );
    } finally {
      setSearching(false);
    }
  }

  async function selectLocation(
    result: LocationSearchResult
  ) {
    setResults([]);

    await saveLocation(
      result.latitude,
      result.longitude
    );
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div>
        <p className="text-sm font-semibold text-orange-500">
          📍 SHOP LOCATION
        </p>

        <h2 className="mt-1 text-xl font-bold text-slate-900">
          Where is your shop?
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Customers nearby will see your
          advertisements.
        </p>
      </div>

      {hasLocation && (
        <div className="mt-4 rounded-2xl bg-green-50 p-4">
          <p className="font-semibold text-green-700">
            ✓ Location configured
          </p>

          <p className="mt-1 text-xs text-green-600">
            Your advertisements can now appear
            in nearby searches.
          </p>
        </div>
      )}

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={useCurrentLocation}
          disabled={loading}
          className="rounded-2xl bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
        >
          {loading
            ? "Saving..."
            : "📍 Use my current location"}
        </button>
      </div>

      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-200" />

        <span className="text-xs text-slate-400">
          OR
        </span>

        <div className="h-px flex-1 bg-slate-200" />
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(event) =>
            setQuery(event.target.value)
          }
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              void searchArea();
            }
          }}
          placeholder="Search your shop area"
          className="min-w-0 flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-orange-500"
        />

        <button
          type="button"
          onClick={() => void searchArea()}
          disabled={searching}
          className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
        >
          {searching
            ? "..."
            : "Search"}
        </button>
      </div>

      {results.length > 0 && (
        <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200">
          {results.map((result) => (
            <button
              key={`${result.latitude}-${result.longitude}`}
              type="button"
              onClick={() =>
                void selectLocation(result)
              }
              className="w-full border-b border-slate-100 p-4 text-left last:border-0 hover:bg-orange-50"
            >
              <p className="text-sm font-semibold text-slate-900">
                {result.displayName
                  .split(",")
                  .slice(0, 2)
                  .join(", ")}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {result.displayName}
              </p>
            </button>
          ))}
        </div>
      )}

      {error && (
        <p className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}
    </section>
  );
}