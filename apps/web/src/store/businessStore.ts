import { create } from "zustand";
import type { Business } from "../types/api/business";
import businessService from "../services/businessService";

interface BusinessStore {
  business: Business | null;
  loading: boolean;
  error: string | null;

  fetchBusiness: () => Promise<void>;
  updateLocation: (
    latitude: number,
    longitude: number
  ) => Promise<void>;
}

export const useBusinessStore = create<BusinessStore>((set) => ({
  business: null,
  loading: false,
  error: null,
  fetchBusiness: async () => {
    set({
      loading: true,
      error: null,
    });

    try {
      const business =
        await businessService.getMe();

      set({
        business,
        loading: false,
      });
    } catch (error) {
      console.error(
        "Failed to load business:",
        error
      );

      set({
        business: null,
        loading: false,
        error: "Failed to load business.",
      });
    }
  },
  updateLocation: async (
    latitude,
    longitude
  ) => {
    const business =
      await businessService.updateLocation(
        latitude,
        longitude
      );

    set({
      business,
    });
  },
}));