import React, { useState } from "react";
import { Button, MenuItem, Stack, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import "dayjs/locale/pt-br";
import { getFirstDayOfMonth, getLastDayOfMonth } from "@/helpers/datePicker";
import { FilterAlt } from "@mui/icons-material";
import {
  BankResponseDTO,
  OutcomeCategoryResponseDTO,
  PaymentMethodResponseDTO,
} from "@/entities/money-planner-api";

interface OutcomeTableToolbarProps {
  onFilterClick: (initialDate?: number, finalDate?: number) => void;
  outcomeCategoryList: OutcomeCategoryResponseDTO[];
  paymentMethodList: PaymentMethodResponseDTO[];
  bankList: BankResponseDTO[];
}

function OutcomeTableToolbar({
  onFilterClick,
  outcomeCategoryList,
  paymentMethodList,
  bankList,
}: OutcomeTableToolbarProps) {
  const [initialValue, setInitialValue] = useState<Dayjs | null>(
    getFirstDayOfMonth()
  );
  const [finalValue, setFinalValue] = useState<Dayjs | null>(getLastDayOfMonth);
  const [outcomeCategoryId, setOutcomeCategoryId] = useState<number>();
  const [paymentMethodId, setPaymentMethodId] = useState<number>();
  const [bankId, setBankId] = useState<number>();

  function handleClearFiltersClick() {
    setInitialValue(getFirstDayOfMonth());
    setFinalValue(getLastDayOfMonth());
    setOutcomeCategoryId(undefined);
    setPaymentMethodId(undefined);
    setBankId(undefined);
    const initialDate = initialValue ? initialValue.valueOf() : 0;
    const finalDate = finalValue ? finalValue.valueOf() : 0;
    onFilterClick(initialDate, finalDate);
  }

  function handleOnFilterClick() {
    const initialDate = initialValue ? initialValue.valueOf() : 0;
    const finalDate = finalValue ? finalValue.valueOf() : 0;
    onFilterClick(initialDate, finalDate);
  }

  return (
    <Stack
      gap={1}
      flexDirection="row"
      flexWrap="wrap"
      justifyContent="space-between"
    >
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        // TODO: implement global localization provider
        adapterLocale="pt-br"
      >
        <DatePicker
          className="flex-auto w-24"
          label="Início"
          value={initialValue}
          slotProps={{
            textField: {
              size: "small",
            },
          }}
          onChange={(newValue) => setInitialValue(newValue)}
        />
        <DatePicker
          className="flex-auto w-24"
          label="Fim"
          value={finalValue}
          slotProps={{
            textField: {
              size: "small",
              // fullWidth: true,
            },
          }}
          onChange={(newValue) => setFinalValue(newValue)}
        />
      </LocalizationProvider>
      <TextField
        className="flex-auto"
        id="outcomeCategory"
        select
        required
        label="Categoria"
        size="small"
        value={outcomeCategoryId ?? ""}
        onChange={(e) => setOutcomeCategoryId(Number(e.target.value))}
      >
        {outcomeCategoryList.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        className="flex-auto"
        id="paymentMethod"
        select
        required
        label="Método de pagamento"
        size="small"
        value={paymentMethodId ?? ""}
        onChange={(e) => setPaymentMethodId(Number(e.target.value))}
      >
        {paymentMethodList.map((paymentMethod) => (
          <MenuItem key={paymentMethod.id} value={paymentMethod.id}>
            {paymentMethod.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        className="flex-auto"
        id="bank"
        select
        required
        label="Banco"
        size="small"
        value={bankId ?? ""}
        onChange={(e) => setBankId(Number(e.target.value))}
      >
        {bankList.map((bank) => (
          <MenuItem key={bank.id} value={bank.id}>
            {bank.name}
          </MenuItem>
        ))}
      </TextField>
      <div className="flex gap-2">
        <Button
          className="text-nowrap self-end"
          variant="outlined"
          onClick={handleClearFiltersClick}
          size="small"
        >
          Limpar Filtros
        </Button>
        <Button
          className="self-end"
          variant="contained"
          startIcon={<FilterAlt />}
          onClick={handleOnFilterClick}
        >
          Filtrar
        </Button>
      </div>
    </Stack>
  );
}

export default OutcomeTableToolbar;
