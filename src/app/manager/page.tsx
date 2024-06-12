/* eslint-disable @next/next/no-img-element */
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
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-[#d7d7f8] mb-40 w-full text-center">
        <h1 className="text-2xl font-bold mt-2">
          Bienvenido al Super Dashboard del Administrador
        </h1>
        <p className="mt-4 font-bold text-lg-center text-gray-700">
          Selecciona una opción del menú para gestionar usuarios o equipos.
        </p>
        <div className="mt-8 w-full flex justify-center">
          <img
            src="/gato.png"
            alt="Gato"
            className={`w-3/4 max-w-full h-auto ${
              animate ? "cat-animation" : ""
            }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </div>
      </div>
    </div>
  );
};

export default ManagerPage;
