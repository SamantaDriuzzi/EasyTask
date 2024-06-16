const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getTeams = async () => {
  const response = await fetch(`${API_URL}/teams`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  return data.map((team: any) => ({
    team_id: team.team_id,
    team_name: team.team_name,
    team_users: team.team_users || [],
  }));
};

export const createTeam = async (teamData: { team_name: string }) => {
  const response = await fetch(`${API_URL}/teams`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(teamData),
  });

  if (!response.ok) {
    throw new Error("Failed to create team");
  }

  return response.json();
};

export const deleteTeam = async (id: string) => {
  const response = await fetch(`${API_URL}/teams/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete team");
  }

  return response.json();
};

export const addCollaborator = async (teamId: string, userId: string) => {
  const response = await fetch(`${API_URL}/teams/${teamId}/users/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to add member");
  }

  return response.json();
};

export const removeCollaborator = async (teamId: string, userId: string) => {
  const response = await fetch(`${API_URL}/teams/${teamId}/users/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to remove member: ${errorText}`);
  }

  return response.json();
};

export const searchUsersByName = async (name: string) => {
  const response = await fetch(`${API_URL}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const users = await response.json();
  return users.filter((user: any) =>
    user.name.toLowerCase().includes(name.toLowerCase())
  );
};
