import React from "react";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default AuthContext ({ children }) => {
  const [routes, setRoutes] = useState(authRoutes);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) setIsUserAuthenticated(true);
    else setIsUserAuthenticated(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setRoutes(authRoutes);
    setIsUserAuthenticated(false);
  };
  const login = (token) => {
    localStorage.setItem("token", token);
    setRoutes(defaultRoutes);
    setIsUserAuthenticated(true);
  };

  const value = {
    logout,
    login,
    routes,
    isUserAuthenticated,
  };
  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
};
