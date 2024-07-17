import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  BankResponseDTO,
  OutcomeCategoryResponseDTO,
  OutcomeResponseDTO,
  PaymentMethodResponseDTO,
} from "@/entities/money-planner-api";
import formatCurrency from "@/helpers/currencyMask";
import formatDate from "@/helpers/dateMask";
import OutcomeTableHead from "@/components/OutcomeTable/OutcomeTableHead";
import { Order } from "@/types";
import { getPageableOutcomes } from "@/services/Api/entities/outcome";
import { useAlertSnackbar } from "@/contexts/alertSnackbarContext";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutcomeModal from "@/components/EditOutcomeModal";
import { OutcomeRequestDTO } from "@/entities/outcome";
import DeleteOutcomeModal from "@/components/DeleteOutcomeModal";

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
  bankList: BankResponseDTO[];
  outcomeCategoryList: OutcomeCategoryResponseDTO[];
  paymentMethodList: PaymentMethodResponseDTO[];
  onEditOutcomeSubmit: (id: number, dto: OutcomeRequestDTO) => void;
  onDeleteOutcomeSubmit: (id: number) => void;
}

function OutcomeTable({
  filter,
  updateOutcomes,
  bankList,
  outcomeCategoryList,
  paymentMethodList,
  onEditOutcomeSubmit,
  onDeleteOutcomeSubmit,
}: OutcomeTableProps) {
  const [orderedField, setOrderedField] =
    useState<keyof OutcomeResponseDTO>("date");
  const [order, setOrder] = useState<Order>("desc");
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [orderBy, setOrderBy] = useState<string>("date:desc");
  const [outcomes, setOutcomes] = useState<OutcomeResponseDTO[]>([]);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [outcomeToEdit, setOutcomeToEdit] = useState<OutcomeResponseDTO | null>(
    null
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [outcomeToDelete, setOutcomeToDelete] =
    useState<OutcomeResponseDTO | null>(null);

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

  function handleOnModeEditIconClick(outcome: OutcomeResponseDTO) {
    setOutcomeToEdit(outcome.installmentParent || outcome);
    setIsEditModalOpen(true);
  }

  function handleOnDeleteIconClick(outcome: OutcomeResponseDTO) {
    setOutcomeToDelete(outcome.installmentParent || outcome);
    setIsDeleteModalOpen(true);
  }

  function handleCloseEditModal() {
    setIsEditModalOpen(false);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  function handleEditOutcomeSubmit(id: number, dto: OutcomeRequestDTO) {
    onEditOutcomeSubmit(id, dto);
    setIsEditModalOpen(false);
  }

  function handleDeleteOutcomeSubmit(id: number) {
    onDeleteOutcomeSubmit(id);
    setIsDeleteModalOpen(false);
  }

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple-table">
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
                <TableCell padding="none" align="right">
                  <IconButton>
                    <ModeEditIcon
                      onClick={() => handleOnModeEditIconClick(outcome)}
                    />
                  </IconButton>
                </TableCell>
                <TableCell padding="none" align="right">
                  <IconButton>
                    <DeleteIcon
                      color="error"
                      onClick={() => handleOnDeleteIconClick(outcome)}
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
        onRowsPerPageChange={handleRowsPerPageChande}
        onPageChange={handlePageChange}
        count={totalElements}
      ></TablePagination>
      {outcomeToEdit && (
        <EditOutcomeModal
          open={isEditModalOpen}
          onClose={handleCloseEditModal}
          onSubmit={handleEditOutcomeSubmit}
          outcomeCategoryList={outcomeCategoryList}
          paymentMethodList={paymentMethodList}
          bankList={bankList}
          initialOutcome={outcomeToEdit}
        />
      )}
      {outcomeToDelete && (
        <DeleteOutcomeModal
          initialOutcome={outcomeToDelete}
          onClose={handleCloseDeleteModal}
          onSubmit={handleDeleteOutcomeSubmit}
          open={isDeleteModalOpen}
        />
      )}
    </>
  );
}

export default OutcomeTable;
