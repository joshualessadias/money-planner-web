import { api } from "../api";
import { OutcomeRequestDTO } from "@/entities/outcome";

export interface PageableFilterProps {
  page: number;
  size: number;
  orderBy: string;
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
  };

  return await api.get("/outcome/pageable", {
    params,
  });
}

export async function getOutcomesKpi({
  initialDate,
  finalDate,
}: GetOutcomesKpiProps) {
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
