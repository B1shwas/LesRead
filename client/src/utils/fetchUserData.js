import { getUser } from "./getApi";

export const fetchUserData = async (setUser) => {
  try {
    await getUser().then((res) => {
      setUser(res.data.data);
    });
  } catch (error) {
    setUser(null);
  }
};
