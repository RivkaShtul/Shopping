import { Backdrop, CircularProgress, Container } from "@mui/material";
import { useCategories } from "../../hooks/useShoppingProducts";
import Cart from "./Cart";
import ShoppingForm from "./ShoppingForm";

export const Shopping = () => {
  const { isLoading: categoriesLoading } = useCategories();
  return (
    <>
      {categoriesLoading ? (
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <ShoppingForm />
          <Cart />
        </Container>
      )}
    </>
  );
};
