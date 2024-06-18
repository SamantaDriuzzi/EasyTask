import { IDonation } from "@/utils/types/interface-donation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const postNewDonation = async (
    customerId: string, donationAmount: number, donationDate: string
) => {
  try {
    const body = JSON.stringify({customerId, donationAmount, donationDate});
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
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};