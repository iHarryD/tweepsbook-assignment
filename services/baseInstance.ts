import axios from "axios";

export function baseAxiosInstance() {
  return axios.create({
    baseURL: `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/"
        : "https://tweepsbook-assignment.vercel.app/"
    }api`,
  });
}
