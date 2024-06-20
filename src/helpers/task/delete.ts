const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const deleteTaskById = async (task_id: string) => {
  try {
    const response = await fetch(`${API_URL}/task/${task_id}`, {
      method: "DELETE",
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