import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Grid,
  IconButton,
  Snackbar,
  Alert,
  styled,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  ControlledSelect,
  ControlledInput,
  ControlledAutoComplete,
} from "../../Inputs";
import { addToCart } from "../../../store/slices/productsSlice";
import type { AppDispatch } from "../../../store/store";
import {
  useCategories,
  useProductsByCategory,
} from "../../../hooks/useShoppingProducts";
import { shoppingSchema } from "./FormDataAndSchema/FormSchema";
import { defaultValues, ShoppingFormData } from "./FormDataAndSchema/FormData";
import { PriceDisplay } from "./PriceDisplay";
import { SnackbarMessage } from "../../SnackbarMessage";

const ShoppingForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

  // React Query hooks
  const { data: categories } = useCategories();

  const methods = useForm<ShoppingFormData>({
    resolver: yupResolver(shoppingSchema),
    defaultValues: defaultValues,
  });
  const { handleSubmit, reset, watch, setValue } = methods;
  const quantity = watch("quantity");
  const selectedCategory = watch("selectedCategory");

  // Get products for selected category
  const selectedCategoryId = categories.find(
    (cat) => cat.id.toString() === selectedCategory
  )?.id;
  const selectedCategoryName = categories.find(
    (cat) => cat.id.toString() === selectedCategory
  )?.name;
  const { data: categoryProducts } = useProductsByCategory(
    selectedCategoryId || 0
  );

  // Find selected product to get price
  const selectedProduct = categoryProducts.find(
    (product) => product.productName === watch("productName")
  );
  const productPrice = selectedProduct?.price || 0;

  const onSubmit = (data: ShoppingFormData) => {
    dispatch(
      addToCart({
        category: selectedCategoryName ?? "",
        productName: data.productName,
        quantity: data.quantity,
        price: productPrice,
      })
    );

    // Reset form
    reset();
    setSnackbarOpen(true);
  };
  // Transform categories for CustomSelect
  const categoryOptions = categories.map((category) => ({
    value: category.id.toString(),
    label: category.name,
  }));

  const productOptions =
    categoryProducts?.map((product) => ({
      id: product.productName,
      label: product.productName,
      searchKeys: [product.productName], // Allow searching by product name
    })) || [];

  return (
    <>
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ mb: 3, textAlign: "center" }}
          >
            הוסף מוצרים לעגלה
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormProvider {...methods}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <ControlledSelect
                    name="selectedCategory"
                    label="קטגוריית מוצר"
                    options={categoryOptions}
                    placeholder="בחר קטגוריה"
                    required
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <ControlledAutoComplete
                    name="productName"
                    label="שם המוצר"
                    options={productOptions}
                    noOptionsText={
                      selectedCategory
                        ? "אין מוצרים זמינים בקטגוריה זו"
                        : "בחר קטגוריה תחילה"
                    }
                    disable={!selectedCategory}
                    required
                  />
                </Grid>
                <Grid item md={3} alignSelf="end">
                  <QuantityWrapper>
                    <IconButton
                      onClick={() =>
                        setValue("quantity", Math.max(1, quantity - 1))
                      }
                      disabled={quantity <= 1}
                      size="small"
                      sx={{ border: "1px solid #ddd" }}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <ControlledInput
                      name="quantity"
                      type="number"
                      inputProps={{
                        min: 1,
                        max: 999,
                        style: { textAlign: "center" },
                      }}
                      sx={{ width: 80 }}
                      size="medium"
                    />
                    <IconButton
                      onClick={() =>
                        setValue("quantity", Math.min(999, quantity + 1))
                      }
                      disabled={quantity >= 999}
                      size="small"
                      sx={{ border: "1px solid #ddd" }}
                    >
                      <AddIcon />
                    </IconButton>
                  </QuantityWrapper>
                </Grid>
              </Grid>

              {/* Price Display */}
              {selectedProduct && (
                <PriceDisplay
                  productPrice={selectedProduct.price}
                  quantity={quantity}
                />
              )}

              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  startIcon={<AddShoppingCartIcon />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: "1.1rem",
                    minWidth: 200,
                  }}
                >
                  {"הוסף לעגלה"}
                </Button>
              </Box>
            </FormProvider>
          </form>
        </CardContent>
      </Card>

      <SnackbarMessage
        isOpen={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        severity="success"
        message="המוצר נוסף לעגלה בהצלחה!"
      />
    </>
  );
};

export default ShoppingForm;

const QuantityWrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 3,
  justifyContent: "center",
  width: "168px",
});
