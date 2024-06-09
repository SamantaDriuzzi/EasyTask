import { JoinTeam, TeamCrate } from "@/utils/types/interface-team";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const postCreateTeam = async (id: string, teamData: TeamCrate) => {
  try {
    const body = JSON.stringify(teamData);
    const response = await fetch(`${API_URL}/teams/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const postJoinTeam = async (info: JoinTeam) => {
  try {
    const body = JSON.stringify(info);
    const response = await fetch(`${API_URL}/teams/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
