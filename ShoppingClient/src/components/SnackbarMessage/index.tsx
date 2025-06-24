import {
  Alert,
  AlertColor,
  AlertPropsColorOverrides,
  Snackbar,
} from "@mui/material";
import { OverridableStringUnion } from "@mui/types";

interface SnackbarMessageProps {
  isOpen: boolean;
  onClose: () => void;
  severity: OverridableStringUnion<AlertColor, AlertPropsColorOverrides>;
  message: string;
}
export const SnackbarMessage = ({
  isOpen,
  onClose,
  severity,
  message,
}: SnackbarMessageProps) => (
  <Snackbar
    open={isOpen}
    autoHideDuration={3000}
    onClose={onClose}
    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
  >
    <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
      {message}
    </Alert>
  </Snackbar>
);
