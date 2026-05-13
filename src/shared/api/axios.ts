import axios from "axios";

const baseURL = "/api/proxy";

export const api = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
