import { Box, Grid, Typography } from "@mui/material";

interface PriceDisplayProps {
  productPrice: number;
  quantity: number;
}
export const PriceDisplay = ({ productPrice, quantity }: PriceDisplayProps) => {
  return (
    <Box
      sx={{
        mt: 3,
        p: 2,
        backgroundColor: "grey.50",
        borderRadius: 1,
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={4}>
          <Typography variant="body1">
            <strong>מחיר יחידה:</strong> ₪{productPrice.toFixed(2)}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="body1">
            <strong>כמות:</strong> {quantity}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography
            variant="h6"
            color="primary.main"
            sx={{ fontWeight: "bold" }}
          >
            <strong>סה"כ:</strong> ₪{(productPrice * quantity).toFixed(2)}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
