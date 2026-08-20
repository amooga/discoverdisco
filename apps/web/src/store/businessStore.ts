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

export const useBusinessStore =
  create<BusinessStore>((set) => ({
    business: null,
    loading: false,
    error: null,

    // --------------------------------
    // Get actual logged-in business
    // --------------------------------
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
          error: null,
        });
      } catch (error) {
        console.error(
          "Failed to load business:",
          error
        );

        set({
          business: null,
          loading: false,
          error:
            "Failed to load business.",
        });
      }
    },

    // --------------------------------
    // Update shop location
    // --------------------------------
    updateLocation: async (
      latitude,
      longitude
    ) => {
      set({
        loading: true,
        error: null,
      });

      try {
        const business =
          await businessService.updateLocation(
            latitude,
            longitude
          );

        set({
          business,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error(
          "Failed to update business location:",
          error
        );

        set({
          loading: false,
          error:
            "Failed to update business location.",
        });

        throw error;
      }
    },
  }));