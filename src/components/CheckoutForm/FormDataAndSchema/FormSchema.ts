import * as yup from "yup";

export const checkoutSchema = yup.object({
  firstName: yup
    .string()
    .required("יש להזין שם פרטי")
    .min(2, "השם הפרטי חייב להכיל לפחות 2 תווים"),
  lastName: yup
    .string()
    .required("יש להזין שם משפחה")
    .min(2, "שם המשפחה חייב להכיל לפחות 2 תווים"),
  fullAddress: yup.string().required("יש להזין כתובת מלאה"),
  email: yup
    .string()
    .required("יש להזין כתובת אימייל")
    .email("כתובת האימייל אינה תקינה"),
});
