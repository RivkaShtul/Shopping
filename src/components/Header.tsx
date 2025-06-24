import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Header: React.FC = () => {
  return (
    <AppBar position="static" elevation={2}>
      <Toolbar>
        <ShoppingCartIcon sx={{ mr: 2 }} />
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: 600 }}
        >
          אפליקציית קניות
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body2" sx={{ color: "inherit", opacity: 0.8 }}>
            הוסף מוצרים לעגלה שלך
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
