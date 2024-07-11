import { Card, CardContent, Typography } from "@mui/material";
import currencyMask from "@/helpers/currencyMask";
import React from "react";

interface KpiCardProps {
  value: number;
  text: string;
}

export default function KpiCard({ value, text }: KpiCardProps) {
  return (
    <Card sx={{ minWidth: 180 }}>
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h5" fontWeight="bold">
          {currencyMask(value)}
        </Typography>
        <Typography>{text}</Typography>
      </CardContent>
    </Card>
  );
}
