import { TaskData } from "@/utils/types/interface-task";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const postNewTask = async (
  teamID: string,
  idSprint: string,
  taskData: TaskData
) => {
  try {
    const body = JSON.stringify(taskData);
    const response = await fetch(
      `${API_URL}/tasks?idTeam=${teamID}&idSprint=${idSprint}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      }
    );
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
