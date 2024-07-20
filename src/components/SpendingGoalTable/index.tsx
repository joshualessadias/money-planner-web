import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from "@mui/material";
import { SpendingGoalResponseDTO } from "@/entities/money-planner-api";
import GenericTableHead, { HeadCell } from "@/components/GenericTableHead";
import React, { useState } from "react";
import { Order } from "@/types";
import formatCurrency from "@/helpers/currencyMask";
import formatDate from "@/helpers/dateMask";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";

interface SpendingGoalTableProps {
  spendingGoals: SpendingGoalResponseDTO[];
  onSetOrderBy: (orderBy: string) => void;
  page: number;
  handlePageChange: (_e: any, page: number) => void;
  size: number;
  handleRowsPerPageChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  totalElements: number;
}

export default function SpendingGoalTable({
  spendingGoals,
  onSetOrderBy,
  totalElements,
  page,
  handlePageChange,
  size,
  handleRowsPerPageChange,
}: SpendingGoalTableProps) {
  const [orderedField, setOrderedField] =
    useState<keyof SpendingGoalResponseDTO>();
  const [order, setOrder] = useState<Order>("desc");

  function handleEditClick(spendingGoal: SpendingGoalResponseDTO) {
    console.log("editing: ", spendingGoal);
  }

  function handleDeleteClick(spendingGoal: SpendingGoalResponseDTO) {
    console.log("editing: ", spendingGoal);
  }

  function handleRequestSort(
    _event: React.MouseEvent<unknown>,
    property: keyof SpendingGoalResponseDTO
  ) {
    const isAsc = orderedField === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    onSetOrderBy(`${property}:${isAsc ? "desc" : "asc"}`);
    setOrderedField(property);
  }

  function handleOnEditClick(spendingGoal: SpendingGoalResponseDTO) {
    console.log("editing: " + spendingGoal);
  }

  function handleOnDeleteClick(spendingGoal: SpendingGoalResponseDTO) {
    console.log("deleting: " + spendingGoal);
  }

  const headCells: HeadCell<SpendingGoalResponseDTO>[] = [
    {
      id: "name",
      label: "Nome",
      numeric: false,
    },
    {
      id: "value",
      label: "Valor",
      numeric: true,
    },
    {
      id: "initialDate",
      label: "Data Inicial",
      numeric: false,
    },
    {
      id: "finalDate",
      label: "Data Final",
      numeric: false,
    },
  ];

  return (
    <>
      <TableContainer>
        <Table>
          <GenericTableHead<SpendingGoalResponseDTO>
            headCells={headCells}
            orderBy={orderedField}
            order={order}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {spendingGoals.map((spendingGoal) => (
              <TableRow key={spendingGoal.id}>
                <TableCell>{spendingGoal.name}</TableCell>
                <TableCell align="right">
                  {formatCurrency(spendingGoal.value)}
                </TableCell>
                <TableCell>{formatDate(spendingGoal.initialDate)}</TableCell>
                <TableCell>{formatDate(spendingGoal.finalDate)}</TableCell>
                <TableCell
                  padding="none"
                  align="right"
                  sx={{ textWrap: "nowrap" }}
                >
                  <IconButton>
                    <ModeEditIcon
                      onClick={() => handleOnEditClick(spendingGoal)}
                    />
                  </IconButton>
                  <IconButton>
                    <DeleteIcon
                      color="error"
                      onClick={() => handleOnDeleteClick(spendingGoal)}
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        className="pt-2 border-0"
        style={{ display: "flex", justifyContent: "center" }}
        color={"primary"}
        page={page}
        rowsPerPage={size}
        onRowsPerPageChange={handleRowsPerPageChange}
        onPageChange={handlePageChange}
        count={totalElements}
      />
    </>
  );
}
