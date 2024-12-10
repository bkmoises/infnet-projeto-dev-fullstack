import { useState, useEffect } from "react";

const useAuth = (): [boolean | null, () => void, () => void] => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  const login = () => setIsAuthenticated(true);
  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  return [isAuthenticated, login, logout];
};

export default useAuth;