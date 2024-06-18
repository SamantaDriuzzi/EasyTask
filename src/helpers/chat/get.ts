const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getUserById = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
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

export const getAmiwis = async (id: string) => {
    try {
        const response = await fetch(`${API_URL}/users/friends/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          return data;
    } catch (error: any) {
        throw new Error(error)
    }
}