"use client";
import React, { FC, useState } from "react";

interface ModalNewSprintProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (name: string, goal: string | null) => void;
}

const ModalNewSprint: FC<ModalNewSprintProps> = ({
  isVisible,
  onClose,
  onSave,
}) => {
  const [sprintName, setSprintName] = useState("");
  const [sprintGoal, setSprintGoal] = useState("");

  const handleSave = () => {
    if (sprintName) {
      onSave(sprintName, sprintGoal);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Crear Nuevo Sprint</h2>
        <input
          type="text"
          value={sprintName}
          onChange={(e) => setSprintName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          placeholder="Nombre del sprint"
        />
        <input
          type="text"
          value={sprintGoal}
          onChange={(e) => setSprintGoal(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          placeholder="Meta del sprint"
        />
        <div className="flex items-center justify-between">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Guardar
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalNewSprint;
