const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllDonations = async () => {
  try {
    const response = await fetch(`${API_URL}/donation`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return data.map((donation: any) => ({
        id: donation.donation_id,
        user: donation.user,
        amount: donation.amount,
        date: donation.date,
      }));
    } else {
      throw new Error("Received non-JSON response");
    }

  } catch (error: any) {
    console.error('Error capturado:', error);
  
    if (error.response && error.response.status === 404) {
      throw new Error('Recurso no encontrado (Error 404).');
    } else if (error.message) {
      throw new Error(error.message);
    } else {
      throw new Error('Ocurrió un error desconocido.');
    }
  }
    
};
