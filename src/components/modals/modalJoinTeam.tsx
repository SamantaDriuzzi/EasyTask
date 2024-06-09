"use client";
import { ModalTeam } from "@/utils/types/interface-team";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";

const ModalJoinTeam: FC<ModalTeam> = ({ isVisible, onClose, team_name }) => {
  const router = useRouter();
  const handleGoTeam = () => {
    router.push("/home");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">¡Te has unido al equipo!</h2>
        <p className="mb-4">Nombre de tu equipo: {team_name}</p>
        <div className="flex items-center mb-4">
          <button
            onClick={handleGoTeam}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Ir al equipo
          </button>
        </div>
        <button
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ModalJoinTeam;
