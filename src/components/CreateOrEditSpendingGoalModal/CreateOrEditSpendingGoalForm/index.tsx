import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
  Collapse,
} from "@mui/material";
import NumericFormatCustom from "@/components/NumericFormatCustom";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useEffect, useState } from "react";
import {
  OutcomeCategoryResponseDTO,
  SpendingGoalRequestDTO,
  SpendingGoalResponseDTO,
} from "@/entities/money-planner-api";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { getOutcomeCategoryList } from "@/services/Api/entities/outcomeCategory";
import CollapsibleOutcomeCategoryList from "@/components/CreateOrEditSpendingGoalModal/CreateOrEditSpendingGoalForm/CollapsibleOutcomeCategoryList";

interface CreateOrEditSpendingGoalFormProps {
  initialSpendingGoal?: SpendingGoalResponseDTO;
  onSubmit: (dto: SpendingGoalRequestDTO, id?: number) => void;
}

export default function CreateOrEditSpendingGoalForm({
  initialSpendingGoal,
  onSubmit,
}: CreateOrEditSpendingGoalFormProps) {
  const [outcomeCategoryList, setOutcomeCategoryList] = useState<
    OutcomeCategoryResponseDTO[]
  >([]);
  const { handleSubmit, register, control } = useForm<SpendingGoalRequestDTO>();
  const [hasCategorySplit, setHasCategorySplit] = useState<boolean>(
    initialSpendingGoal
      ? initialSpendingGoal.categorySpendingGoalList.length > 0
      : false
  );

  useEffect(() => {
    getOutcomeCategoryList({ orderBy: "name:asc" }).then((res) => {
      setOutcomeCategoryList(res);
    });
  }, []);

  const onInnerSubmit: SubmitHandler<SpendingGoalRequestDTO> = (data) => {
    onSubmit(data, initialSpendingGoal?.id);
  };

  return (
    <form onSubmit={handleSubmit(onInnerSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <TextField
            id="name"
            type="text"
            required
            label="Nome"
            size="small"
            fullWidth
            defaultValue={initialSpendingGoal?.name}
            {...register("name")}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            id="value"
            required
            label="Valor Total"
            size="small"
            fullWidth
            defaultValue={initialSpendingGoal?.value}
            InputProps={{ inputComponent: NumericFormatCustom }}
            {...register("value")}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="pt-br"
          >
            <Controller
              name="initialDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Data Inicial"
                  defaultValue={initialSpendingGoal?.initialDate}
                  slotProps={{
                    textField: {
                      id: "initialDate",
                      size: "small",
                      required: true,
                      fullWidth: true,
                    },
                  }}
                  {...field}
                />
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} md={6}>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="pt-br"
          >
            <Controller
              name="finalDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Data Final"
                  defaultValue={initialSpendingGoal?.finalDate}
                  slotProps={{
                    textField: {
                      id: "finalDate",
                      size: "small",
                      required: true,
                      fullWidth: true,
                    },
                  }}
                  {...field}
                />
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            label="Distribuir meta por categorias"
            control={
              <Checkbox
                value={hasCategorySplit}
                onChange={() => setHasCategorySplit(!hasCategorySplit)}
              />
            }
          />
        </Grid>
        <Grid item xs={12}>
          <CollapsibleOutcomeCategoryList
            outcomeCategoryList={outcomeCategoryList}
            disabled={!hasCategorySplit}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" className="float-right" variant="contained">
            Salvar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
