import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Grid,
  CircularProgress,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import { ControlledInput } from "../Inputs/CustomInput";
import { closeCheckout, clearCart } from "../../store/slices/productsSlice";
import type { RootState, AppDispatch } from "../../store/store";
import {
  CheckoutFormData,
  defaultCheckoutFormData,
} from "./FormDataAndSchema/FormData";
import { checkoutSchema } from "./FormDataAndSchema/FormSchema";
import { useOrder } from "../../api/order";
import { OrderSummary } from "./OrderSummary";

const CheckoutForm = () => {
  const { mutate: mutateOrder, isPending } = useOrder();
  const dispatch = useDispatch<AppDispatch>();
  const { isCheckoutOpen, cart } = useSelector(
    (state: RootState) => state.products
  );
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);
  const methods = useForm<CheckoutFormData>({
    resolver: yupResolver(checkoutSchema),
    defaultValues: defaultCheckoutFormData,
  });
  const { handleSubmit, reset } = methods;

  const handleClose = () => {
    if (!isPending) {
      dispatch(closeCheckout());
      reset();
    }
  };

  const onSubmit = async (data: CheckoutFormData) => {
    mutateOrder(
      {
        customerInfo: data,
        items: cart,
      },
      {
        onSuccess: () => {
          // Success handling
          setOrderSuccess(true);
          dispatch(clearCart());
          reset();
        },
        onError: (error: any) => {
          console.error("Error submitting order:", error);
        },
      }
    );
  };

  return (
    <>
      <Dialog
        open={isCheckoutOpen}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        dir="rtl"
      >
        <DialogTitle
          sx={{ display: "flex", alignItems: "center", gap: 2, pb: 2 }}
        >
          <ShoppingCartIcon />
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            סיכום הזמנה
          </Typography>
          <Button
            onClick={handleClose}
            // disabled={orderMutation.isPending}
            sx={{ minWidth: "auto", p: 1 }}
          >
            <CloseIcon />
          </Button>
        </DialogTitle>

        <DialogContent>
          {orderSuccess ? (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <CheckCircleIcon
                sx={{ fontSize: 64, color: "success.main", mb: 2 }}
              />
              <Typography variant="h4" color="success.main" gutterBottom>
                ההזמנה נשלחה בהצלחה!
              </Typography>
              <Typography variant="body1" color="text.secondary">
                תודה על הזמנתך. נעדכן אותך בקרוב על סטטוס ההזמנה.
              </Typography>
            </Box>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Customer Information Section */}
              <FormProvider {...methods}>
                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                      פרטי לקוח
                    </Typography>

                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <ControlledInput
                          name="firstName"
                          label="שם פרטי"
                          placeholder="הכנס שם פרטי"
                          required
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <ControlledInput
                          name="lastName"
                          label="שם משפחה"
                          placeholder="הכנס שם משפחה"
                          required
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <ControlledInput
                          name="fullAddress"
                          label="כתובת מלאה"
                          placeholder="רחוב, מספר בית, עיר, מיקוד"
                          required
                          multiline
                          rows={2}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <ControlledInput
                          name="email"
                          label="כתובת אימייל"
                          placeholder="example@email.com"
                          type="email"
                          required
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
                <OrderSummary />
              </FormProvider>
            </form>
          )}
        </DialogContent>

        {!orderSuccess && (
          <DialogActions sx={{ p: 3, pt: 2 }}>
            <Button
              onClick={handleClose}
              disabled={isPending}
              variant="outlined"
              sx={{ ml: 2 }}
            >
              ביטול
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
              disabled={isPending || cart.length === 0}
              variant="contained"
              startIcon={
                isPending ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <CheckCircleIcon />
                )
              }
              sx={{ minWidth: 140 }}
            >
              {isPending ? "שולח..." : "אישור הזמנה"}
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </>
  );
};

export default CheckoutForm;
