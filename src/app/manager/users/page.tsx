import React from "react";
import { FaSearch, FaTrash } from "react-icons/fa";

const UserManagement = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full mt-8">
      <h2 className="text-2xl font-bold mb-4 items-center">
        Gestionar usuario
      </h2>
      <input
        type="text"
        placeholder="Buscar usuarios..."
        className="w-max-full flex-grow p-2 border border-gray-300 rounded-l-md md"
      />
      <button className="bg-blue-400 text-white p-2 rounded-r-md hover:bg-blue-600">
        <FaSearch />
      </button>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Apodo</th>
            <th className="px-4 py-2">Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-100">
            <td className="border px-4 py-2">Usuario 1</td>
            <td className="border px-4 py-2">usuario1@example.com</td>
            <td className="border px-4 py-2">usuario1</td>
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

export default UserManagement;
