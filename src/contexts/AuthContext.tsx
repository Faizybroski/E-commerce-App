import {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  ReactNode,
} from "react";
import { loginUser, registerUser, fetchMe, setAuthToken } from "@/services/api";

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phone?: string;
  address?: Address;
  createdAt: string;
  isVerified: boolean;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message?: string }>;
  register: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role?: string;
    phone?: string;
    address?: Address;
  }) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [loading, setLoading] = useState(true);

  // Set token in axios
  useEffect(() => setAuthToken(token), [token]);

  // Fetch user info from backend
  const fetchUser = useCallback(async () => {
    if (!token) {
      setUser(null);
      setIsLoggedIn(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const res = await fetchMe();
      setUser(res.data.data);
      setIsLoggedIn(true);
    } catch (err) {
      console.error(err);
      logout();
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // -----------------------
  // Login
  // -----------------------
  const login = async (email, password) => {
    try {
      const res = await loginUser(email, password);
      const { token: newToken, user: userData } = res.data.data;
      localStorage.setItem("token", newToken);
      setToken(newToken);
      setUser(userData);
      setIsLoggedIn(true);
      return { success: true };
    } catch (err) {
      console.error(err);
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    }
  };

  // -----------------------
  // Register
  // -----------------------
  const register = async ({
    firstName,
    lastName,
    email,
    password,
    role = "buyer",
    phone,
    address,
  }) => {
    try {
      const res = await registerUser({
        firstName,
        lastName,
        email,
        password,
        role,
        phone,
        address,
      });
      const { token: newToken, user: userData } = res.data.data;
      localStorage.setItem("token", newToken);
      setToken(newToken);
      setUser(userData);
      setIsLoggedIn(true);
      return { success: true };
    } catch (err) {
      console.error(err);
      return {
        success: false,
        message: err.response?.data?.message || "Registration failed",
      };
    }
  };

  // -----------------------
  // Logout
  // -----------------------
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);
  };

  const value = useMemo(
    () => ({ isLoggedIn, token, user, loading, login, register, logout }),
    [isLoggedIn, token, user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
