import React, { createContext, useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister, logout as apiLogout } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté (par exemple, en vérifiant le localStorage)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username, password) => {
    const user = await apiLogin(username, password);
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const register = async (fullName, username, password) => {
    const user = await apiRegister(fullName, username, password);
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = async () => {
    await apiLogout();
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};