import { api } from "../api";
import { AxiosResponse } from "axios";
import {
  OutcomeKpiResponseDTO,
  OutcomeResponseDTO,
  Page,
} from "@/entities/money-planner-api";

interface ListDisciplinesProps {
  page: number;
  size: number;
  filters?: FiltersProps | [];
}

interface FiltersProps {
  name?: string;
  type?: string;
  date?: string;
  sort?: string;
}

export const getPageableOutcomes = async ({
  page,
  size,
  filters = [],
}: ListDisciplinesProps) => {
  const params = {
    page: page + 1,
    size,
  };
  const response: AxiosResponse<Page<OutcomeResponseDTO>> = await api.get(
    "/outcome/pageable",
    {
      params: params,
    }
  );
  return response.data;
};

export const getOutcomesKpi = async () => {
  const response: AxiosResponse<OutcomeKpiResponseDTO> = await api.get(
    "/outcome/kpi"
  );
  return response.data;
};
