export interface ShoppingFormData {
  selectedCategory: string;
  productName: string;
  quantity: number;
}

export const defaultValues = {
  selectedCategory: "",
  productName: "",
  quantity: 1,
};
