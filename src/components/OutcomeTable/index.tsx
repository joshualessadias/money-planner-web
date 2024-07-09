import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { OutcomeResponseDTO } from "@/entities/money-planner-api";
import formatCurrency from "@/helpers/currencyMask";
import formatDate from "@/helpers/dateMask";
import OutcomeTableHead from "@/components/OutcomeTable/OutcomeTableHead";
import { Order } from "@/types";
import { getPageableOutcomes } from "@/services/Api/entities/outcome";
import { useAlertSnackbar } from "@/contexts/alertSnackbarContext";

interface OutcomeTableProps {
  dateFilter: { initialDate?: number; finalDate?: number };
  updateOutcomes: boolean;
}

function OutcomeTable({ dateFilter, updateOutcomes }: OutcomeTableProps) {
  const [orderedField, setOrderedField] =
    useState<keyof OutcomeResponseDTO>("date");
  const [order, setOrder] = useState<Order>("desc");
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [orderBy, setOrderBy] = useState<string>("date:desc");
  const [outcomes, setOutcomes] = useState<OutcomeResponseDTO[]>([]);
  const [totalElements, setTotalElements] = useState<number>(0);

  const { showMessage } = useAlertSnackbar();

  useEffect(() => {
    getPageableOutcomes({
      page,
      size,
      orderBy,
      initialDate: dateFilter.initialDate,
      finalDate: dateFilter.finalDate,
    }).then((res) => {
      if (res.status != 200) {
        showMessage("Erro ao carregar gastos", "error");
        return;
      }
      const data = res.data;
      setOutcomes(data.content);
      setTotalElements(data.totalElements);
    });
  }, [
    dateFilter.finalDate,
    dateFilter.initialDate,
    orderBy,
    page,
    size,
    updateOutcomes,
    showMessage,
  ]);

  function handlePageChange(_e: any, page: number) {
    setPage(page);
  }

  function handleRowsPerPageChande(e: any) {
    setSize(e.target.value);
  }

  function handleRequestSort(
    _event: React.MouseEvent<unknown>,
    property: keyof OutcomeResponseDTO
  ) {
    const isAsc = orderedField === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(`${property}:${isAsc ? "desc" : "asc"}`);
    setOrderedField(property);
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
            {outcomes.map((outcome) => (
              <TableRow
                key={outcome.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell scope="row">{outcome.description}</TableCell>
                <TableCell align="right">
                  {formatCurrency(outcome.value)}
                </TableCell>
                <TableCell>{formatDate(outcome.date)}</TableCell>
                <TableCell>
                  {outcome.category ? outcome.category.name : "-"}
                </TableCell>
                <TableCell>{outcome.paymentMethod.name}</TableCell>
                <TableCell>{outcome.bank.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        className="pt-2"
        style={{ display: "flex", justifyContent: "center" }}
        color={"primary"}
        page={page}
        rowsPerPage={size}
        onRowsPerPageChange={handleRowsPerPageChande}
        onPageChange={handlePageChange}
        count={totalElements}
      ></TablePagination>
    </>
  );
}

export default OutcomeTable;
