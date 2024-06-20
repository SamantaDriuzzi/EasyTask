"use client";

import React from "react";
import { FaTrash, FaPlus } from "react-icons/fa";
import { useEffect } from "react";
import { useAuth } from "@/contextLogin/AuthContext";
import { useRouter } from "next/navigation";
import { getUserById } from "@/helpers/users/get";
import { User } from "@/utils/types/interface-user";
import Swal from "sweetalert2";
import Image from "next/image";

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
          PANEL DEL ADMINISTRACIÓN
        </h1>
      </div>
      <div className="flex-1 p-10 text-center">
        <section className="bg-[#B4B3EA] p-6 rounded-md shadow-md w-full flex justify-center items-center">
          <Image
            src="/dashboard-user/dashboardAdmin1.svg"
            alt="Dashboard Admin"
            className="max-w-full h-auto"
            width={300}
            height={300}
          />
        </section>
      </div>
    </div>
  );
};

export default ManagerPage;
