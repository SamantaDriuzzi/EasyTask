/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const Newsletter = ({ onClose }: { onClose: () => void }) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const response = await fetch(`${API_URL}/suscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, firstName, lastName }),
    });

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Subscripción exitosa!",
      });
      onClose();
    } else {
      Swal.fire({
        icon: "error",
        title: "Subscripción fallida",
      });
    }
  };

  return (
    <div className="newsletter-container bg-[#B4B3EA] p-12 shadow-lg">
      <div className="">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500"
        >
          <FaTimes size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4 color-change">
          ¡Suscribete a nuestro Newletter!
        </h2>
        <p className="mb-4">
          Recibe las ultimas noticias y actalizaciones en tu correo electronico
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="nickname"
              className="block text-sm font-medium text-gray-700"
            >
              Nick name
            </label>
            <input
              type="text"
              id="nickname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#329FA6] hover:bg-[#267d84] text-white font-bold py-2 px-4 rounded-lg"
          >
            SUSCRIBIRSE
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
