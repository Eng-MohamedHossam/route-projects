import { useState, useEffect } from "react";
import { getMyProfile } from "../services/users";
import { AuthContext } from "./AuthContextValue";
import type { User } from "./AuthContextValue";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token"),
  );

  const [user, setUser] = useState<User | null>(null);

  function logout() {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
  }

  useEffect(() => {
    window.addEventListener("auth:unauthorized", logout);

    return () => {
      window.removeEventListener("auth:unauthorized", logout);
    };
  }, []);

  useEffect(() => {
    async function fetchProfile() {
      if (!isAuthenticated) {
        setUser(null);
        return;
      }

      try {
        const profile = await getMyProfile();
        setUser(profile.data.user);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    }

    void fetchProfile();
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
