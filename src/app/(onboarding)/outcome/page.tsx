"use client";

import React, { useEffect, useState } from "react";
import CustomOutcomeTable from "@/components/Table";
import { OutcomeResponseDTO } from "@/entities/money-planner-api";
import { getPageableOutcomes } from "@/services/Api/entities/outcome";
import OutcomeInsights from "@/components/OutcomeInsights";

const Page = () => {
  const [outcomes, setOutcomes] = useState<OutcomeResponseDTO[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const getTotalAmount = (outcomes: OutcomeResponseDTO[]) => {
    return outcomes.reduce((acc, outcome) => acc + outcome.value, 0);
  };

  useEffect(() => {
    getPageableOutcomes({ page: page, size: 10 }).then((res) => {
      setOutcomes(res.content);
      setTotalPages(res.totalPages);
      setTotalValue(getTotalAmount(res.content));
    });
  }, []);

  useEffect(() => {
    getPageableOutcomes({ page: page, size: 10 }).then((res) => {
      setOutcomes(res.content);
      setTotalPages(res.totalPages);
      setTotalValue(getTotalAmount(res.content));
    });
  }, [page]);

  const onPageChange = (page: number) => {
    setPage(page);
  };

  return (
    <div>
      {/*<TableHeader />*/}
      <OutcomeInsights total={totalValue} />
      <CustomOutcomeTable
        data={outcomes}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default Page;
