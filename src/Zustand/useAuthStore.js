import {create} from "zustand";

const useAuthStore = create((set) => ({
  isLoggedIn: false,
  token: null,
  email: null,
  username: null,
  setLoggedIn: (isLoggedIn, token, email, username) =>
    set((state) => ({
      isLoggedIn,
      token,
      email,
      username,
    })),
  logout: () =>
    set((state) => ({
      isLoggedIn: false,
      token: null,
      email: null,
      username: null,
    })),
}));

export default useAuthStore;
