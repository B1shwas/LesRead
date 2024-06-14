import { create } from "zustand";
import { userLogin } from "../utils/postApi";
import { getCookie, setCookie, deleteCookie } from "../utils/cookie";
import { toast } from "../components/ui/use-toast";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,

  accessToken: getCookie("access-token") || null,
  refreshToken: getCookie("refresh-token") || null,
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true" || false,

  setLogin: (value) => set({ isLoggedIn: value }),

  login: async (userDetails, navigate, location) => {
    try {
      const response = await userLogin(userDetails);
      if (response.data) {
        set({ accessToken: response.data.data.accessToken });
        set({ refreshToken: response.data.data.refreshToken });
        set({ user: response.data.data.user });
        set({ isLoggedIn: true });
        setCookie("access-token", response.data.data.accessToken);
        setCookie("refresh-token", response.data.data.refreshToken);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
      }
      if (response.status === 200 && location.pathname === "/login") {
        toast({
          description: "User Logged In Successfully",
        });
      }

      navigate("/");
    } catch (error) {
      const html = error?.response?.data;
      const errorMessage = html.match(/Error: (.*?)<br>/)[1].trim();
      toast({
        description: errorMessage,
      });
      console.log(errorMessage);
    }
  },

  logout: async () => {
    set({ accessToken: null });
    set({ refreshToken: null });
    set({ user: null });
    set({ isLoggedIn: false });
    deleteCookie("access-token");
    deleteCookie("refresh-token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
  },
}));

export default useAuthStore;
