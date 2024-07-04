import { api } from "../api";
import { AxiosResponse } from "axios";
import { PaymentMethodResponseDTO } from "@/entities/money-planner-api";

export async function getPaymentMethodList() {
  const response: AxiosResponse<PaymentMethodResponseDTO[]> = await api.get(
    "/payment-method/all"
  );
  return response.data;
}
