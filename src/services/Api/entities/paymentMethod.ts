import { api } from "../api";
import { AxiosResponse } from "axios";
import { PaymentMethodResponseDTO } from "@/entities/money-planner-api";

interface PageableFilterProps {
  orderBy: string;
}

export async function getPaymentMethodList({ orderBy }: PageableFilterProps) {
  const params = {
    orderBy,
  };
  const response: AxiosResponse<PaymentMethodResponseDTO[]> = await api.get(
    "/payment-method/all",
    {
      params,
    }
  );
  return response.data;
}
