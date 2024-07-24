import { api } from "../api";
import { AxiosResponse } from "axios";
import { BankResponseDTO } from "@/entities/money-planner-api";

interface PageableFilterProps {
  orderBy: string;
}

export async function getBankList({ orderBy }: PageableFilterProps) {
  const params = {
    orderBy,
  };
  const response: AxiosResponse<BankResponseDTO[]> = await api.get(
    "/bank/all",
    {
      params,
    }
  );
  return response.data;
}
