import axios from "axios";
import { domain } from "./constants";

export const getAllBooks = () => {
  return axios.get(`${domain}/api/books/lists`);
};

export const getHome = () => {
  return axios.get(`${domain}/home`, { withCredentials: true });
};
