import React from "react";
import KpiCard from "@/components/OutcomeInsights/KpiCard";
import { OutcomeKpiResponseDTO } from "@/entities/money-planner-api";
import { Box } from "@mui/material";

interface OutcomeInsightsProps {
  insights: OutcomeKpiResponseDTO;
}

const OutcomeInsights = ({ insights }: OutcomeInsightsProps) => {
  return (
    <Box style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
      <KpiCard text="Gasto Total" value={insights.totalValue} />
      {insights.kpiByCategoryList.slice(0, 3).map((kpi) => (
        <KpiCard
          key={kpi.category.id}
          text={kpi.category.name}
          value={kpi.value}
        />
      ))}
    </Box>
  );
};

export default OutcomeInsights;
