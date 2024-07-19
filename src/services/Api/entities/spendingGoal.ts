import { AxiosResponse } from "axios";
import { Slice, SpendingGoalResponseDTO } from "@/entities/money-planner-api";
import { api, PageableProps } from "@/services/Api/api";

interface PageableSpendingGoalsProps extends PageableProps {}

export async function getPageableSpendingGoals({
  page,
  size,
  orderBy,
}: PageableSpendingGoalsProps): Promise<
  AxiosResponse<Slice<SpendingGoalResponseDTO>>
> {
  const params = {
    page: page && page + 1,
    size,
    orderBy,
  };

  return await api.get("/spending-goal/pageable", { params });
}
