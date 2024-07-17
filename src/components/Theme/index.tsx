"use client";

import { createTheme } from "@mui/material";
import { grey, lime, red, teal } from "@mui/material/colors";

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: teal[500],
      light: teal[100],
      dark: teal[900],
    },
    secondary: {
      main: lime[500],
      light: lime[100],
      dark: lime[900],
    },
    background: {
      default: teal[500],
      paper: "#ffffff",
      // dark: "#1d1e18"
    },
    warning: {
      main: red[400],
    },
    info: {
      main: grey[600],
    },
  },
  components: {
    MuiCard: {
      defaultProps: {
        elevation: 4,
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 8,
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: teal[500],
      light: teal[100],
      dark: teal[900],
    },
    secondary: {
      main: lime[500],
      light: lime[100],
      dark: lime[900],
    },
    info: {
      main: grey[600],
    },
  },
  components: {
    MuiCard: {
      defaultProps: {
        elevation: 1,
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 1,
      },
    },
  },
});
