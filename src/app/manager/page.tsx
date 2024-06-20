"use client";

import React from "react";
import { FaTrash, FaPlus } from "react-icons/fa";
import { useEffect } from "react";
import { useAuth } from "@/contextLogin/AuthContext";
import { useRouter } from "next/navigation";
import { getUserById } from "@/helpers/users/get";
import { User } from "@/utils/types/interface-user";
import Swal from "sweetalert2";

const ManagerPage = () => {
  const router = useRouter();
  const { validateUserSession, userIdFromToken } = useAuth();

  useEffect(() => {
    const validateSessionAndAdminStatus = async () => {
      const userSession = validateUserSession();
      if (!userSession) {
        router.push("/login");
        return;
      }

      const id = userIdFromToken();
      if (id) {
        try {
          const userAdmin: User = await getUserById(id);
          if (userAdmin.is_admin === false) {
            Swal.fire({
              icon: "error",
              title: "No eres administrador",
            });
            router.push("/");
          }
        } catch (error) {
          console.error("Error al obtener el usuario:", error);
        }
      }
    };

    validateSessionAndAdminStatus();
  }, [userIdFromToken, validateUserSession, router]);

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
