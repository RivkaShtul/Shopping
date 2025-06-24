import orderApiClient from "./orderAxios";
import type { CheckoutFormData } from "../components/CheckoutForm/FormData";
import type { CartItem } from "../store/slices/productsSlice";
import { useMutation } from "@tanstack/react-query";

// Order submission interfaces
export interface OrderSubmissionData {
  customerInfo: CheckoutFormData;
  items: CartItem[];
}

const orderApi = {
  // Submit order to the server
  submitOrder: async (orderData: OrderSubmissionData): Promise<any> => {
    const response = await orderApiClient.post("/orders", orderData);
    return response.data;
  },
};

export const useOrder = () => {
  return useMutation({
    mutationFn: orderApi.submitOrder,
  });
};
