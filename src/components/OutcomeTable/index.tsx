import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { OutcomeResponseDTO } from "@/entities/money-planner-api";
import formatCurrency from "@/helpers/currencyMask";
import formatDate from "@/helpers/dateMask";
import OutcomeTableHead from "@/components/OutcomeTable/OutcomeTableHead";
import { Order } from "@/types";

interface OutcomeTableProps {
  data: OutcomeResponseDTO[];
  totalElements: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  onOrderChange: (orderedField: keyof OutcomeResponseDTO, order: Order) => void;
}

function OutcomeTable({
  data,
  totalElements,
  onPageChange,
  onRowsPerPageChange,
  onOrderChange,
}: OutcomeTableProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderedField, setOrderedField] =
    useState<keyof OutcomeResponseDTO>("date");
  const [order, setOrder] = useState<Order>("desc");

  function handlePageChange(e: any, page: number) {
    setCurrentPage(page);
    onPageChange(page);
  }

  function handleRowsPerPageChande(e: any) {
    let value = e.target.value;
    setRowsPerPage(value);
    onRowsPerPageChange(value);
  }

  function handleRequestSort(
    event: React.MouseEvent<unknown>,
    property: keyof OutcomeResponseDTO
  ) {
    const isAsc = orderedField === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderedField(property);
    onOrderChange(property, isAsc ? "desc" : "asc");
  }

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <OutcomeTableHead
            onRequestSort={handleRequestSort}
            order={order}
            orderBy={orderedField}
          />
          <TableBody>
            {data.map((data) => (
              <TableRow
                key={data.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell scope="row">{data.description}</TableCell>
                <TableCell align="right">
                  {formatCurrency(data.value)}
                </TableCell>
                <TableCell>{formatDate(data.date)}</TableCell>
                <TableCell>
                  {data.category ? data.category.name : "-"}
                </TableCell>
                <TableCell>{data.paymentMethod.name}</TableCell>
                <TableCell>{data.bank.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        className="pt-2"
        style={{ display: "flex", justifyContent: "center" }}
        color={"primary"}
        page={currentPage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChande}
        onPageChange={handlePageChange}
        count={totalElements}
      ></TablePagination>
    </>
  );
}

export default OutcomeTable;
