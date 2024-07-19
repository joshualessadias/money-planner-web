import React from "react";
import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { Order } from "@/types";
import { visuallyHidden } from "@mui/utils";

export interface HeadCell<T> {
  id: keyof T;
  label: string;
  numeric: boolean;
}

interface GenericTableHeadProps<T> {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
  order: Order;
  orderBy: string | undefined;
  headCells: HeadCell<T>[];
}

function GenericTableHead<T>({
  order,
  orderBy,
  onRequestSort,
  headCells,
}: GenericTableHeadProps<T>) {
  const createSortHandler =
    (property: keyof T) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, index) => (
          <TableCell
            key={index}
            className="p-4 font-bold"
            align={headCell.numeric ? "right" : "left"}
            padding={index == 0 ? "none" : "normal"}
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
        <TableCell key="actions"></TableCell>
      </TableRow>
    </TableHead>
  );
}

export default GenericTableHead;
