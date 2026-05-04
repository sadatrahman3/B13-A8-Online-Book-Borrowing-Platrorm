"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authClient } from "@/lib/auth-client";

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

interface SessionContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  isDemo: boolean;
}

const SessionContext = createContext<SessionContextType>({
  user: null,
  loading: true,
  logout: async () => {},
  isDemo: false,
});

export const useSession = () => useContext(SessionContext);

function getDemoUser(): User {
  if (typeof window === "undefined") return null!;
  const demoUser = localStorage.getItem("booknest_demo_user");
  if (demoUser) return JSON.parse(demoUser);
  const user = {
    id: "demo-user-1",
    name: "Demo User",
    email: "demo@example.com",
    image: undefined,
  };
  localStorage.setItem("booknest_demo_user", JSON.stringify(user));
  return user;
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        if (typeof window !== "undefined" && localStorage.getItem("booknest_demo")) {
          setUser(getDemoUser());
          setIsDemo(true);
          setLoading(false);
          return;
        }

        try {
          const { data } = await authClient.getSession();
          if (data?.user) {
            setUser({
              id: data.user.id,
              name: data.user.name,
              email: data.user.email,
              image: data.user.image ?? undefined,
            });
          }
        } catch (e) {
          console.log("BetterAuth session check failed");
        }
      } catch (error) {
        console.error("Session check failed:", error);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  const logout = async () => {
    if (isDemo) {
      localStorage.removeItem("booknest_demo");
      localStorage.removeItem("booknest_demo_user");
      setUser(null);
      setIsDemo(false);
      return;
    }
    await authClient.signOut();
    setUser(null);
  };

  return (
    <SessionContext.Provider value={{ user, loading, logout, isDemo }}>
      {children}
    </SessionContext.Provider>
  );
}
