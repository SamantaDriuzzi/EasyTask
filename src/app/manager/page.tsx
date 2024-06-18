"use client";

import React from "react";
import { FaTrash, FaPlus } from "react-icons/fa";

const ManagerPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-[#B4B3EA] py-10 mt-10">
        <h1 className="text-2xl font-bold text-center text-black">
          Super Dashboard del Administrador
        </h1>
      </div>

      <div className="container mx-auto p-6">
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-bold mb-4">Gestionar Equipos</h2>
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Nombre del equipo"
              className="flex-grow p-2 border border-gray-300 rounded-l-md"
            />
            <button className="bg-green-500 text-white p-2 rounded-r-md hover:bg-green-600">
              <FaPlus />
            </button>
          </div>
          <ul className="space-y-2">
            <li className="flex justify-between items-center bg-gray-200 p-2 rounded-md">
              <span>Equipo 1</span>
              <button className="text-red-500 hover:text-red-700">
                <FaTrash />
              </button>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-bold mb-4">Gestionar Usuarios</h2>
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Nombre del usuario"
              className="flex-grow p-2 border border-gray-300 rounded-l-md"
            />
            <input
              type="email"
              placeholder="Correo del usuario"
              className="flex-grow p-2 border border-gray-300"
            />
            <button className="bg-green-500 text-white p-2 rounded-r-md hover:bg-green-600">
              <FaPlus />
            </button>
          </div>
          <ul className="space-y-2">
            <li className="flex justify-between items-center bg-gray-200 p-2 rounded-md">
              <span>Usuario 1</span>
              <button className="text-red-500 hover:text-red-700">
                <FaTrash />
              </button>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-bold mb-4">Gestionar Tareas</h2>
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Nombre de la tarea"
              className="flex-grow p-2 border border-gray-300 rounded-l-md"
            />
            <button className="bg-green-500 text-white p-2 rounded-r-md hover:bg-green-600">
              <FaPlus />
            </button>
          </div>
          <ul className="space-y-2">
            <li className="flex justify-between items-center bg-gray-200 p-2 rounded-md">
              <span>Tarea 1</span>
              <button className="text-red-500 hover:text-red-700">
                <FaTrash />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ManagerPage;
