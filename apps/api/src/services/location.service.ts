export interface LocationSearchResult {
  displayName: string;
  latitude: number;
  longitude: number;
}

class LocationService {
  async search(query: string): Promise<LocationSearchResult[]> {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return [];
    }

    const params = new URLSearchParams({
      q: trimmedQuery,
      format: "json",
      addressdetails: "1",
      limit: "5",
      countrycodes: "in",
    });

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?${params.toString()}`,
      {
        headers: {
          Accept: "application/json",
          "User-Agent":
            "DiscoverDisco/1.0 (local-discovery-app)",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Geocoding request failed: ${response.status}`
      );
    }

    const data = (await response.json()) as Array<{
      display_name: string;
      lat: string;
      lon: string;
    }>;

    return data.map((item) => ({
      displayName: item.display_name,
      latitude: Number(item.lat),
      longitude: Number(item.lon),
    }));
  }
}

export default new LocationService();