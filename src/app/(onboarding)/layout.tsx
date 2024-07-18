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
        <Box display="flex" flexDirection="row">
          <CustomDrawer />
          <Box marginX="auto">{children}</Box>
        </Box>
      </body>
    </html>
  );
}
