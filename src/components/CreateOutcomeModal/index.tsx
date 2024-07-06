import { Box, IconButton, Modal, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CreateOutcomeForm from "@/components/CreateOutcomeModal/CreateOutcomeForm";
import CloseIcon from "@mui/icons-material/Close";
import {
  BankResponseDTO,
  OutcomeCategoryResponseDTO,
  PaymentMethodResponseDTO,
} from "@/entities/money-planner-api";
import { getOutcomeCategoryList } from "@/services/Api/entities/outcomeCategory";
import { getPaymentMethodList } from "@/services/Api/entities/paymentMethod";
import { getBankList } from "@/services/Api/entities/bank";
import { OutcomeRequestDTO } from "@/entities/outcome";

interface CreateOutcomeModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (dto: OutcomeRequestDTO) => void;
}

function CreateOutcomeModal({
  open,
  onClose,
  onSubmit,
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

  const [outcomeCategoryList, setOutcomeCategoryList] = useState<
    OutcomeCategoryResponseDTO[]
  >([]);
  const [paymentMethodList, setPaymentMethodList] = useState<
    PaymentMethodResponseDTO[]
  >([]);
  const [bankList, setBankList] = useState<BankResponseDTO[]>([]);

  useEffect(() => {
    getOutcomeCategoryList().then((res) => {
      setOutcomeCategoryList(res);
    });
    getPaymentMethodList().then((res) => {
      setPaymentMethodList(res);
    });
    getBankList().then((res) => {
      setBankList(res);
    });
  }, []);

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
