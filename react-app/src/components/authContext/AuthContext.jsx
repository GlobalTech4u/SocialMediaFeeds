import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setToken(user?.token);
    setIsLoggedIn(!!user?.token);
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, loading, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
