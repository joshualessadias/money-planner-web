import {
  Box,
  IconButton,
  Modal,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import {
  SpendingGoalRequestDTO,
  SpendingGoalResponseDTO,
} from "@/entities/money-planner-api";
import CreateOrEditSpendingGoalForm from "@/components/CreateOrEditSpendingGoalModal/CreateOrEditSpendingGoalForm";

interface CreateOrEditSpendingGoalModalProps {
  open: boolean;
  initialSpendingGoal?: SpendingGoalResponseDTO;
  onClose: () => void;
  onSubmit: (dto: SpendingGoalRequestDTO, id?: number) => void;
}

export default function CreateOrEditSpendingGoalModal({
  open,
  initialSpendingGoal,
  onClose,
  onSubmit,
}: CreateOrEditSpendingGoalModalProps) {
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
            {initialSpendingGoal
              ? "Editar Meta de Gasto"
              : "Criar Meta de Gasto"}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Box paddingTop={2}>
          <CreateOrEditSpendingGoalForm
            initialSpendingGoal={initialSpendingGoal}
            onSubmit={onSubmit}
          />
        </Box>
      </Paper>
    </Modal>
  );
}
