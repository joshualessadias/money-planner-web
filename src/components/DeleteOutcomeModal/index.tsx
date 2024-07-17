import { OutcomeResponseDTO } from "@/entities/money-planner-api";
import {
  Button,
  IconButton,
  Modal,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { formatDescription } from "@/helpers/descriptionMask";
import formatDate from "@/helpers/dateMask";

interface DeleteOutcomeModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (id: number) => void;
  initialOutcome: OutcomeResponseDTO;
}

export default function DeleteOutcomeModal({
  initialOutcome,
  open,
  onClose,
  onSubmit,
}: DeleteOutcomeModalProps) {
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
        <Stack justifyContent="space-between" direction="column" gap={2}>
          <Stack
            justifyContent="space-between"
            direction="row"
            alignItems="center"
          >
            <Typography variant="h5">Deletar um Gasto</Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Stack gap={1}>
            <Typography variant="body1">
              Tem certeza que quer deletar o gasto{" "}
              {formatDescription(initialOutcome.description)}
              {initialOutcome.childrenInstallmentsAmount > 0
                ? ` e suas ${initialOutcome.childrenInstallmentsAmount} parcelas`
                : ""}
              ?
            </Typography>
            <Typography variant="body1">
              Data: {formatDate(initialOutcome.date)}
            </Typography>
            <Typography variant="body1">
              Esta ação não pode ser desfeita.
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="end" gap={1}>
            <Button variant="outlined" color="info" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => onSubmit(initialOutcome.id)}
            >
              Confirmar
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Modal>
  );
}
