"use client";

import React, { useState } from "react";
import CustomDrawer from "@/components/CustomDrawer";
import { AppBar, useMediaQuery, useTheme } from "@mui/material";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const theme = useTheme();
  // const shouldShowPermanentDrawer = useMediaQuery(theme.breakpoints.up("md"));
  const shouldShowPermanentDrawer = true;
  const [open, setOpen] = useState<boolean>(true);

  const openedDrawerWidth = 211;
  const closedDrawerWidth = 88;

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <CustomDrawer
          open={open}
          onSetOpen={setOpen}
          shouldShowPermanentDrawer={shouldShowPermanentDrawer}
        />
        <AppBar position="static"></AppBar>
        <div
          style={{
            marginLeft: shouldShowPermanentDrawer
              ? open
                ? openedDrawerWidth
                : closedDrawerWidth
              : 0,
          }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
