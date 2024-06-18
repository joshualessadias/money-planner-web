"use client";

import React, { useEffect, useState } from "react";
import { OutcomeResponseDTO } from "@/entities/money-planner-api";
import {
  getOutcomesKpi,
  getPageableOutcomes,
} from "@/services/Api/entities/outcome";
import OutcomeInsights from "@/components/OutcomeInsights";
import OutcomeTable from "../../../components/OutcomeTable";
import { Paper } from "@mui/material";
import { Order } from "@/types";

const Page = () => {
  const [outcomes, setOutcomes] = useState<OutcomeResponseDTO[]>([]);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [orderBy, setOrderBy] = useState<string>("date:desc");

  useEffect(() => {
    getPageableOutcomes({
      page: page,
      size: rowsPerPage,
      orderBy: orderBy,
    }).then((res) => {
      setOutcomes(res.content);
      setTotalElements(res.totalElements);
    });
    getOutcomesKpi().then((res) => {
      setTotalValue(res.totalValue);
    });
  }, [page, rowsPerPage, orderBy]);

  function handlePageChange(page: number) {
    setPage(page);
  }

  function handleRowsPerPageChange(rowsPerPage: number) {
    setRowsPerPage(rowsPerPage);
  }

  function handleOrderChange(
    orderedField: keyof OutcomeResponseDTO,
    order: Order
  ) {
    setOrderBy(`${orderedField}:${order}`);
  }

  return (
    <div>
      <OutcomeInsights total={totalValue} />
      <Paper elevation={8} className="p-4 m-4">
        <OutcomeTable
          data={outcomes}
          totalElements={totalElements}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          onOrderChange={handleOrderChange}
        />
      </Paper>
    </div>
  );
};

export default Page;
