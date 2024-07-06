"use client";

import React, { useEffect, useState } from "react";
import { OutcomeResponseDTO } from "@/entities/money-planner-api";
import {
  createOutcome,
  getOutcomesKpi,
  getPageableOutcomes,
} from "@/services/Api/entities/outcome";
import OutcomeInsights from "@/components/OutcomeInsights";
import OutcomeTable from "../../../components/OutcomeTable";
import { Button, Container, Paper, Stack } from "@mui/material";
import { Order } from "@/types";
import { Add } from "@mui/icons-material";
import CreateOutcomeModal from "@/components/CreateOutcomeModal";
import { OutcomeRequestDTO } from "@/entities/outcome";

const Page = () => {
  const [outcomes, setOutcomes] = useState<OutcomeResponseDTO[]>([]);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [orderBy, setOrderBy] = useState<string>("date:desc");
  const [dateFilter, setDateFilter] = useState<{
    initialDate?: number;
    finalDate?: number;
  }>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    getPageableOutcomes({
      page,
      size,
      orderBy,
      initialDate: dateFilter.initialDate,
      finalDate: dateFilter.finalDate,
    }).then((res) => {
      setOutcomes(res.content);
      setTotalElements(res.totalElements);
    });
    getOutcomesKpi({
      initialDate: dateFilter.initialDate,
      finalDate: dateFilter.finalDate,
    }).then((res) => {
      setTotalValue(res.totalValue);
    });
  }, [page, size, orderBy, dateFilter]);

  function handlePageChange(page: number) {
    setPage(page);
  }

  function handleRowsPerPageChange(rowsPerPage: number) {
    setSize(rowsPerPage);
  }

  function handleOrderChange(
    orderedField: keyof OutcomeResponseDTO,
    order: Order
  ) {
    setOrderBy(`${orderedField}:${order}`);
  }

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
    console.log("creating outcome...");
    createOutcome(dto).then((response) => {
      console.log("outcome created", response);
      setIsModalOpen(false);
      setPage(0);
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
          <OutcomeTable
            data={outcomes}
            totalElements={totalElements}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            onOrderChange={handleOrderChange}
            onDateRangeChange={handleDateRangeChange}
          />
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
