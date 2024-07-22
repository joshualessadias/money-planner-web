import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

interface CustomAppBarProps {
  isDrawerOpen: boolean;
  onSetIsDrawerOpenOpen: (open: boolean) => void;
}

export default function CustomAppBar({
  isDrawerOpen,
  onSetIsDrawerOpenOpen,
}: CustomAppBarProps) {
  return (
    <Box flexGrow={1}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton onClick={() => onSetIsDrawerOpenOpen(!isDrawerOpen)}>
            {isDrawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
          <Box
            display="flex"
            flexDirection="row"
            alignContent="center"
            flexGrow={1}
            justifyContent="center"
            gap={1}
          >
            <Image src="/favicon-white.svg" alt="logo" width={32} height={32} />
            <Typography variant="h6">Nosso Planner</Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
