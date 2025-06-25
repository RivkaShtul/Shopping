import * as yup from "yup";

const freeTextPattern =
  /^[\r\n :,?!_'"@#$%*^.()/\-+&quot;0-9A-Za-zа-яА-ЯЁёא-ת\u0600-\u06ff]*$/u;

export const checkoutSchema = yup.object({
  firstName: yup
    .string()
    .required("יש להזין שם פרטי")
    .min(2, "השם הפרטי חייב להכיל לפחות 2 תווים")
    .max(20, "השם הפרטי לא יכול להיות ארוך מ-20 תווים")
    .matches(freeTextPattern, "שם פרטי יכול להכיל רק תווים מותרים"),
  lastName: yup
    .string()
    .required("יש להזין שם משפחה")
    .min(2, "שם המשפחה חייב להכיל לפחות 2 תווים")
    .max(20, "שם המשפחה לא יכול להיות ארוך מ-20 תווים")
    .matches(freeTextPattern, "שם משפחה יכול להכיל רק תווים מותרים"),
  fullAddress: yup
    .string()
    .required("יש להזין כתובת מלאה")
    .min(5, "הכתובת חייבת להכיל לפחות 5 תווים")
    .max(50, "הכתובת לא יכולה להיות ארוכה מ-50 תווים")
    .matches(freeTextPattern, "כתובת יכולה להכיל רק תווים מותרים"),
  email: yup
    .string()
    .required("יש להזין כתובת אימייל")
    .email("כתובת האימייל אינה תקינה"),
});
