"use client";

import React, { useState } from "react";
import CustomDrawer from "@/components/CustomDrawer";
import { Box } from "@mui/material";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [open, setOpen] = useState<boolean>(true);

  const openedDrawerWidth = 211;
  const closedDrawerWidth = 88;

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <CustomDrawer
          drawerWidth={open ? openedDrawerWidth : closedDrawerWidth}
          open={open}
          onSetOpen={setOpen}
        />
        <div
          style={{ marginLeft: open ? openedDrawerWidth : closedDrawerWidth }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
