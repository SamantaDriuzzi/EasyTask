/* eslint-disable @next/next/no-img-element */
"use client";
import SidebarUser from "@/components/SidebarUser/SidebarUser";
import { useAuth } from "@/contextLogin/AuthContext";
import { IDonation } from "@/utils/types/interface-donation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const MyDonations = () => {
  const router = useRouter();
  const [myDonation, setMyDonation] = useState<IDonation[]>([]);
  const { userIdFromToken } = useAuth();
  const userId = userIdFromToken();

  useEffect(() => {
    const donationData = async () => {
      if (userId) {
        console.log("id del usuario:::::::", userId);
        try {
          const response = await fetch(`${API_URL}/donation/${userId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          setMyDonation(await response.json());
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    donationData();
  }, [userId]);

  const handleAddDonation = () => {
    router.push(`/donations`);
  };

  return (
    <div className="min-h-screen bg-gray-200 flex">
      <SidebarUser />
      <main className="flex-1 p-20">
        <header className="flex justify-between items-center bg-color8 text-white p-4 rounded-md mb-4">
          <h1 className="text-xl font-semibold">Mis Donaciones</h1>
        </header>
        <section className="mt-6 bg-white p-6 rounded-md shadow-md text-center">
          {myDonation.length > 0 ? (
            <div className="text-center mb-4">
              <span className="text-8xl">⭐</span>
              <p>Donaste...</p>
            </div>
          ) : (
            <p>No has donado aún</p>
          )}
          {myDonation.length > 0 && (
            <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden">
              <thead className="bg-gray-300 text-gray-600">
                <tr>
                  <th className="py-3 px-4 text-left">Fecha</th>
                  <th className="py-3 px-4 text-left">Importe</th>
                </tr>
              </thead>
              <tbody>
                {myDonation.map((donation, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-3 px-4">{donation.date}</td>
                    <td className="py-3 px-4">{donation.amount} USD</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
        <div className="mt-4 text-center">
          <button
            onClick={handleAddDonation}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Donar
          </button>
        </div>
      </main>
    </div>
  );
};

export default MyDonations;
