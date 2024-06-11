"use client";

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
  teamID: string | null;
  setTeamID: (id: string | null) => void;
}
const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => {},
  validateUserSession: () => null,
  userIdFromToken: () => null,
  handleSignOut: () => {},
  teamID: null,
  setTeamID: () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const { data: session, status } = useSession();
  const [teamID, setTeamID] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated" && session) {
      localStorage.setItem("user", JSON.stringify(session.user));
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
      return null;
    }

    const userSession = localStorage.getItem("userSession");

    if (!userSession) {
      return null;
    }

    try {
      const token = JSON.parse(userSession).token.token;
      if (!token) {
        return null;
      }
      const decodedToken = jwtDecode<JwtPayload>(token);
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
        teamID,
        setTeamID,
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
