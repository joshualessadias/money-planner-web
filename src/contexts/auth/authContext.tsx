"use client";

import useAuth from "@/hooks/useAuth";
import { createContext, useContext } from "react";

const AuthContext = createContext<any>(null);

const AuthProvider = ({ children }: any) => {
  const { loading, user, isAuth, handleLogin, handleLogout } = useAuth();

  return (
    <AuthContext.Provider
      value={{ loading, user, isAuth, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

export const useAuthContext = () => {
  return useContext(AuthContext);
};
