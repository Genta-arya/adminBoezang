// src/Zustand/useProductStore.js
import {create} from 'zustand';

const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
}));

export default useProductStore;
