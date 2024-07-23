import { Button, Grid, MenuItem, TextField } from "@mui/material";
import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import {
  BankResponseDTO,
  OutcomeCategoryResponseDTO,
  OutcomeResponseDTO,
  PaymentMethodResponseDTO,
} from "@/entities/money-planner-api";
import dayjs, { Dayjs } from "dayjs";
import { OutcomeRequestDTO } from "@/entities/outcome";
import NumericFormatCustom from "@/components/NumericFormatCustom";
import { formatDescription } from "@/helpers/descriptionMask";

interface CreateOrEditOutcomeFormProps {
  outcomeCategoryList: OutcomeCategoryResponseDTO[];
  paymentMethodList: PaymentMethodResponseDTO[];
  bankList: BankResponseDTO[];
  onSubmit: (dto: OutcomeRequestDTO, id?: number) => void;
  initialOutcome?: OutcomeResponseDTO;
}

function CreateOrEditOutcomeForm({
  outcomeCategoryList,
  bankList,
  paymentMethodList,
  onSubmit,
  initialOutcome,
}: CreateOrEditOutcomeFormProps) {
  const [description, setDescription] = useState<string | undefined>(
    initialOutcome ? formatDescription(initialOutcome.description) : undefined
  );
  const [value, setValue] = useState<number | undefined>(initialOutcome?.value);
  const [date, setDate] = useState<Dayjs>(
    initialOutcome ? dayjs(initialOutcome.date) : dayjs().startOf("day")
  );
  const [outcomeCategoryId, setOutcomeCategoryId] = useState<
    number | undefined
  >(initialOutcome?.category.id);
  const [paymentMethodId, setPaymentMethodId] = useState<number | undefined>(
    initialOutcome?.paymentMethod.id
  );
  const [bankId, setBankId] = useState<number | undefined>(
    initialOutcome?.bank.id
  );
  const [installments, setInstallments] = useState<number>(
    initialOutcome ? initialOutcome.childrenInstallmentsAmount + 1 : 1
  );

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
    onSubmit(dto, initialOutcome?.id);
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <TextField
          id="description"
          required
          label="Descrição"
          size="small"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={4}>
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
      </Grid>
      <Grid item xs={12} md={6}>
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
      </Grid>
      <Grid item xs={12} md={6}>
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
      </Grid>
      <Grid item xs={12} md={4}>
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
      </Grid>
      <Grid item xs={12} md={4}>
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
      </Grid>
      <Grid item xs={12} md={4}>
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
      </Grid>
      <Grid item xs={12}>
        <Button
          className="float-right"
          variant="contained"
          onClick={handleSubmit}
        >
          Salvar
        </Button>
      </Grid>
    </Grid>
  );
}

export default CreateOrEditOutcomeForm;
