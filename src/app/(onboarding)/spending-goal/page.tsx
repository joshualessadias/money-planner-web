"use client";

import { Button, Container, Paper, Stack, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import SpendingGoalTable from "@/components/SpendingGoalTable";
import {
  SpendingGoalRequestDTO,
  SpendingGoalResponseDTO,
} from "@/entities/money-planner-api";
import { getPageableSpendingGoals } from "@/services/Api/entities/spendingGoal";
import { useAlertSnackbar } from "@/contexts/alertSnackbarContext";
import CreateOrEditSpendingGoalModal from "@/components/CreateOrEditSpendingGoalModal";

export default function Page() {
  const { showMessage } = useAlertSnackbar();
  const [spendingGoals, setSpendingGoals] = useState<SpendingGoalResponseDTO[]>(
    []
  );
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [orderBy, setOrderBy] = useState<string>();
  const [totalElements, setTotalElements] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    getPageableSpendingGoals({ page, size, orderBy }).then((res) => {
      if (res.status != 200) {
        showMessage("Erro ao buscar metas de gastos", "error");
      }
      const data = res.data;
      setSpendingGoals(data.content);
      setTotalElements(data.numberOfElements);
    });
  }, [orderBy, page, showMessage, size]);

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function handleCreateSpendingGoalSubmit(dto: SpendingGoalRequestDTO) {
    console.log(dto);
  }

  function handleOnCreateSpendingGoalClick() {
    setIsModalOpen(true);
  }

  return (
    <Container>
      <Typography variant="h3" paddingBottom={2}>
        Metas de Gastos
      </Typography>
      <Stack spacing={2}>
        <Button
          sx={{ alignSelf: "flex-end", textWrap: "nowrap" }}
          variant="contained"
          startIcon={<Add />}
          onClick={handleOnCreateSpendingGoalClick}
        >
          Criar Meta de Gastos
        </Button>
        <Paper sx={{ padding: 2 }}>
          <SpendingGoalTable
            spendingGoals={spendingGoals}
            onSetOrderBy={setOrderBy}
            page={page}
            handlePageChange={(_e, page) => setPage(page)}
            size={size}
            handleRowsPerPageChange={(e) => setSize(Number(e.target.value))}
            totalElements={totalElements}
          />
        </Paper>
      </Stack>
      <CreateOrEditSpendingGoalModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCreateSpendingGoalSubmit}
      />
    </Container>
  );
}
