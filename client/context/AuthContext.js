"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "@/lib/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user data exists in local storage
    const userData = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (userData && storedToken) {
      setUser(JSON.parse(userData));
      setToken(storedToken);
    }

    setLoading(false);
  }, []);

  const login = async (identifier, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await loginUser(identifier, password);

      setUser(response.user);
      setToken(response.jwt);

      // Save to local storage
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("token", response.jwt);

      return response;
    } catch (err) {
      setError(err.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await registerUser(userData);

      setUser(response.user);
      setToken(response.jwt);

      // Save to local storage
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("token", response.jwt);

      return response;
    } catch (err) {
      setError(err.message || "Registration failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        login,
        register,
        logout,
        updateUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
