import { Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const SuccessMessage = () => (
  <Box sx={{ textAlign: "center", py: 4 }}>
    <CheckCircleIcon sx={{ fontSize: 64, color: "success.main", mb: 2 }} />
    <Typography variant="h4" color="success.main" gutterBottom>
      ההזמנה בוצעה בהצלחה!
    </Typography>
    <Typography variant="body1" color="text.secondary">
      תודה על הזמנתך. המשלוח בדרך אלייך
    </Typography>
  </Box>
);
