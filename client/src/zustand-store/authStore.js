import { create } from "zustand";
import { userLogin } from "../utils/postApi";
import { getCookie, setCookie, deleteCookie } from "../utils/cookie";
import { toast } from "../components/ui/use-toast";
import { getUser } from "../utils/getApi";

const useAuthStore = create((set) => ({
  user: JSON.parse(sessionStorage.getItem("user")) || null,

  accessToken: getCookie("access-token") || null,
  refreshToken: getCookie("refresh-token") || null,

  setUser: (value) => {
    set({ user: value });
    sessionStorage.setItem("user", JSON.stringify(value));
  },

  login: async (userDetails, navigate, location) => {
    try {
      const response = await userLogin(userDetails);
      if (response.data) {
        set({ accessToken: response.data.data.accessToken });
        set({ refreshToken: response.data.data.refreshToken });
        set({ user: response.data.data.user });
        set({ user: response.data.data.user });
        setCookie("access-token", response.data.data.accessToken);
        setCookie("refresh-token", response.data.data.refreshToken);
        sessionStorage.setItem("user", JSON.stringify(response.data.data.user));
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
    deleteCookie("access-token");
    deleteCookie("refresh-token");
    sessionStorage.removeItem("user");
  },

  fetchUser: async () => {
    try {
      await getUser().then((res) => {
        set({ user: res.data.data });
      });
    } catch (error) {
      set({ user: null });
    }
  },
}));

export default useAuthStore;
