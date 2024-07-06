export interface OutcomeRequestDTO {
  description: string;
  value: number;
  date: number;
  categoryId?: number;
  paymentMethodId?: number;
  bankId?: number;
  installments: number;
}
