import api from "./axios";
import type { CategoriesResponse } from "../types/api";
import { useQuery } from "@tanstack/react-query";

const shoppingApi = {
  // Get all categories with products
  getShoppingProducts: async (): Promise<CategoriesResponse> => {
    const response = await api.get<CategoriesResponse>("/ShoppingProducts");
    return response.data;
  },
};

export const useShoppingProducts = () => {
  return useQuery({
    queryKey: ["shopping-products"],
    queryFn: shoppingApi.getShoppingProducts,
  });
};
