"use client";
import React, { useState } from "react";
import Link from "next/link";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSavePassword = () => {
    // Lógica para cambiar la contraseña
    console.log("Contraseña actual:", currentPassword);
    console.log("Nueva contraseña:", newPassword);
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <div className="bg-[#B4B3EA] p-8 rounded-lg shadow-lg w-96">
        <div className="text-center mb-6">
          <svg
            className="w-16 h-16 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.232 7.757l1.768 1.768M12 4.928a4.928 4.928 0 110 9.857 4.928 4.928 0 010-9.857zm0 0v2.571m0 5.714h-.001m0 0H8.571m3.429 0V21"
            ></path>
          </svg>
          <h2 className="text-2xl font-bold">NUEVA CONTRASEÑA</h2>
        </div>
        <input
          type="password"
          placeholder="Ingresa contraseña actual..."
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md"
        />
        <input
          type="password"
          placeholder="Ingresa nueva contraseña..."
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md"
        />
        <button
          onClick={handleSavePassword}
          className="w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600"
        >
          Guardar
        </button>
        <div className="mt-4 text-center">
          <Link href="/userdashboard">
            <div className="text-blue-500 hover:underline">
              Volver a Mi Cuenta
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
