// API Response Types
export interface Product {
  id: number;
  categoryId: number;
  productName: string;
  price: number;
}

export interface Category {
  id: number;
  categoryName: string;
  products: Product[];
}

export type CategoriesResponse = Category[];
