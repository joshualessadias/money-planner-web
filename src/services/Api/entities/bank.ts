import { api } from "../api";
import { AxiosResponse } from "axios";
import { BankResponseDTO } from "@/entities/money-planner-api";

export async function getBankList() {
  const response: AxiosResponse<BankResponseDTO[]> = await api.get("/bank/all");
  return response.data;
}
