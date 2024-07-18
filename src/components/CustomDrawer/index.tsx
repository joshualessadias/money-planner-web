import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Target, HandCoins } from "lucide-react";
import { useState } from "react";

export default function CustomDrawer() {
  const [open, setOpen] = useState<boolean>(true);

  const drawerItemList = [
    { text: "Gastos", icon: <HandCoins /> },
    { text: "Meta de gastos", icon: <Target /> },
  ];

  return (
    <Drawer variant="permanent" open={open}>
      <div
        style={{
          display: "flex",
          padding: "1rem",
          flexFlow: "column",
          alignItems: "flex-start",
        }}
      >
        <IconButton
          sx={{ marginBottom: "0.5rem", minHeight: 48, paddingX: 2 }}
          onClick={() => setOpen(!open)}
        >
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
        <Divider style={{ minWidth: "100%" }} />
        <List>
          {drawerItemList.map(({ text, icon }, index) => (
            <ListItem key={text} sx={{ paddingX: 0 }}>
              <ListItemButton
                sx={{
                  justifyContent: open ? "initial" : "center",
                  minHeight: 48,
                }}
              >
                <ListItemIcon
                  sx={{ alignItems: "center", gap: 1, minWidth: 0 }}
                >
                  {icon}
                  {open && <ListItemText primary={text} />}
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
}
