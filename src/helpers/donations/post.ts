const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const postNewDonation = async (customerId: string, donationAmount: number, donationDate: string, donationEmail: string) => {
  try {
    const body = JSON.stringify({ customerId, donationAmount, donationDate, donationEmail });
    const response = await fetch(
      `${API_URL}/donation`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in postNewDonation:', error);
    
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error(String(error));
    }
  }
};