import { IconButton, Modal, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import CreateOutcomeForm from "@/components/CreateOutcomeModal/CreateOutcomeForm";
import CloseIcon from "@mui/icons-material/Close";
import { OutcomeRequestDTO } from "@/entities/outcome";
import {
  BankResponseDTO,
  OutcomeCategoryResponseDTO,
  PaymentMethodResponseDTO,
} from "@/entities/money-planner-api";

interface CreateOutcomeModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (dto: OutcomeRequestDTO) => void;
  outcomeCategoryList: OutcomeCategoryResponseDTO[];
  paymentMethodList: PaymentMethodResponseDTO[];
  bankList: BankResponseDTO[];
}

function CreateOutcomeModal({
  open,
  onClose,
  onSubmit,
  outcomeCategoryList,
  paymentMethodList,
  bankList,
}: CreateOutcomeModalProps) {
  function handleSubmit(dto: OutcomeRequestDTO) {
    onSubmit(dto);
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
          <Typography variant="h5">Criar um Gasto</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <CreateOutcomeForm
          outcomeCategoryList={outcomeCategoryList}
          paymentMethodList={paymentMethodList}
          bankList={bankList}
          onSubmit={handleSubmit}
        />
      </Paper>
    </Modal>
  );
}

export default CreateOutcomeModal;
