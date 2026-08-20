import { useState } from "react";
import {
  getUserLocation,
  searchLocations,
  type LocationSearchResult,
} from "../../services/location.service";

interface LocationSelectorProps {
  location: {
    latitude: number;
    longitude: number;
    displayName?: string;
  } | null;

  onLocationChange: (
    latitude: number,
    longitude: number,
    displayName?: string
  ) => Promise<void> | void;
}

export default function LocationSelector({
  location,
  onLocationChange,
}: LocationSelectorProps) {
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] =
    useState(false);

  const [showOptions, setShowOptions] =
    useState(false);

  const [showSearch, setShowSearch] =
    useState(false);

  const [query, setQuery] = useState("");

  const [results, setResults] = useState<
    LocationSearchResult[]
  >([]);

  const [error, setError] = useState("");

  async function useCurrentLocation() {
    setLoading(true);
    setError("");

    try {
      const currentLocation =
        await getUserLocation();

      await onLocationChange(
        currentLocation.latitude,
        currentLocation.longitude,
        "Your current location"
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

  async function searchArea() {
    const trimmedQuery = query.trim();

    if (trimmedQuery.length < 3) {
      setError(
        "Please enter at least 3 characters."
      );
      return;
    }

    setSearching(true);
    setError("");
    setResults([]);

    try {
      const locations =
        await searchLocations(trimmedQuery);

      setResults(locations);

      if (!locations.length) {
        setError(
          "No matching locations found."
        );
      }
    } catch (error) {
      console.error(error);

      setError(
        "Unable to search for this location."
      );
    } finally {
      setSearching(false);
    }
  }

  async function selectLocation(
    result: LocationSearchResult
  ) {
    setLoading(true);
    setError("");

    try {
      await onLocationChange(
        result.latitude,
        result.longitude,
        result.displayName
      );

      setShowOptions(false);
      setShowSearch(false);
      setQuery("");
      setResults([]);
    } catch (error) {
      console.error(error);

      setError(
        "Unable to load offers for this location."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() =>
          setShowOptions((value) => !value)
        }
        className="inline-flex items-center gap-2 rounded-full border border-orange-100 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-600 transition hover:bg-orange-100"
      >
        <span>📍</span>

      <span className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
        {location?.displayName
            ? `Offers around ${
                location.displayName
                .split(",")
                .slice(0, 2)
                .join(", ")
            }`
            : "Offers near you"}
      </span>

        <span className="text-xs">⌄</span>
      </button>

      {showOptions && (
        <div className="absolute left-0 top-full z-30 mt-2 w-[calc(100vw-2rem)] max-w-sm rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">
          {!showSearch ? (
            <>
              <button
                type="button"
                onClick={useCurrentLocation}
                disabled={loading}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-slate-50 disabled:opacity-60"
              >
                <span className="text-xl">
                  📍
                </span>

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
                onClick={() => {
                  setShowSearch(true);
                  setError("");
                }}
                className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-slate-50"
              >
                <span className="text-xl">
                  🔎
                </span>

                <div>
                  <p className="font-semibold text-slate-900">
                    Search an area
                  </p>

                  <p className="text-xs text-slate-500">
                    Browse offers somewhere else
                  </p>
                </div>
              </button>
            </>
          ) : (
            <>
              <div className="mb-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowSearch(false);
                    setResults([]);
                    setError("");
                  }}
                  className="rounded-lg px-2 py-1 text-slate-500 hover:bg-slate-100"
                >
                  ←
                </button>

                <h3 className="font-semibold text-slate-900">
                  Search an area
                </h3>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={query}
                  onChange={(event) =>
                    setQuery(event.target.value)
                  }
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter"
                    ) {
                      void searchArea();
                    }
                  }}
                  placeholder="Dwarka Sector 10"
                  className="min-w-0 flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-orange-500"
                />

                <button
                  type="button"
                  onClick={() => void searchArea()}
                  disabled={searching}
                  className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
                >
                  {searching
                    ? "..."
                    : "Search"}
                </button>
              </div>

              {results.length > 0 && (
                <div className="mt-3 max-h-64 overflow-y-auto">
                  {results.map((result) => (
                    <button
                      key={`${result.latitude}-${result.longitude}-${result.displayName}`}
                      type="button"
                      onClick={() =>
                        void selectLocation(
                          result
                        )
                      }
                      className="w-full rounded-xl px-3 py-3 text-left transition hover:bg-orange-50"
                    >
                      <p className="text-sm font-semibold text-slate-900">
                        {result.displayName
                          .split(",")
                          .slice(0, 2)
                          .join(",")}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {result.displayName}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          {error && (
            <p className="mt-3 px-2 text-xs text-red-600">
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  );
}