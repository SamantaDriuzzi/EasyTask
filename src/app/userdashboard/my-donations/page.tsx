/* eslint-disable @next/next/no-img-element */
"use client";
import SidebarUser from "@/components/SidebarUser/SidebarUser";
import React, { useState } from "react";

const MyDonations = () => {
  const [donations, setDonations] = useState<
    { id: number; user: string; date: string; amount: number }[]
  >([]);
  const [total, setTotal] = useState(0);

  const handleAddDonation = (amount: string | number) => {
    const newDonation = {
      id: donations.length + 1,
      user: "Usuario",
      date: new Date().toLocaleDateString(),
      amount: parseFloat(amount.toString()),
    };
    setDonations([...donations, newDonation]);
    setTotal(total + newDonation.amount);
  };

  return (
    <div className="min-h-screen bg-gray-200 flex">
      <SidebarUser />
      <main className="flex-1 p-20">
        <header className="flex justify-between items-center bg-[#B4B3EA] text-white p-4 rounded-md mb-4">
          <h1 className="text-xl font-semibold">Mis Donaciones</h1>
          <div className="bg-yellow-400 text-black px-4 py-2 rounded-md">
            <span>TOTAL:</span> <span className="font-bold">{total} USD</span>
          </div>
        </header>
        <section className="mt-6 bg-white p-6 rounded-md shadow-md text-center">
          {donations.length > 0 && (
            <div className="text-center mb-4">
              <span className="text-8xl">⭐</span>
              <p>Donaste...</p>
            </div>
          )}
          <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden">
            <thead className="bg-gray-300 text-gray-600">
              <tr>
                <th className="py-3 px-4 text-left">Fecha</th>
                <th className="py-3 px-4 text-left">Importe</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation, index) => (
                <tr key={index} className="border-t">
                  <td className="py-3 px-4">{donation.date}</td>
                  <td className="py-3 px-4">{donation.amount} USD</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <div className="mt-4 text-center">
          <button
            onClick={() => handleAddDonation(2)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Añadir donación de 2 USD
          </button>
        </div>
      </main>
    </div>
  );
};

export default MyDonations;
