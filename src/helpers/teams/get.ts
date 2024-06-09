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