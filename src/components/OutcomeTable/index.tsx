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
import GenericTableHead, { HeadCell } from "../GenericTableHead";
import { Order } from "@/types";
import { getPageableOutcomes } from "@/services/Api/entities/outcome";
import { useAlertSnackbar } from "@/contexts/alertSnackbarContext";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateOrEditOutcomeModal from "@/components/CreateOrEditOutcomeModal";
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
  onEditOutcomeSubmit: (dto: OutcomeRequestDTO, id: number) => void;
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

  function handleRowsPerPageChange(
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    setSize(Number(e.target.value));
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

  function handleEditOutcomeSubmit(dto: OutcomeRequestDTO, id?: number) {
    onEditOutcomeSubmit(dto, id ?? -1);
    setIsEditModalOpen(false);
  }

  function handleDeleteOutcomeSubmit(id: number) {
    onDeleteOutcomeSubmit(id);
    setIsDeleteModalOpen(false);
  }

  const headCells: HeadCell<OutcomeResponseDTO>[] = [
    {
      id: "description",
      numeric: false,
      label: "Descrição",
    },
    { id: "value", numeric: true, label: "Valor" },
    { id: "date", numeric: false, label: "Data" },
    {
      id: "category",
      numeric: false,
      label: "Categoria",
    },
    {
      id: "paymentMethod",
      numeric: false,
      label: "Método de Pagamento",
    },
    { id: "bank", numeric: false, label: "Banco" },
  ];

  return (
    <>
      <TableContainer>
        <Table>
          <GenericTableHead<OutcomeResponseDTO>
            onRequestSort={handleRequestSort}
            order={order}
            orderBy={orderedField}
            headCells={headCells}
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
                <TableCell
                  padding="none"
                  align="right"
                  sx={{ textWrap: "nowrap" }}
                >
                  <IconButton>
                    <ModeEditIcon
                      onClick={() => handleOnModeEditIconClick(outcome)}
                    />
                  </IconButton>
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
        onRowsPerPageChange={handleRowsPerPageChange}
        onPageChange={handlePageChange}
        count={totalElements}
      ></TablePagination>
      {outcomeToEdit && (
        <CreateOrEditOutcomeModal
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
