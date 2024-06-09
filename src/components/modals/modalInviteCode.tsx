"use client";
import { ModalProps } from "@/utils/types/interface-team";
import React, { FC, useState } from "react";

const ModalInviteCode: FC<ModalProps> = ({
  isVisible,
  onClose,
  inviteCode,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isVisible) return null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteCode);
    setCopied(true);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Invitación al equipo</h2>
        <p className="mb-4">
          Usa el siguiente código para invitar a tu equipo:
        </p>
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={inviteCode}
            readOnly
            className="border rounded p-2 flex-1 mr-2"
          />
          <button
            onClick={copyToClipboard}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {copied ? "Copiado ✅" : "Copiar"}
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

export default ModalInviteCode;
