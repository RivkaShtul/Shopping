import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Box,
  Divider,
  Badge,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { removeFromCart, openCheckout } from "../../store/slices/productsSlice";
import type { RootState, AppDispatch } from "../../store/store";
import type { CartItem } from "../../store/slices/productsSlice";

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cart } = useSelector((state: RootState) => state.products);
  const handleRemoveFromCart = (itemId: string) => {
    dispatch(removeFromCart(itemId));
  };

  const handleContinueOrder = () => {
    dispatch(openCheckout());
  };
  const totalItems = cart.reduce(
    (sum: number, item: CartItem) => sum + item.quantity,
    0
  );

  // Calculate total price
  const totalPrice = cart.reduce(
    (sum: number, item: CartItem) => sum + item.price * item.quantity,
    0
  );

  // Group items by category using Object.groupBy
  const groupedItems = Object.groupBy(
    cart,
    (item: CartItem) => item.category
  ) as Record<string, CartItem[]>;

  if (cart.length === 0) {
    return (
      <Card>
        <CardContent sx={{ p: 4, textAlign: "center" }}>
          <ShoppingCartIcon
            sx={{ fontSize: 64, color: "text.secondary", mb: 2 }}
          />
          <Typography variant="h6" color="text.secondary">
            העגלה שלך ריקה
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            הוסף מוצרים כדי להתחיל!
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ p: 3, pb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Badge badgeContent={totalItems} color="primary">
              <ShoppingCartIcon />
            </Badge>
            <Typography variant="h5" component="h2">
              עגלת קניות
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {totalItems} פריט{totalItems !== 1 ? "ים" : ""} ב-
            {Object.keys(groupedItems).length} קטגוריות
          </Typography>
        </Box>
        <Divider />
        <List sx={{ p: 0 }}>
          {Object.entries(groupedItems).map(([category, items]) => (
            <div key={category}>
              {/* Category Header */}
              <ListItem
                sx={{
                  py: 1,
                  px: 3,
                  backgroundColor: "grey.50",
                  direction: "rtl",
                  textAlign: "right",
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    color: "primary.main",
                    textAlign: "right",
                    direction: "rtl",
                    width: "100%",
                  }}
                >
                  {category} ({items.length} מוצרים)
                </Typography>
              </ListItem>
              <Divider /> {/* Items in this category */}
              {items.map((item: CartItem, index: number) => (
                <div key={item.id}>
                  <ListItem
                    sx={{
                      py: 2,
                      px: 3,
                      pl: 5,
                      direction: "rtl",
                      textAlign: "right",
                    }}
                  >
                    <ListItemText
                      sx={{ textAlign: "right" }}
                      primary={
                        <Typography
                          variant="h6"
                          component="span"
                          sx={{ textAlign: "right", direction: "rtl" }}
                        >
                          {item.productName}
                        </Typography>
                      }
                      secondary={
                        <Box sx={{ textAlign: "right", direction: "rtl" }}>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ textAlign: "right", direction: "rtl" }}
                          >
                            כמות: {item.quantity}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="primary.main"
                            sx={{
                              textAlign: "right",
                              direction: "rtl",
                              fontWeight: 500,
                            }}
                          >
                            מחיר יחידה: ₪{item.price.toFixed(2)}
                          </Typography>
                          <Typography
                            variant="body1"
                            color="success.main"
                            sx={{
                              textAlign: "right",
                              direction: "rtl",
                              fontWeight: 600,
                            }}
                          >
                            סה"כ: ₪{(item.price * item.quantity).toFixed(2)}
                          </Typography>
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction sx={{ right: "auto", left: 16 }}>
                      <IconButton
                        edge="start"
                        aria-label="delete"
                        onClick={() => handleRemoveFromCart(item.id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  {index < items.length - 1 && <Divider variant="inset" />}
                </div>
              ))}
              {/* Add divider between categories */}
              <Divider
                sx={{ mt: 1, mb: 1, borderWidth: 2, borderColor: "grey.300" }}
              />
            </div>
          ))}
        </List>
        {/* Total Price Section */}
        <Box sx={{ p: 3, pt: 2, backgroundColor: "grey.50" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              סה"כ כללי:
            </Typography>
            <Typography
              variant="h5"
              color="primary.main"
              sx={{ fontWeight: 700 }}
            >
              ₪{totalPrice.toFixed(2)}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "center", mb: 2 }}
          >
            {totalItems} פריטים ב-{Object.keys(groupedItems).length} קטגוריות
          </Typography>
        </Box>
        <Box sx={{ p: 3, pt: 0 }}>
          <Button
            variant="contained"
            size="large"
            fullWidth
            startIcon={<ShoppingCartCheckoutIcon />}
            onClick={handleContinueOrder}
            sx={{
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: 600,
            }}
          >
            המשך להזמנה
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Cart;
