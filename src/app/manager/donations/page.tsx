"use client";
import React, { useEffect, useState } from "react";
import UserNameWithStar from "@/components/starUser";
import { useDonors } from "@/contextDonators";
import { useAuth } from "@/contextLogin/AuthContext";
import { getAllDonations } from "@/helpers/donations/get";
import { IDonation } from "@/utils/types/interface-donation";

const Donations = () => {
  const [donations, setDonations] = useState<IDonation[]>([]);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const { user: authUser } = useAuth();
  const { donors } = useDonors();

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

  const isDonor = donors.some(donor => donor.credentials.email === authUser.email);

  return (
    <div className="p-6">
      <header className="flex justify-between items-center bg-[#B4B3EA] text-white p-4 rounded-md">
        <h1 className="text-xl font-semibold">Donaciones</h1>
        <div className="bg-yellow-400 text-black px-4 py-2 rounded-md">
          <span>TOTAL:</span> <span className="font-bold">{totalAmount} USD</span>
        </div>
      </header>
      <section className="mt-6">
        <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden">
          <thead className="bg-gray-300 text-gray-600">
            <tr>
              <th className="py-3 px-4 text-left">Usuario</th>
              <th className="py-3 px-4 text-left">Mail</th>
              <th className="py-3 px-4 text-left">Fecha</th>
              <th className="py-3 px-4 text-left">Importe</th>
            </tr>
          </thead>
          <tbody>
            {donations.length > 0 ? (
              donations.map((donation: IDonation) => (
                <tr key={donation.donation_id}>
                  <td className="py-3 px-4">
                    <UserNameWithStar name={authUser.name} isDonor={isDonor} />
                  </td>
                  <td className="py-3 px-4">
                    {donation.user.credentials.email}
                  </td>
                  <td className="py-3 px-4">
                    {new Date(donation.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    {donation.amount} USD
                  </td>
                </tr>
              ))
            ) : (
              <div className="py-3 px-4">No hay donaciones aún...</div>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Donations;
