import { api } from "../api";
import { AxiosResponse } from "axios";
import { OutcomeCategoryResponseDTO } from "@/entities/money-planner-api";

export async function getOutcomeCategoryList() {
  const response: AxiosResponse<OutcomeCategoryResponseDTO[]> = await api.get(
    "/outcome-category/all"
  );
  return response.data;
}
