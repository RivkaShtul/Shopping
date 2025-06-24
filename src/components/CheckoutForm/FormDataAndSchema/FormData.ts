export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  fullAddress: string;
  email: string;
}

export const defaultCheckoutFormData: CheckoutFormData = {
  firstName: "",
  lastName: "",
  fullAddress: "",
  email: "",
};
