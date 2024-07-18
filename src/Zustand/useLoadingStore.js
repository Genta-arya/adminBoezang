import { create } from "zustand";

// Membuat store Zustand untuk status loading
const useLoadingStores = create((set) => ({
  isLoading: null,
  setLoading: (loadings) => set({ isLoading: loadings }),
}));

export default useLoadingStores;
