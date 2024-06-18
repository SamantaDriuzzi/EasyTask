const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllSprintByTeam = async (teamID: string) => {
  try {
    const response = await fetch(`${API_URL}/sprint/team/${teamID}`, {
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
