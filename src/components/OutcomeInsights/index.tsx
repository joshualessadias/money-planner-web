import React from "react";
import KpiCard from "@/components/OutcomeInsights/KpiCard";

interface OutcomeInsightsProps {
  total: number;
}

const OutcomeInsights = ({ total }: OutcomeInsightsProps) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
      <KpiCard text="Gasto Total" value={total} />
    </div>
  );
};

export default OutcomeInsights;
