import { SprintData } from "@/utils/types/interface-sprint";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const postNewSprint = async (
  id: string,
  { name, goal, status }: SprintData
) => {
  try {
    const response = await fetch(`${API_URL}/sprint?idTeam=${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, goal, status }),
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
