"use client";

import React from "react";
import CustomDrawer from "@/components/CustomDrawer";
import { Box } from "@mui/material";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Box display="flex">
          <CustomDrawer />
          <Box flexGrow="1">{children}</Box>
        </Box>
      </body>
    </html>
  );
}
