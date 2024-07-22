"use client";

import React, { useState } from "react";
import { Toolbar, useMediaQuery, useTheme } from "@mui/material";
import CustomAppBar from "@/components/CustomAppBar";
import CustomDrawer from "@/components/CustomDrawer";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const theme = useTheme();
  const shouldShowPermanentDrawer = useMediaQuery(theme.breakpoints.up("md"));
  const [open, setOpen] = useState<boolean>(false);

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
        {!shouldShowPermanentDrawer && (
          <>
            <CustomAppBar isDrawerOpen={open} onSetIsDrawerOpenOpen={setOpen} />
            <Toolbar />
          </>
        )}
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
