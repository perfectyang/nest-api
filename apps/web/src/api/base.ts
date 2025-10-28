import axios from "axios";

export const baseURL =
  import.meta.env.MODE === "development"
    ? "/api/"
    : import.meta.env.VITE_API_URL;

export const Http = axios.create({
  baseURL,
  timeout: 300000,
  withCredentials: false,
  headers: { "Content-Type": "application/json" },
});
