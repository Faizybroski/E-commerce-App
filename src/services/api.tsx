import axios from "axios";

interface FetchProductsParams {
  category?: string;
  seller?: string;
  search?: string;
  featured?: boolean;
  minPrice?: number;
  maxPrice?: number;
  sort?: "price_asc" | "price_desc" | "rating" | "newest";
  page?: number;
  limit?: number;
}

// Backend base URL (from environment variable)
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/";

// Create an Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Set token dynamically
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// -----------------------
// Auth APIs
// -----------------------
export const loginUser = (email, password) =>
  api.post("/auth/login", { email, password }, { withCredentials: true });

export const registerUser = ({
  firstName,
  lastName,
  email,
  password,
  role = "buyer",
  phone,
  address,
}) =>
  api.post(
    "/auth/register",
    {
      firstName,
      lastName,
      email,
      password,
      role,
      phone,
      address,
    },
    { withCredentials: true }
  );

export const fetchMe = () => api.get("/auth/profile");

// -----------------------
// Other example APIs
// -----------------------

export const fetchProducts = async (params: FetchProductsParams = {}) => {
  try {
    const response = await api.get("/products", { params });
    // Backend returns { success: true, data: { products: [...], pagination: {...} } }
    return response.data.data; // { products, pagination }
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductById = async (id: string) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data.data; // { product: {...} }
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

export default api;
