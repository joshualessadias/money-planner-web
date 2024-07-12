import { Box, IconButton, Modal, Stack, Typography } from "@mui/material";
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
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: 400,
    // height: 400,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    p: 2,
  };

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
      <Box sx={style}>
        <Stack justifyContent="space-between" direction="row">
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
      </Box>
    </Modal>
  );
}

export default EditOutcomeModal;
