import {
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import React, { useState } from "react";
import { OutcomeKpiResponseDTO } from "@/entities/money-planner-api";
import currencyMask from "@/helpers/currencyMask";

interface KpiShowMoreCardProps {
  insights: OutcomeKpiResponseDTO;
}

export default function KpiShowMoreCard({ insights }: KpiShowMoreCardProps) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card sx={{ width: 70, cursor: "pointer" }} onClick={handleClickOpen}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
          }}
        >
          <MoreHorizIcon />
          <Typography sx={{ textAlign: "center" }}>{"Ver mais"}</Typography>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Todas as categorias</DialogTitle>
        <DialogContent>
          <List>
            {insights.kpiByCategoryList.map((kpi) => (
              <ListItem key={kpi.category.id}>
                <ListItemText
                  primary={
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <span>{kpi.category.name}:</span>
                      <span style={{ marginLeft: 4 }}>
                        {currencyMask(kpi.value)}
                      </span>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
}
