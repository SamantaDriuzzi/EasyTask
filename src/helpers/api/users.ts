const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getUsers = async () => {
  const response = await fetch(`${API_URL}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const data = await response.json();
  console.log("API Response:", data);

  return data.map((user: any) => {
    console.log("User:", user);
    return {
      user_id: user.user_id ?? "No ID",
      name: user.name,
      email: user.credentials ? user.credentials.email : "Email no disponible",
      nickname: user.credentials
        ? user.credentials.nickname
        : "Apodo no disponible",
    };
  });
};

export const getUserById = async (id: string) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  const user = await response.json();
  console.log("Fetched User:", user); // Verifica la respuesta de la API para un solo usuario
  return {
    user_id: user.user_id ?? "No ID",
    name: user.name,
    email: user.credentials ? user.credentials.email : "Email no disponible",
    nickname: user.credentials
      ? user.credentials.nickname
      : "Apodo no disponible",
  };
};

export const deleteUser = async (id: string) => {
  console.log("Deleting user with ID:", id); // Confirmar el ID antes de eliminar
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete user");
  }

  return response.json();
};
