
import {create} from 'zustand';

const useMenuStore = create((set) => ({
  activeMenu: 'produk', 
  setActiveMenu: (menu) => set({ activeMenu: menu }),
}));

export default useMenuStore;
