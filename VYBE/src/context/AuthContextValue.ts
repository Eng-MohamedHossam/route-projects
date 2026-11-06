import { createContext } from "react";

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  photo: string;
  cover: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
