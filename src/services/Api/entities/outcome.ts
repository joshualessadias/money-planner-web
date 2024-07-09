import { api } from "../api";
import { OutcomeRequestDTO } from "@/entities/outcome";

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
