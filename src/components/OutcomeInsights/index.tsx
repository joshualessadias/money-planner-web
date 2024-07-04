import React from "react";
import { Card } from "flowbite-react";
import currencyMask from "@/helpers/currencyMask";

interface OutcomeInsightsProps {
  total: number;
}

const OutcomeInsights = ({ total }: OutcomeInsightsProps) => {
  return (
    <div>
      <Card href="#" className="max-w-sm">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {currencyMask(total)}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Total gasto
        </p>
      </Card>
    </div>
  );
};

export default OutcomeInsights;
