import React, { createContext, useState, useContext, useEffect } from 'react';

const AdminAuthContext = createContext();

export const useAdminAuth = () => useContext(AdminAuthContext);

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken');
    const savedAdmin = localStorage.getItem('adminUser');
    if (savedToken && savedAdmin) {
      setToken(savedToken);
      setAdmin(JSON.parse(savedAdmin));
    }
    setLoading(false);
  }, []);

  const login = (newToken, adminData) => {
    localStorage.setItem('adminToken', newToken);
    localStorage.setItem('adminUser', JSON.stringify(adminData));
    setToken(newToken);
    setAdmin(adminData);
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setToken(null);
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider value={{ admin, token, loading, login, logout, isAuthenticated: !!token }}>
      {children}
    </AdminAuthContext.Provider>
  );
};