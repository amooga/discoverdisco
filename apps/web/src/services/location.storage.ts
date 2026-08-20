const LOCATION_KEY =
  "discoverdisco_user_location";

export interface SavedLocation {
  latitude: number;
  longitude: number;
}

export function saveLocation(
  location: SavedLocation
) {
  localStorage.setItem(
    LOCATION_KEY,
    JSON.stringify(location)
  );
}

export function getSavedLocation():
  | SavedLocation
  | null {
  const stored =
    localStorage.getItem(LOCATION_KEY);

  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored);
  } catch {
    localStorage.removeItem(LOCATION_KEY);
    return null;
  }
}

export function clearSavedLocation() {
  localStorage.removeItem(LOCATION_KEY);
}