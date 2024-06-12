import React from "react";
import { FaTrash, FaPlus, FaUsers } from "react-icons/fa";

const TeamManagement = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full mt-8">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <FaUsers className="mr-2" /> Equipos
      </h2>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Nombre del equipo"
          className="flex-grow p-2 border border-gray-300 rounded-md"
        />
        <button className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 ml-2">
          <FaPlus />
        </button>
      </div>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Equipo</th>
            <th className="px-4 py-2">Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-100">
            <td className="border px-4 py-2">Equipo 1</td>
            <td className="border px-4 py-2 text-center">
              <button className="text-red-500 hover:text-red-700">
                <FaTrash />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TeamManagement;
