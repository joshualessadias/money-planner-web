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
  LogOut,
  Target,
} from "lucide-react";
import { useState } from "react";
import { useAuthContext } from "@/contexts/auth/authContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface CustomDrawerProps {
  open: boolean;
  onSetOpen: (open: boolean) => void;
  shouldShowPermanentDrawer: boolean;
}

export default function CustomDrawer({
  open,
  onSetOpen,
  shouldShowPermanentDrawer,
}: CustomDrawerProps) {
  const router = useRouter();
  const { handleLogout } = useAuthContext();
  const [selectedTab, setSelectedTab] = useState<number>();

  const startItemList = [
    { text: "Gastos", icon: <HandCoins />, route: "/outcome" },
    { text: "Meta de Gastos", icon: <Target />, route: "/spending-goal" },
  ];

  const endItemList = [{ text: "Sair", icon: <LogOut />, route: "/login" }];

  return (
    <Drawer
      variant={shouldShowPermanentDrawer ? "permanent" : "temporary"}
      open={open}
      onClose={() => onSetOpen(false)}
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
          {shouldShowPermanentDrawer && (
            <>
              <List>
                <ListItem sx={{ justifyContent: "center", paddingX: 0 }}>
                  <Image
                    src="/favicon-white.svg"
                    alt="logo"
                    width={32}
                    height={32}
                  />
                </ListItem>
              </List>
              <IconButton
                sx={{ marginBottom: "0.5rem", minHeight: 48, paddingX: 2 }}
                onClick={() => onSetOpen(!open)}
              >
                {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
              <Divider style={{ minWidth: "100%" }} />
            </>
          )}
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
            {endItemList.map(({ text, icon }, _) => (
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
