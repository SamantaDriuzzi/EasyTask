"use client";
import React, { useEffect, useState } from "react";
import { getAllDonations } from "@/helpers/donations/get";
import { IDonation } from "@/utils/types/interface-donation";

const Donations = () => {
  const [donations, setDonations] = useState<IDonation[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    const fetchDonations = async () => {
      const donationsData = await getAllDonations();
      setDonations(donationsData);
    };
    fetchDonations();
  }, []);

  useEffect(() => {
    const calculateTotalAmount = () => {
      const total = donations.reduce((acc, donation) => {
        // Convert donation.amount to number before adding to acc
        const amount =
          typeof donation.amount === "string"
            ? parseFloat(donation.amount)
            : donation.amount;
        return acc + amount;
      }, 0);
      setTotalAmount(total);
    };

    calculateTotalAmount();
  }, [donations]);

  return (
    <div className="p-6">
      <header className="flex justify-between items-center bg-[#B4B3EA] text-white p-4 rounded-md">
        <h1 className="text-xl font-semibold">Donaciones</h1>
        <div className="bg-yellow-400 text-black px-4 py-2 rounded-md">
          <span>TOTAL:</span>{" "}
          <span className="font-bold">{totalAmount.toFixed(2)} USD</span>
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
                  <td className="py-3 px-4">{donation.user.name}</td>
                  <td className="py-3 px-4">
                    {donation.user.credentials.email}
                  </td>
                  <td className="py-3 px-4">
                    {new Date(donation.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    {typeof donation.amount === "string"
                      ? parseFloat(donation.amount).toFixed(2)
                      : donation.amount.toFixed(2)}{" "}
                    USD
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-3 px-4" colSpan={4}>
                  No hay donaciones aún...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Donations;
