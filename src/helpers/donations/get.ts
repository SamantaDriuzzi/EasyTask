const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllDonations = async () => {
  try {
    const response = await fetch(`${API_URL}/donation`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
  
    return data.map((donation: any) => ({
      id: donation.donation_id,
      user: donation.user,
      amount: donation.amount,
      date: donation.date,
    }));
  
  } catch (error: any) {
    throw new Error(error);
  }
}
