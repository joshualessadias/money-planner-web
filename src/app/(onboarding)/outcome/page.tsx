"use client";

import React, { useEffect, useState } from "react";
import { createOutcome, getOutcomesKpi } from "@/services/Api/entities/outcome";
import OutcomeInsights from "@/components/OutcomeInsights";
import OutcomeTable from "../../../components/OutcomeTable";
import { Button, Container, Paper, Stack } from "@mui/material";
import { Add } from "@mui/icons-material";
import CreateOutcomeModal from "@/components/CreateOutcomeModal";
import { OutcomeRequestDTO } from "@/entities/outcome";
import { useAlertSnackbar } from "@/contexts/alertSnackbarContext";
import OutcomeTableToolbar from "@/components/OutcomeTable/OutcomeTableToolbar";

const Page = () => {
  const [totalValue, setTotalValue] = useState<number>(0);

  const [dateFilter, setDateFilter] = useState<{
    initialDate?: number;
    finalDate?: number;
  }>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { showMessage } = useAlertSnackbar();

  useEffect(() => {
    getOutcomesKpi({
      initialDate: dateFilter.initialDate,
      finalDate: dateFilter.finalDate,
    }).then((res) => {
      if (res.status != 200) {
        showMessage("Erro ao carregar KPIs", "error");
        return;
      }
      const data = res.data;
      setTotalValue(data.totalValue);
    });
  }, [dateFilter, showMessage]);

  function handleDateRangeChange(initialDate?: number, finalDate?: number) {
    setDateFilter({ initialDate, finalDate });
  }

  function handleOnCreateOutcomeClick() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function handleCreateOutcomeSubmit(dto: OutcomeRequestDTO) {
    createOutcome(dto).then((res) => {
      if (res.status != 201) {
        showMessage("Erro ao criar gasto", "error");
        return;
      }
      showMessage("Gasto criado com sucesso", "success");
      setIsModalOpen(false);
    });
  }

  return (
    <div>
      <Container maxWidth="lg">
        <Stack
          className="p-4"
          direction={{ sm: "row", xs: "column" }}
          spacing={{ xs: 1, sm: 2 }}
          justifyContent="space-between"
        >
          <OutcomeInsights total={totalValue} />
          <Button
            className="h-9 self-end"
            variant="contained"
            startIcon={<Add />}
            onClick={handleOnCreateOutcomeClick}
          >
            Criar Gasto
          </Button>
        </Stack>
        <Paper elevation={8} className="p-4 m-4">
          <OutcomeTableToolbar onFilterClick={handleDateRangeChange} />
          <OutcomeTable dateFilter={dateFilter} />
        </Paper>
      </Container>
      <CreateOutcomeModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCreateOutcomeSubmit}
      />
    </div>
  );
};

export default Page;
