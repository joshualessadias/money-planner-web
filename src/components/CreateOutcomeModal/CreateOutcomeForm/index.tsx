import { Box, MenuItem, TextField } from "@mui/material";
import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import {
  BankResponseDTO,
  OutcomeCategoryResponseDTO,
  PaymentMethodResponseDTO,
} from "@/entities/money-planner-api";
import CurrencyInput from "react-currency-input-field";

interface CreateOutcomeFormProps {
  outcomeCategoryList: OutcomeCategoryResponseDTO[];
  paymentMethodList: PaymentMethodResponseDTO[];
  bankList: BankResponseDTO[];
}

function CreateOutcomeForm({
  outcomeCategoryList,
  bankList,
  paymentMethodList,
}: CreateOutcomeFormProps) {
  return (
    <Box component="form" sx={{ "& .MuiTextField-root": { mt: 2 } }}>
      <TextField required label="Descrição" size="small" fullWidth />
      <div>
        <CurrencyInput
          customInput={TextField}
          className="w-full"
          intlConfig={{ locale: "pt-BR", currency: "BRL" }}
          placeholder="Valor *"
          defaultValue={0}
          onValueChange={(value, name, values) =>
            console.log(value, name, values)
          }
        />
      </div>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        // TODO: implement global localization provider
        adapterLocale="pt-br"
      >
        <DatePicker
          label="Data da compra"
          slotProps={{
            textField: { size: "small", required: true, fullWidth: true },
          }}
        />
      </LocalizationProvider>
      <TextField select required label="Categoria" size="small" fullWidth>
        {outcomeCategoryList.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        required
        label="Método de pagamento"
        size="small"
        fullWidth
      >
        {paymentMethodList.map((paymentMethod) => (
          <MenuItem key={paymentMethod.id} value={paymentMethod.id}>
            {paymentMethod.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField select required label="Banco" size="small" fullWidth>
        {bankList.map((bank) => (
          <MenuItem key={bank.id} value={bank.id}>
            {bank.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        required
        label="Qtd parcelas"
        size="small"
        fullWidth
        type="number"
        defaultValue={1}
        InputProps={{ inputProps: { min: 1 } }}
      />
    </Box>
  );
}

export default CreateOutcomeForm;
