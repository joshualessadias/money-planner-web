import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_MONEY_PLANNER_API_URL;

export interface PageableProps {
  page?: number;
  size?: number;
  orderBy?: string;
}

export const api = axios.create({
  baseURL: baseURL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});
