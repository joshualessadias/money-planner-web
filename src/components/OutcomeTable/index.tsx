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
  filter: {
    hideInstallments?: boolean;
    initialDate?: number;
    finalDate?: number;
    outcomeCategoryId?: number;
    paymentMethodId?: number;
    bankId?: number;
  };
  updateOutcomes: boolean;
}

function OutcomeTable({ filter, updateOutcomes }: OutcomeTableProps) {
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
      initialDate: filter.initialDate,
      finalDate: filter.finalDate,
      categoryId: filter.outcomeCategoryId,
      paymentMethodId: filter.paymentMethodId,
      bankId: filter.bankId,
      hideInstallments: filter.hideInstallments,
    }).then((res) => {
      if (res.status != 200) {
        showMessage("Erro ao carregar gastos", "error");
        return;
      }
      const data = res.data;
      setOutcomes(data.content);
      setTotalElements(data.totalElements);
    });
  }, [filter, orderBy, page, size, updateOutcomes, showMessage]);

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
        <Table sx={{ minWidth: 650 }}>
          <OutcomeTableHead
            onRequestSort={handleRequestSort}
            order={order}
            orderBy={orderedField}
          />
          <TableBody>
            {outcomes.map((outcome) => (
              <TableRow key={outcome.id}>
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
        className="pt-2 border-0"
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
