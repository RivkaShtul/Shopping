import axios from "axios";

// Create axios instance for order API
const orderApiClient = axios.create({
  baseURL: import.meta.env.VITE_ORDER_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default orderApiClient;
