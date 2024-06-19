"use client";
import React, { useState } from "react";

const ManagerPage = () => {
  const [animate, setAnimate] = useState(false);

  const handleMouseEnter = () => {
    setAnimate(true);
  };

  const handleMouseLeave = () => {
    setAnimate(false);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen">
      <div className="bg-[#B4B3EA] w-full text-center py-14 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mt-2">
          Bienvenido al Súper Dashboard del Administrador
        </h1>
        <p className="mt-4 font-bold text-lg text-gray-700">
          Selecciona una opción del menú para gestionar usuarios o equipos.
        </p>
        <div className="mt-4 w-full max-w-3xl flex justify-center">
          <img
            src="/admin/dashboardAdmin.svg"
            alt="Gato"
            className={`w-1/2 h-auto ${animate ? "cat-animation" : ""}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </div>
      </div>
    </div>
  );
};

export default ManagerPage;