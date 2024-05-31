import axios from "axios";

const baseURL: string = "http://localhost:8080/api/v1";

export const api = axios.create({
  baseURL: baseURL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});
