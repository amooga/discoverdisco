import { create } from "zustand";
import AdvertisementService from "../services/advertisementService";
import type { Advertisement } from "../types/advertisement";

interface AdvertisementStore {
  advertisements: Advertisement[];

  addAdvertisement: (
    advertisement: Advertisement
  ) => void;
}

export const useAdvertisementStore =
  create<AdvertisementStore>((set) => ({
    advertisements: AdvertisementService.getAll(),
    
    addAdvertisement: (advertisement) => {
        AdvertisementService.create(advertisement);
        set(state => ({
            advertisements: [
            advertisement,
            ...state.advertisements,
            ],
        }));
    }
  }));