import { api } from "../api";
import { OutcomeRequestDTO } from "@/entities/outcome";
import { AxiosResponse } from "axios";
import { OutcomeKpiResponseDTO } from "@/entities/money-planner-api";

export interface PageableFilterProps {
  page: number;
  size: number;
  orderBy: string;
  hideInstallments?: boolean;
  initialDate?: number;
  finalDate?: number;
  categoryId?: number;
  paymentMethodId?: number;
  bankId?: number;
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
  categoryId,
  bankId,
  paymentMethodId,
  hideInstallments,
}: PageableFilterProps) {
  const params = {
    page: page + 1,
    size,
    orderBy,
    initialDate: initialDate || null,
    finalDate: finalDate || null,
    categoryId: categoryId || null,
    bankId: bankId || null,
    paymentMethodId: paymentMethodId || null,
    hideInstallments: hideInstallments || null,
  };

  return await api.get("/outcome/pageable", {
    params,
  });
}

export async function getOutcomesKpi({
  initialDate,
  finalDate,
}: GetOutcomesKpiProps): Promise<AxiosResponse<OutcomeKpiResponseDTO>> {
  const params = {
    initialDate: initialDate || null,
    finalDate: finalDate || null,
  };

  return await api.get("/outcome/kpi", {
    params,
  });
}

export async function createOutcome(request: OutcomeRequestDTO) {
  return await api.post("/outcome", request);
}

export async function updateOutcome(id: number, request: OutcomeRequestDTO) {
  return await api.put("/outcome/" + id, request);
}

export async function deleteOutcome(id: number) {
  return await api.delete("/outcome/" + id);
}
