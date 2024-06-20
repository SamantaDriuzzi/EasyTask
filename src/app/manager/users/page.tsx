"use client";
import React, { useEffect, useState } from "react";
import { FaSearch, FaTrash } from "react-icons/fa";
import { getUsers, deleteUser } from "@/helpers/api/users";
import { getUserById } from "@/helpers/users/get";
import { useAuth } from "@/contextLogin/AuthContext";

interface User {
  user_id: string;
  name: string;
  email: string;
  nickname: string;
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const { userIdFromToken } = useAuth();
  const id = userIdFromToken();
  console.log(id);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      
      const allUsers = await getUsers();
      console.log("Fetched Users:", allUsers);
      setUsers(allUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSearch = async () => {
    if (searchTerm.trim()) {
      try {
        const user = await getUserById(searchTerm.trim());
        setUsers([user]);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    } else {
      fetchUsers();
    }
  };

  const handleDelete = async (user_id: string) => {
    try {
      console.log("Trying to delete user with ID:", user_id);
      await deleteUser(user_id);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full mt-8">
      <h2 className="text-2xl font-bold mb-4">Gestionar usuario</h2>
      <div className="relative flex items-center mb-4">
        <input
          type="text"
          placeholder="Buscar usuarios..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 pl-10 border border-gray-300 rounded-md"
        />
        <FaSearch
          className="absolute left-3 text-gray-800 cursor-pointer"
          onClick={handleSearch}
        />
      </div>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Apodo</th>
            <th className="px-4 py-2">AcciÃ³n</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id} className="bg-gray-100">
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.nickname}</td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => handleDelete(user.user_id)}
                  className="text-red-300 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
