import React from "react";
import KpiCard from "@/components/OutcomeInsights/KpiCard";
import { OutcomeKpiResponseDTO } from "@/entities/money-planner-api";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import KpiShowMoreCard from "@/components/OutcomeInsights/KpiShowMoreCard";

interface OutcomeInsightsProps {
  insights: OutcomeKpiResponseDTO;
}

const OutcomeInsights = ({ insights }: OutcomeInsightsProps) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));
  const isLg = useMediaQuery(theme.breakpoints.only("lg"));
  const isXl = useMediaQuery(theme.breakpoints.only("xl"));

  const visibleKpis =
    [isXs, isSm, isMd, isLg, isXl].findIndex((isMatch) => isMatch) + 1;

  return (
    <Box style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
      <KpiCard text="Gasto Total" value={insights.totalValue} />
      {insights.kpiByCategoryList.slice(0, visibleKpis - 1).map((kpi) => (
        <KpiCard
          key={kpi.category.id}
          text={kpi.category.name}
          value={kpi.value}
        />
      ))}
      <KpiShowMoreCard insights={insights} />
    </Box>
  );
};

export default OutcomeInsights;
