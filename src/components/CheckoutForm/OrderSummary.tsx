import { CartItem } from "@/store/slices/productsSlice";
import { RootState } from "@/store/store";
import {
  Box,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";

export const OrderSummary = () => {
  const { cart } = useSelector((state: RootState) => state.products);
  const groupedItems = Object.groupBy(
    cart,
    (item: CartItem) => item.category
  ) as Record<string, CartItem[]>;

  const totalItems = cart.reduce(
    (sum: number, item: CartItem) => sum + item.quantity,
    0
  );

  // Calculate total price
  const totalPrice = cart.reduce(
    (sum: number, item: CartItem) => sum + item.price * item.quantity,
    0
  );
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          סיכום מוצרים ({totalItems} פריטים ב-
          {Object.keys(groupedItems).length} קטגוריות)
        </Typography>
        <List sx={{ p: 0 }}>
          {Object.entries(groupedItems).map(([category, items]) => (
            <div key={category}>
              {/* Category Header */}
              <ListItem
                sx={{
                  px: 0,
                  py: 1,
                  backgroundColor: "grey.50",
                  borderRadius: 1,
                  mb: 1,
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
              {/* Items in this category */}
              {items.map((item: CartItem, index: number) => (
                <div key={item.id}>
                  <ListItem
                    sx={{
                      px: 0,
                      py: 1,
                      pl: 2,
                      direction: "rtl",
                      textAlign: "right",
                    }}
                  >
                    <ListItemText
                      sx={{ textAlign: "right" }}
                      primary={
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 500,
                            textAlign: "right",
                            direction: "rtl",
                          }}
                        >
                          {item.productName}
                        </Typography>
                      }
                      secondary={
                        <Box
                          sx={{
                            textAlign: "right",
                            direction: "rtl",
                          }}
                        >
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              textAlign: "right",
                              direction: "rtl",
                            }}
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
                  </ListItem>
                  {index < items.length - 1 && <Divider variant="inset" />}
                </div>
              ))}
              {/* Add spacing between categories */}
              <Box sx={{ mb: 2 }} />
            </div>
          ))}
        </List>
        {/* Total Price Section */}
        <Box
          sx={{
            p: 2,
            backgroundColor: "grey.50",
            borderRadius: 1,
            mt: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                textAlign: "right",
                direction: "rtl",
              }}
            >
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
            sx={{ textAlign: "center", mt: 1 }}
          >
            {totalItems} פריטים ב-{Object.keys(groupedItems).length}
            קטגוריות
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
