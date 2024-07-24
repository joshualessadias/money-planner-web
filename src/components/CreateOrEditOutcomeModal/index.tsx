import {
  IconButton,
  Modal,
  Paper,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { OutcomeRequestDTO } from "@/entities/outcome";
import {
  BankResponseDTO,
  OutcomeCategoryResponseDTO,
  OutcomeResponseDTO,
  PaymentMethodResponseDTO,
} from "@/entities/money-planner-api";
import CreateOrEditOutcomeForm from "@/components/CreateOrEditOutcomeModal/CreateOrEditOutcomeForm";

interface CreateOrEditOutcomeModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (dto: OutcomeRequestDTO, id?: number) => void;
  outcomeCategoryList: OutcomeCategoryResponseDTO[];
  paymentMethodList: PaymentMethodResponseDTO[];
  bankList: BankResponseDTO[];
  initialOutcome?: OutcomeResponseDTO;
}

function CreateOrEditOutcomeModal({
  open,
  onClose,
  onSubmit,
  outcomeCategoryList,
  paymentMethodList,
  bankList,
  initialOutcome,
}: CreateOrEditOutcomeModalProps) {
  function handleSubmit(dto: OutcomeRequestDTO, id?: number) {
    onSubmit(dto, id);
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
          minWidth: 330,
          maxWidth: 500,
        }}
      >
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
        >
          <Typography variant="h5">
            {initialOutcome ? "Editar um Gasto" : "Criar um Gasto"}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Box paddingTop={2}>
          <CreateOrEditOutcomeForm
            outcomeCategoryList={outcomeCategoryList}
            paymentMethodList={paymentMethodList}
            bankList={bankList}
            onSubmit={handleSubmit}
            initialOutcome={initialOutcome}
          />
        </Box>
      </Paper>
    </Modal>
  );
}

export default CreateOrEditOutcomeModal;
