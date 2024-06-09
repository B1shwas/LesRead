import axios from "axios";
import { domain } from "./constants";

export const userRegistration = (values) => {
  return axios.post(`${domain}/api/users/register`, values);
};

export const userLogin = (values) => {
  return axios.post(`${domain}/api/users/login`, values);
};
