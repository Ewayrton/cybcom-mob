import { create } from 'zustand';
import { category } from '@/services/categoryService';

interface CategoryState {
  categories: category[];
  isLoading: boolean;
  error: string | null
  setCatecories: (categories: Array<category>) => Promise<void>;
}

export const usecategorysStore = create<CategoryState>((set) => ({
  categories: [],
  isLoading: false,
  error: null,

  setCatecories: async (categories: Array<category>) => {
    set({ isLoading: false, error: null , categories: categories});
    
  },
}));