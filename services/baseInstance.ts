import axios from "axios";

export function baseAxiosInstance() {
  return axios.create({
    baseURL: "http://localhost:3000/api",
  });
}
