"use client";
import Link from "next/link";
import { FaUsers, FaUser, FaHeart } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="bg-white w-1/4 h-screen p-4 shadow-lg mt-20">
      <ul className="space-y-4">
        <li>
          <Link href="/manager/users">
            <div className="flex items-center text-lg font-semibold text-gray-700 hover:text-gray-900">
              <FaUser className="mr-2" /> Usuarios
            </div>
          </Link>
        </li>
        <li>
          <Link href="/manager/teams">
            <div className="flex items-center text-lg font-semibold text-gray-700 hover:text-gray-900">
              <FaUsers className="mr-2" /> Equipos
            </div>
          </Link>
        </li>
        <li>
          <Link href="/manager/donations">
            <div className="flex items-center text-lg font-semibold text-gray-700 hover:text-gray-900">
              <FaHeart className="mr-2" /> Donaciones
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
