"use client";

import postUserGoogle from "@/helpers/users/post";
import { getMyTeams } from "@/helpers/teams/get";
import { JwtPayload } from "@/utils/types/interface-auth";
import { Team } from "@/utils/types/interface-team";
import { jwtDecode } from "jwt-decode";
import { signOut, useSession } from "next-auth/react";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getUserById } from "@/helpers/users/get";

interface AuthContextProps {
  user: any;
  setUser: (user: any) => void;
  validateUserSession: () => boolean | null;
  userIdFromToken: () => string | null;
  handleSignOut: () => void;
  teamID: string | null;
  setTeamID: (id: string | null) => void;
  teams: Team[];
  fetchTeams: () => void;
}
const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => {},
  validateUserSession: () => null,
  userIdFromToken: () => null,
  handleSignOut: () => {},
  teamID: null,
  setTeamID: () => {},
  teams: [],
  fetchTeams: () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const { data: session, status } = useSession();
  const [teamID, setTeamID] = useState<string | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);

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

  const userIdFromToken = useCallback(() => {
    if (typeof window === "undefined") {
      return null;
    }

    const userSession = localStorage.getItem("userSession");
    if (!userSession) {
      return null;
    }

    try {
      const token = JSON.parse(userSession).token;
      if (!token) {
        return null;
      }
      const decodedToken = jwtDecode<JwtPayload>(token);
      return decodedToken.id;
    } catch (error) {
      console.error("Failed to decode token", error);
      return null;
    }
  }, []);

  const fetchUser = useCallback(async () => {
    const id = userIdFromToken();
    if (id) {
      const response = await getUserById(id);

      setUser(response);
    }
  }, [userIdFromToken]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const fetchTeams = useCallback(async () => {
    const id = userIdFromToken();
    if (id) {
      const response = await getMyTeams(id);
      const combinedTeams = [
        ...response.leaderTeams,
        ...response.collaboratorTeams,
      ];
      setTeams(combinedTeams);
    }
  }, [userIdFromToken]);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

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
        teams,
        fetchTeams,
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
