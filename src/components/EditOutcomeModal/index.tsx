import { IconButton, Modal, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { OutcomeRequestDTO } from "@/entities/outcome";
import {
  BankResponseDTO,
  OutcomeCategoryResponseDTO,
  OutcomeResponseDTO,
  PaymentMethodResponseDTO,
} from "@/entities/money-planner-api";
import EditOutcomeForm from "@/components/EditOutcomeModal/EditOutcomeForm";

interface EditOutcomeModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (id: number, dto: OutcomeRequestDTO) => void;
  outcomeCategoryList: OutcomeCategoryResponseDTO[];
  paymentMethodList: PaymentMethodResponseDTO[];
  bankList: BankResponseDTO[];
  initialOutcome: OutcomeResponseDTO;
}

function EditOutcomeModal({
  open,
  onClose,
  onSubmit,
  outcomeCategoryList,
  paymentMethodList,
  bankList,
  initialOutcome,
}: EditOutcomeModalProps) {
  function handleSubmit(id: number, dto: OutcomeRequestDTO) {
    onSubmit(id, dto);
  }

  return (
    <Modal
      open={open}
      onClose={(event, reason) => {
        if (reason === "backdropClick") return;
        onClose();
      }}
      disableEscapeKeyDown
    >
      <Paper
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          p: 2,
        }}
      >
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
        >
          <Typography variant="h5">Editar um Gasto</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <EditOutcomeForm
          outcomeCategoryList={outcomeCategoryList}
          paymentMethodList={paymentMethodList}
          bankList={bankList}
          onSubmit={handleSubmit}
          initialOutcome={initialOutcome}
        />
      </Paper>
    </Modal>
  );
}

export default EditOutcomeModal;
