const API_URL = process.env.NEXT_PUBLIC_API_URL;

const postUserGoogle = async (user: any) => {
  try {
    const response = await fetch(`${API_URL}/users/auth0`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export default postUserGoogle;
