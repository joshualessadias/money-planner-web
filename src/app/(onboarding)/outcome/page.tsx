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

const Page = () => {
  const [outcomes, setOutcomes] = useState<OutcomeResponseDTO[]>([]);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  useEffect(() => {
    getPageableOutcomes({ page: page, size: rowsPerPage }).then((res) => {
      setOutcomes(res.content);
      setTotalElements(res.totalElements);
    });
    getOutcomesKpi().then((res) => {
      setTotalValue(res.totalValue);
    });
  }, [page, rowsPerPage]);

  function handlePageChange(page: number) {
    setPage(page);
  }

  function handleRowsPerPageChange(rowsPerPage: number) {
    setRowsPerPage(rowsPerPage);
  }

  return (
    <div>
      {/*<TableHeader />*/}
      <OutcomeInsights total={totalValue} />
      <Paper elevation={8} className="p-4 m-4">
        <OutcomeTable
          data={outcomes}
          totalElements={totalElements}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Paper>
    </div>
  );
};

export default Page;
