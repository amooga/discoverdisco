import { create } from "zustand";
import { mockBusinesses } from "../data/businesses";

export const useBusinessStore = create(() => ({
  businesses: mockBusinesses,
}));