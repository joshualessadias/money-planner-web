"use client";

import React, { useEffect, useState } from "react";
import { OutcomeResponseDTO } from "@/entities/money-planner-api";
import {
  getOutcomesKpi,
  getPageableOutcomes,
} from "@/services/Api/entities/outcome";
import OutcomeInsights from "@/components/OutcomeInsights";
import OutcomeTable from "../../../components/OutcomeTable";
import { Paper, Container } from "@mui/material";
import { Order } from "@/types";

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

  return (
    <Container maxWidth="lg">
      <OutcomeInsights total={totalValue} />
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
  );
};

export default Page;
