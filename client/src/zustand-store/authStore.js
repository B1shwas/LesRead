import { create } from "zustand";
import { userLogin } from "../utils/postApi";

const useAuthStore = create((set) => ({
  user: null,
  accessToken: localStorage.getItem("access-token") || null,
  refreshToken: localStorage.getItem("refresh-token") || null,
  login: async (userDetails) => {
    try {
      const response = await userLogin(userDetails);
      if (response.data) {
        set({ accessToken: response.data.data.accessToken });
        set({ refreshToken: response.data.data.refreshToken });
        set({ user: response.data.data.user });

        localStorage.setItem("access-token", response.data.data.accessToken);
        localStorage.setItem("refresh-token", response.data.data.refreshToken);
      }
    } catch (error) {
      console.log(error);
    }
  },

  logout: async () => {
    set({ accessToken: null });
    set({ refreshToken: null });
    set({ user: null });

    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
  },
}));

export default useAuthStore;
