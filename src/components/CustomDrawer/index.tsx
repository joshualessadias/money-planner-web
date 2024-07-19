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
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HandCoins,
  Target,
  User,
} from "lucide-react";
import { useState } from "react";
import { useAuthContext } from "@/contexts/auth/authContext";
import { useRouter } from "next/navigation";

export default function CustomDrawer() {
  const router = useRouter();
  const { handleLogout } = useAuthContext();

  const OPEN_DRAWER_WIDTH = 207.46;
  const CLOSED_DRAWER_WIDTH = 87.97;

  const [open, setOpen] = useState<boolean>(true);
  const [selectedTab, setSelectedTab] = useState<number>();

  const startItemList = [
    { text: "Gastos", icon: <HandCoins />, route: "/outcome" },
    { text: "Meta de Gastos", icon: <Target />, route: "/spending-goal" },
  ];

  const endItemList = [{ text: "Sair", icon: <User />, route: "/login" }];

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{ width: open ? OPEN_DRAWER_WIDTH : CLOSED_DRAWER_WIDTH }}
    >
      <div
        style={{
          display: "flex",
          padding: "1rem",
          flexFlow: "column",
          alignItems: "flex-start",
          height: "100%",
          justifyContent: "space-between",
        }}
      >
        <div>
          <IconButton
            sx={{ marginBottom: "0.5rem", minHeight: 48, paddingX: 2 }}
            onClick={() => setOpen(!open)}
          >
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
          <Divider style={{ minWidth: "100%" }} />
          <List>
            {startItemList.map(({ text, icon, route }, index) => (
              <ListItem key={text} sx={{ paddingX: 0 }}>
                <ListItemButton
                  sx={{
                    justifyContent: open ? "initial" : "center",
                    minHeight: 48,
                  }}
                  selected={selectedTab === index}
                  onClick={() => {
                    if (selectedTab !== index) {
                      setSelectedTab(index);
                      router.push(route);
                    }
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
        <div>
          <List>
            {endItemList.map(({ text, icon, route }, index) => (
              <ListItem key={text} sx={{ paddingX: 0 }}>
                <ListItemButton
                  sx={{
                    justifyContent: open ? "initial" : "center",
                    minHeight: 48,
                  }}
                  onClick={() => handleLogout()}
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
      </div>
    </Drawer>
  );
}
