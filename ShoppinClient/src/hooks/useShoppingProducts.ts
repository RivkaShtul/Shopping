import { useShoppingProducts } from "../api/shoppingProducts";

export const useCategories = () => {
  const { data: categoriesData, ...rest } = useShoppingProducts();

  const categories =
    categoriesData?.map((category) => ({
      id: category.id,
      name: category.categoryName,
    })) || [];

  return {
    data: categories,
    ...rest,
  };
};

export const useProductsByCategory = (categoryId: number) => {
  const { data: categoriesData, ...rest } = useShoppingProducts();

  const categoryProducts =
    categoriesData?.find((category) => category.id === categoryId)?.products ||
    [];

  return {
    data: categoryProducts,
    ...rest,
  };
};
