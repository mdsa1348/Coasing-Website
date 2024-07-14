import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setIsAuthenticated(true);
    }
  }, []);

  const setAuthToken = (token) => {
    localStorage.setItem('userInfo', JSON.stringify({ token }));
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
