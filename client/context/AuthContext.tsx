"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

// Define user type
export interface User {
  id: number;
  name: string;
  email: string;
  avatarUrl?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updatedUser: Partial<User>) => Promise<boolean>;
}

// Create a default value for the context to avoid the undefined error
const defaultAuthContext: AuthContextType = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: async () => false,
  signup: async () => false,
  logout: () => {},
  updateProfile: async () => false,
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

// Sample user data (for demo purposes)
interface MockUser extends User {
  password: string;
}

const MOCK_USERS: MockUser[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    password: "password123", // Never store passwords like this in production
    avatarUrl: "/images/avatars/avatar-1.jpg",
    address: {
      street: "123 Main St",
      city: "Mumbai",
      state: "Maharashtra",
      zipCode: "400001",
      country: "India",
    },
    phone: "+91 9876543210",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
    avatarUrl: "/images/avatars/avatar-2.jpg",
    address: {
      street: "456 Park Ave",
      city: "Delhi",
      state: "Delhi",
      zipCode: "110001",
      country: "India",
    },
    phone: "+91 9876543211",
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = !!user;

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = () => {
      setIsLoading(true);
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    // In a real app, this would be an API call
    return new Promise<boolean>((resolve) => {
      // Simulate API call delay
      setTimeout(() => {
        const foundUser = MOCK_USERS.find(
          (u) => u.email === email && u.password === password
        );

        if (foundUser) {
          // Remove password before storing user data
          const { password, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword);
          localStorage.setItem("user", JSON.stringify(userWithoutPassword));
          setIsLoading(false);
          resolve(true);
        } else {
          setIsLoading(false);
          resolve(false);
        }
      }, 1000);
    });
  };

  // Signup function
  const signup = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    setIsLoading(true);

    // In a real app, this would be an API call
    return new Promise<boolean>((resolve) => {
      // Simulate API call delay
      setTimeout(() => {
        // Check if email already exists
        const emailExists = MOCK_USERS.some((u) => u.email === email);

        if (emailExists) {
          setIsLoading(false);
          resolve(false);
        } else {
          // Create new user
          const newUser: MockUser = {
            id: MOCK_USERS.length + 1,
            name,
            email,
            password,
            avatarUrl: `/images/avatars/avatar-${MOCK_USERS.length + 1}.jpg`,
          };

          // In a real app, this would add the user to the database
          MOCK_USERS.push(newUser);

          // Set user and store in localStorage (without password)
          const { password: _, ...userWithoutPassword } = newUser;
          setUser(userWithoutPassword);
          localStorage.setItem("user", JSON.stringify(userWithoutPassword));
          setIsLoading(false);
          resolve(true);
        }
      }, 1000);
    });
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Update profile function
  const updateProfile = async (
    updatedUser: Partial<User>
  ): Promise<boolean> => {
    setIsLoading(true);

    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        if (user) {
          const updated = { ...user, ...updatedUser };
          setUser(updated);
          localStorage.setItem("user", JSON.stringify(updated));
          setIsLoading(false);
          resolve(true);
        } else {
          setIsLoading(false);
          resolve(false);
        }
      }, 1000);
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        signup,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
