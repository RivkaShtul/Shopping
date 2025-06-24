import * as yup from "yup";

export const shoppingSchema = yup.object({
  selectedCategory: yup.string().required("יש לבחור קטגוריה"),
  productName: yup
    .string()
    .required("יש להזין שם מוצר")
    .min(2, "שם המוצר חייב להכיל לפחות 2 תווים"),
  quantity: yup
    .number()
    .min(1, "הכמות חייבת להיות לפחות 1")
    .max(999, "הכמות לא יכולה לעלות על 999")
    .required("יש להזין כמות"),
});
