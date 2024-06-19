import { api } from "../api";
import { AxiosResponse } from "axios";
import {
  OutcomeKpiResponseDTO,
  OutcomeResponseDTO,
  Page,
} from "@/entities/money-planner-api";

interface PageableFilterProps {
  page: number;
  size: number;
  orderBy: string;
  initialDate?: number;
  finalDate?: number;
}

interface GetOutcomesKpiProps {
  initialDate?: number;
  finalDate?: number;
}

export async function getPageableOutcomes({
  page,
  size,
  orderBy,
  initialDate,
  finalDate,
}: PageableFilterProps) {
  const params = {
    page: page + 1,
    size,
    orderBy,
    initialDate: initialDate || null,
    finalDate: finalDate || null,
  };

  const response: AxiosResponse<Page<OutcomeResponseDTO>> = await api.get(
    "/outcome/pageable",
    {
      params,
    }
  );
  return response.data;
}

export async function getOutcomesKpi({
  initialDate,
  finalDate,
}: GetOutcomesKpiProps) {
  const params = {
    initialDate: initialDate || null,
    finalDate: finalDate || null,
  };

  const response: AxiosResponse<OutcomeKpiResponseDTO> = await api.get(
    "/outcome/kpi",
    {
      params,
    }
  );
  return response.data;
}
