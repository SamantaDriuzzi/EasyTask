"use client";
import React, { useState } from "react";

const Donations = () => {
  interface Donation {
    user: string;
    email: string;
    date: string;
    amount: number;
  }

  const [donations, setDonations] = useState<Donation[]>([]);
  const [total, setTotal] = useState(0);

  return (
    <div className="p-6">
      <header className="flex justify-between items-center bg-[#B4B3EA] text-white p-4 rounded-md">
        <h1 className="text-xl font-semibold">Donaciones</h1>
        <div className="bg-yellow-400 text-black px-4 py-2 rounded-md">
          <span>TOTAL:</span> <span className="font-bold">{total} USD</span>
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
            {donations.map((donation, index) => (
              <tr key={index} className="border-t">
                <td className="py-3 px-4">
                  {donation.user} <span className="text-yellow-500">★</span>
                </td>
                <td className="py-3 px-4">{donation.email}</td>
                <td className="py-3 px-4">{donation.date}</td>
                <td className="py-3 px-4">{donation.amount} USD</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Donations;
