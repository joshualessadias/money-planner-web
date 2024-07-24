import { api } from "../api";
import { AxiosResponse } from "axios";
import { OutcomeCategoryResponseDTO } from "@/entities/money-planner-api";

interface PageableFilterProps {
  orderBy: string;
}

export async function getOutcomeCategoryList({ orderBy }: PageableFilterProps) {
  const params = {
    orderBy,
  };
  const response: AxiosResponse<OutcomeCategoryResponseDTO[]> = await api.get(
    "/outcome-category/all",
    {
      params,
    }
  );
  return response.data;
}
