const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getTeamLeaderById = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/teams/${id}/leader`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getTeamById = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/teams/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getMyTeams = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/teams/${id}/teams`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getCollaboratorsByTeamId = async (team_id: string) => {
  try {
    const response = await fetch(`${API_URL}/teams/users/${team_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data.team_users;
  } catch (error: any) {
    throw new Error(error);
  }
};
