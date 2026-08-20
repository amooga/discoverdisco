import api from "./api";

export interface UserLocation {
  latitude: number;
  longitude: number;
}

export interface LocationSearchResult {
  displayName: string;
  latitude: number;
  longitude: number;
}

export function getUserLocation(): Promise<UserLocation> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(
        new Error(
          "Geolocation is not supported by this browser."
        )
      );

      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 5 * 60 * 1000,
      }
    );
  });
}

export async function searchLocations(
  query: string
): Promise<LocationSearchResult[]> {
  const response = await api.get(
    "/location/search",
    {
      params: {
        q: query,
      },
    }
  );

  return response.data.data;
}