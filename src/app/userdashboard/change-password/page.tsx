/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "@/components/logo";
import { useAuth } from "@/contextLogin/AuthContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setErrorMessage("Usuario no autenticado.");
    } else {
      setErrorMessage("");
    }
  }, [user]);

  const handleSavePassword = async () => {
    if (!user) {
      setErrorMessage("Usuario no autenticado.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Las nuevas contraseñas no coinciden.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/changePassword`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userSession") ?? "{}").token
          }`,
        },
        body: JSON.stringify({
          email: user.email,
          password: currentPassword,
          newPassword,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Error al cambiar la contraseña");
      }

      alert("Contraseña cambiada con éxito");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage((error as Error).message || "Error desconocido");
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <div className="bg-[#B4B3EA] p-6 rounded-lg shadow-lg w-96 relative mt-16">
        <div className="text-center mb-6">
          <Logo />
          <h3 className="text-1xl font-bold">NUEVA CONTRASEÑA</h3>
        </div>
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Ingresa contraseña actual..."
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
          >
            <img
              src={
                showPassword
                  ? "/login/OjosAbiertos.svg"
                  : "/login/OjosCerrados.svg"
              }
              alt="Hide and Show password"
              width={24}
              height={24}
            />
          </span>
        </div>
        <div className="relative mb-4">
          <input
            type={showNewPassword ? "text" : "password"}
            placeholder="Ingresa nueva contraseña..."
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
          <span
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
          >
            <img
              src={
                showNewPassword
                  ? "/login/OjosAbiertos.svg"
                  : "/login/OjosCerrados.svg"
              }
              alt="Hide and Show password"
              width={24}
              height={24}
            />
          </span>
        </div>
        <div className="relative mb-4">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirma nueva contraseña..."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
          <span
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
          >
            <img
              src={
                showConfirmPassword
                  ? "/login/OjosAbiertos.svg"
                  : "/login/OjosCerrados.svg"
              }
              alt="Hide and Show password"
              width={24}
              height={24}
            />
          </span>
        </div>
        {errorMessage && (
          <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
        )}
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
