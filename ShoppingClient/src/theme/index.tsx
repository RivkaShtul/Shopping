import {
  autocompleteClasses,
  createTheme,
  outlinedInputClasses,
} from "@mui/material";

export const theme = createTheme({
  direction: "rtl",
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily:
      '"Roboto", "Helvetica", "Arial", "Noto Sans Hebrew", sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
        },
        startIcon: {
          marginRight: 0,
          marginLeft: 0,
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          display: "flex",
          width: "min(370px, 100%)",
          [`& .${[outlinedInputClasses.root]}`]: {
            [`& .${autocompleteClasses.input}`]: {
              padding: "16.5px 14px",
            },
          },
        },
        inputRoot: {
          paddingRight: "0px !important",
          padding: 0,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          paddingRight: "16px !important",
        },
      },
    },
  },
});
