import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { OutcomeResponseDTO } from "@/entities/money-planner-api";
import formatCurrency from "@/helpers/currencyMask";
import formatDate from "@/helpers/dateMask";

interface OutcomeTableProps {
  data: OutcomeResponseDTO[];
  totalElements: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
}

const OutcomeTable = ({
  data,
  totalElements,
  onPageChange,
  onRowsPerPageChange,
}: OutcomeTableProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  function handlePageChange(e: any, page: number) {
    setCurrentPage(page);
    onPageChange(page);
  }

  function handleRowsPerPageChande(e: any) {
    let value = e.target.value;
    setRowsPerPage(value);
    onRowsPerPageChange(value);
  }

  console.log(currentPage);

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell align="right">Value</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell>Bank</TableCell>
            </TableRow>
          </TableHead>
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
};

export default OutcomeTable;
