import React, { useEffect, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Loader } from "@/components//Loader/Loader";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (loading) return;

    if (user && location.pathname.startsWith("/auth")) {
      navigate("/", { replace: true });
      return;
    }


  }, [user, loading, location.pathname, navigate]);

  if (loading) return <Loader text="Loading..." />;

  return <>{children}</>;
};
