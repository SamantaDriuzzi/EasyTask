"use client"
import { getAllDonations } from "@/helpers/donations/get";
import { IDonation } from "@/utils/types/interface-donation";
import { useEffect, useState } from "react";

const TotalButton = () => {
    const [donations, setDonations] = useState<IDonation[]>([]);
    const [totalAmount, setTotalAmount] = useState<number | null>(null);
  
    useEffect(() => {
      const fetchDonations = async () => {
        const donationsData = await getAllDonations();
        setDonations(donationsData);
      };
      console.log(getAllDonations)
      fetchDonations();
    }, []);
  
  
    useEffect(() => {
      const calculateTotalAmount = () => {
        const total = donations.reduce((acc, donation) => acc + donation.amount, 0);
        setTotalAmount(total);
      };
  
      calculateTotalAmount();
    }, [donations]);
    return (
        <div className="bg-yellow-400 text-black px-4 py-2 rounded-md">
          <span>TOTAL:</span> <span className="font-bold">{totalAmount} USD</span>
        </div>
    )
}
export default TotalButton;