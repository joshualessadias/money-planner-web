import { api } from "../api";
import { AxiosResponse } from "axios";
import {
  OutcomeKpiResponseDTO,
  OutcomeResponseDTO,
  Page,
} from "@/entities/money-planner-api";
import buildParams, { FilterProps } from "@/helpers/apiParam";

interface ListDisciplinesProps {
  page: number;
  size: number;
  orderBy?: string;
  filters?: FilterProps | [];
}

export const getPageableOutcomes = async ({
  page,
  size,
  orderBy,
  filters = [],
}: ListDisciplinesProps) => {
  const params = {
    page: page + 1,
    size,
    orderBy,
  };
  const builtParams = buildParams({ filters, params });

  const response: AxiosResponse<Page<OutcomeResponseDTO>> = await api.get(
    "/outcome/pageable",
    {
      params: builtParams,
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
