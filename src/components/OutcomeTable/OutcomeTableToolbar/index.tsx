import React from "react";
import { Button, Stack } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import "dayjs/locale/pt-br";
import { getFirstDayOfMonth, getLastDayOfMonth } from "@/helpers/datePicker";
import { FilterAlt } from "@mui/icons-material";

interface OutcomeTableToolbarProps {
  onFilterClick: (initialDate?: number, finalDate?: number) => void;
}

function OutcomeTableToolbar({ onFilterClick }: OutcomeTableToolbarProps) {
  const [initialValue, setInitialValue] = React.useState<Dayjs | null>(
    getFirstDayOfMonth()
  );
  const [finalValue, setFinalValue] = React.useState<Dayjs | null>(
    getLastDayOfMonth
  );

  function handleOnFilterClick() {
    const initialDate = initialValue ? initialValue.valueOf() : 0;
    const finalDate = finalValue ? finalValue.valueOf() : 0;
    onFilterClick(initialDate, finalDate);
  }

  return (
    <Stack
      direction={{ sm: "row", xs: "column" }}
      spacing={{ xs: 1, sm: 2 }}
      justifyContent="space-between"
    >
      <Stack direction="row">
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          // TODO: implement global localization provider
          adapterLocale="pt-br"
        >
          <DatePicker
            sx={{ mr: 2 }}
            label="Início"
            value={initialValue}
            onChange={(newValue) => setInitialValue(newValue)}
          />
          <DatePicker
            label="Fim"
            value={finalValue}
            onChange={(newValue) => setFinalValue(newValue)}
          />
        </LocalizationProvider>
      </Stack>
      <Button
        variant="contained"
        startIcon={<FilterAlt />}
        onClick={handleOnFilterClick}
      >
        Filtrar
      </Button>
    </Stack>
  );
}

export default OutcomeTableToolbar;
