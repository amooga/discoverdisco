import { create } from "zustand";
import {
    getCategories,
  type Category
} from "../services/category.service";

interface CategoryStore {
  categories: Category[];

  loadCategories: () => Promise<void>;
}

export const useCategoryStore =
  create<CategoryStore>((set) => ({
    categories: [],

    loadCategories: async () => {
      const categories =
        await getCategories();

      set({
        categories,
      });
    },
  }));