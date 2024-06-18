import { TaskData } from "@/utils/types/interface-task";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const putTask = async (task_id: string, taskData: TaskData) => {
  try {
    const body = JSON.stringify(taskData);
    const response = await fetch(`${API_URL}/tasks/${task_id}`, {
      method: "PUT",
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
export const putAssignTask = async (task_id: string, user_id: string) => {
  try {
    const response = await fetch(
      `${API_URL}/tasks/${task_id}/assing/${user_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
