"use client";

import postUserGoogle from "@/helpers/users/post";
import { JwtPayload } from "@/utils/types/interface-auth";
import { jwtDecode } from "jwt-decode";
import { signOut, useSession } from "next-auth/react";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextProps {
  user: any;
  setUser: (user: any) => void;
  validateUserSession: () => boolean | null;
  userIdFromToken: () => string | null;
  handleSignOut: () => void;
}
const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => {},
  validateUserSession: () => null,
  userIdFromToken: () => null,
  handleSignOut: () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session) {
      postUserGoogle(session.user)
        .then((data) => {
          const { token } = data;
          localStorage.setItem("userSession", JSON.stringify({ token: token }));
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [status, session]);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    localStorage.removeItem("user");
    localStorage.removeItem("userSession");
    window.location.href = "/login";
  };

  const userIdFromToken = () => {
    if (typeof window === "undefined") {
      // Estamos en el servidor, no se puede usar localStorage
      return null;
    }

    const userSession = localStorage.getItem("userSession");
    console.log("userSession:-------------", userSession);
    if (!userSession) {
      return null;
    }

    try {
      const token = JSON.parse(userSession).token;
      if (!token) {
        return null;
      }
      const decodedToken = jwtDecode<JwtPayload>(token);
      console.log("id del token decodificado:-------------", decodedToken.id);
      return decodedToken.id;
    } catch (error) {
      console.error("Failed to decode token", error);
      return null;
    }
  };
  const validateUserSession = () => {
    if (typeof window !== "undefined") {
      const userSession = localStorage.getItem("userSession");
      return userSession ? true : null;
    }
    return null;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        validateUserSession,
        userIdFromToken,
        handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
