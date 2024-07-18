"use client";

import React, { useEffect, useState } from "react";
import {
  createOutcome,
  deleteOutcome,
  getOutcomesKpi,
  updateOutcome,
} from "@/services/Api/entities/outcome";
import OutcomeInsights from "@/components/OutcomeInsights";
import OutcomeTable from "../../../components/OutcomeTable";
import { Button, Paper, Stack } from "@mui/material";
import { Add } from "@mui/icons-material";
import CreateOutcomeModal from "@/components/CreateOutcomeModal";
import { OutcomeRequestDTO } from "@/entities/outcome";
import { useAlertSnackbar } from "@/contexts/alertSnackbarContext";
import OutcomeTableToolbar from "@/components/OutcomeTable/OutcomeTableToolbar";
import { getOutcomeCategoryList } from "@/services/Api/entities/outcomeCategory";
import { getPaymentMethodList } from "@/services/Api/entities/paymentMethod";
import { getBankList } from "@/services/Api/entities/bank";
import {
  BankResponseDTO,
  OutcomeCategoryResponseDTO,
  OutcomeKpiResponseDTO,
  PaymentMethodResponseDTO,
} from "@/entities/money-planner-api";
import { getFirstDayOfMonth, getLastDayOfMonth } from "@/helpers/datePicker";

const Page = () => {
  const [insights, setInsights] = useState<OutcomeKpiResponseDTO>({
    kpiByCategoryList: [],
    totalValue: 0,
  });
  const [updateOutcomes, setUpdateOutcomes] = useState<boolean>(false);
  const [filter, setFilter] = useState<{
    hideInstallments?: boolean;
    initialDate?: number;
    finalDate?: number;
    outcomeCategoryId?: number;
    paymentMethodId?: number;
    bankId?: number;
  }>({
    initialDate: getFirstDayOfMonth().valueOf(),
    finalDate: getLastDayOfMonth().valueOf(),
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { showMessage } = useAlertSnackbar();
  const [outcomeCategoryList, setOutcomeCategoryList] = useState<
    OutcomeCategoryResponseDTO[]
  >([]);
  const [paymentMethodList, setPaymentMethodList] = useState<
    PaymentMethodResponseDTO[]
  >([]);
  const [bankList, setBankList] = useState<BankResponseDTO[]>([]);

  useEffect(() => {
    getOutcomesKpi({
      initialDate: filter.initialDate,
      finalDate: filter.finalDate,
    }).then((res) => {
      if (res.status != 200) {
        showMessage("Erro ao carregar KPIs", "error");
        return;
      }
      setInsights(res.data);
    });
  }, [filter.initialDate, filter.finalDate, updateOutcomes, showMessage]);

  useEffect(() => {
    getOutcomeCategoryList().then((res) => {
      setOutcomeCategoryList(res);
    });
    getPaymentMethodList().then((res) => {
      setPaymentMethodList(res);
    });
    getBankList().then((res) => {
      setBankList(res);
    });
  }, []);

  function handleDateRangeChange(
    hideInstallments: boolean,
    initialDate?: number,
    finalDate?: number,
    outcomeCategoryId?: number,
    paymentMethodId?: number,
    bankId?: number
  ) {
    setFilter({
      hideInstallments,
      initialDate,
      finalDate,
      outcomeCategoryId,
      paymentMethodId,
      bankId,
    });
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
      } else {
        showMessage("Gasto criado com sucesso", "success");
        setUpdateOutcomes(!updateOutcomes);
      }
      setIsModalOpen(false);
    });
  }

  function handleEditOutcomeSubmit(id: number, dto: OutcomeRequestDTO) {
    updateOutcome(id, dto).then((res) => {
      if (res.status != 202) {
        showMessage("Erro ao atualizar gasto", "error");
      } else {
        showMessage("Gasto atualizado com sucesso", "success");
        setUpdateOutcomes(!updateOutcomes);
      }
    });
  }

  function handleDeleteOutcomeSubmit(id: number) {
    deleteOutcome(id).then((res) => {
      if (res.status != 204) {
        showMessage("Erro ao deletar gasto", "error");
      } else {
        showMessage("Gasto deletado com sucesso", "success");
        setUpdateOutcomes(!updateOutcomes);
      }
    });
  }

  return (
    <div>
      <Stack spacing={2} paddingY={4} paddingX={8}>
        <Stack
          direction={{ sm: "row", xs: "column" }}
          spacing={{ xs: 1, sm: 2 }}
          justifyContent="space-between"
        >
          <OutcomeInsights insights={insights} />
          <Button
            className="h-9 self-end text-nowrap w-48"
            variant="contained"
            startIcon={<Add />}
            onClick={handleOnCreateOutcomeClick}
          >
            Criar Gasto
          </Button>
        </Stack>
        <Paper sx={{ padding: 2 }}>
          <OutcomeTableToolbar
            onFilterClick={handleDateRangeChange}
            outcomeCategoryList={outcomeCategoryList}
            paymentMethodList={paymentMethodList}
            bankList={bankList}
          />
          <OutcomeTable
            filter={filter}
            updateOutcomes={updateOutcomes}
            bankList={bankList}
            outcomeCategoryList={outcomeCategoryList}
            paymentMethodList={paymentMethodList}
            onEditOutcomeSubmit={handleEditOutcomeSubmit}
            onDeleteOutcomeSubmit={handleDeleteOutcomeSubmit}
          />
        </Paper>
      </Stack>
      <CreateOutcomeModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCreateOutcomeSubmit}
        outcomeCategoryList={outcomeCategoryList}
        paymentMethodList={paymentMethodList}
        bankList={bankList}
      />
    </div>
  );
};

export default Page;
