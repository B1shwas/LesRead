import axios from "axios";
import { domain } from "./constants";

export const getAllBooks = () => {
  return axios.get(`${domain}/api/books/lists`);
};

export const getUser = () => {
  return axios.get(`${domain}/api/users/details`, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": "true",
    },
  });
};
