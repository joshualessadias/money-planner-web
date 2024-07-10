import { Box, Button, MenuItem, TextField } from "@mui/material";
import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import {
  BankResponseDTO,
  OutcomeCategoryResponseDTO,
  PaymentMethodResponseDTO,
} from "@/entities/money-planner-api";
import dayjs, { Dayjs } from "dayjs";
import { OutcomeRequestDTO } from "@/entities/outcome";
import NumericFormatCustom from "@/components/NumericFormatCustom";

interface CreateOutcomeFormProps {
  outcomeCategoryList: OutcomeCategoryResponseDTO[];
  paymentMethodList: PaymentMethodResponseDTO[];
  bankList: BankResponseDTO[];
  onSubmit: (dto: OutcomeRequestDTO) => void;
}

function CreateOutcomeForm({
  outcomeCategoryList,
  bankList,
  paymentMethodList,
  onSubmit,
}: CreateOutcomeFormProps) {
  const [description, setDescription] = useState<string>();
  const [value, setValue] = useState<number>();
  const [date, setDate] = useState<Dayjs>(dayjs().startOf("day"));
  const [outcomeCategoryId, setOutcomeCategoryId] = useState<number>();
  const [paymentMethodId, setPaymentMethodId] = useState<number>();
  const [bankId, setBankId] = useState<number>();
  const [installments, setInstallments] = useState<number>(1);

  function handleSubmit() {
    const dto: OutcomeRequestDTO = {
      description: description ?? "",
      value: value ?? -1,
      date: date.valueOf() ?? -1,
      categoryId: outcomeCategoryId,
      paymentMethodId,
      bankId,
      installments,
    };
    onSubmit(dto);
  }

  return (
    <Box sx={{ "& > *": { mt: 2 } }}>
      <TextField
        id="description"
        required
        label="Descrição"
        size="small"
        fullWidth
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        id="value"
        required
        label="Valor"
        size="small"
        fullWidth
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        InputProps={{ inputComponent: NumericFormatCustom }}
      />
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        // TODO: implement global localization provider
        adapterLocale="pt-br"
      >
        <DatePicker
          label="Data da compra"
          slotProps={{
            textField: {
              id: "date",
              size: "small",
              required: true,
              fullWidth: true,
            },
          }}
          value={date}
          onChange={(date) => date && setDate(date)}
        />
      </LocalizationProvider>
      <TextField
        id="outcomeCategory"
        select
        required
        label="Categoria"
        size="small"
        fullWidth
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
        id="paymentMethod"
        select
        required
        label="Método de pagamento"
        size="small"
        fullWidth
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
        id="bank"
        select
        required
        label="Banco"
        size="small"
        fullWidth
        value={bankId ?? ""}
        onChange={(e) => setBankId(Number(e.target.value))}
      >
        {bankList.map((bank) => (
          <MenuItem key={bank.id} value={bank.id}>
            {bank.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        id="installments"
        required
        label="Qtd parcelas"
        size="small"
        fullWidth
        type="number"
        InputProps={{ inputProps: { min: 1 } }}
        value={installments}
        onChange={(e) => setInstallments(Number(e.target.value))}
      />
      <Button
        className="float-right"
        variant="contained"
        onClick={handleSubmit}
      >
        Criar
      </Button>
    </Box>
  );
}

export default CreateOutcomeForm;
