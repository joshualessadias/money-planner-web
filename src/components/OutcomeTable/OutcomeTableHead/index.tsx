import React from "react";
import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { Order } from "@/types";
import { OutcomeResponseDTO } from "@/entities/money-planner-api";
import { visuallyHidden } from "@mui/utils";

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof OutcomeResponseDTO
  ) => void;
  order: Order;
  orderBy: string;
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof OutcomeResponseDTO;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "description",
    numeric: false,
    disablePadding: true,
    label: "Descrição",
  },
  { id: "value", numeric: true, disablePadding: false, label: "Valor" },
  { id: "date", numeric: false, disablePadding: false, label: "Data" },
  { id: "category", numeric: false, disablePadding: false, label: "Categoria" },
  {
    id: "paymentMethod",
    numeric: false,
    disablePadding: false,
    label: "Método de Pagamento",
  },
  { id: "bank", numeric: false, disablePadding: false, label: "Banco" },
];

function OutcomeTableHead({
  order,
  orderBy,
  onRequestSort,
}: EnhancedTableProps) {
  const createSortHandler =
    (property: keyof OutcomeResponseDTO) =>
    (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            className="border-0 p-4 font-bold"
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default OutcomeTableHead;
