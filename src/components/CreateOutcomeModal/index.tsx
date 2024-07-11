import { Box, IconButton, Modal, Stack, Typography } from "@mui/material";
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
      <Box sx={style}>
        <Stack justifyContent="space-between" direction="row">
          <Typography variant="h4">Criar um Gasto</Typography>
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
      </Box>
    </Modal>
  );
}

export default CreateOutcomeModal;
