import React from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { Auth } from "@/components/auth/LoginSignup";

const AuthPage = () => {
  return (
    <AuthProvider>
      <Auth />
    </AuthProvider>
  );
};

export default AuthPage;
