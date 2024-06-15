"use client";
import React, { FC, useState } from "react";
import { TaskData, Task } from "@/utils/types/interface-task";

interface ModalNewTaskProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (task: TaskData) => void;
}

const statusOptions = {
  open: "Abierto",
  inProgress: "En Progreso",
  testing: "En Pruebas",
  done: "Terminado",
};

const ModalNewTask: FC<ModalNewTaskProps> = ({
  isVisible,
  onClose,
  onSave,
}) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [status, setStatus] = useState("Open");
  const [priority, setPriority] = useState<number>(1);
  const [storyPoints, setStoryPoints] = useState<number>(1);

  const handleSave = () => {
    if (taskName) {
      const newTask: TaskData = {
        name: taskName,
        description: taskDescription,
        status,
        priority,
        story_points: storyPoints,
      };
      onSave(newTask);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Crear nueva tarea</h2>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          placeholder="Nombre de la tarea"
        />
        <input
          type="text"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          placeholder="Descripción de la tarea"
        />
        <label className="block mb-2" htmlFor="status">
          Estado:
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        >
          {Object.entries(statusOptions).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
        <label htmlFor="priority">Prioridad:</label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        <label htmlFor="storyPoints">Puntuación:</label>
        <select
          id="storyPoints"
          value={storyPoints}
          onChange={(e) => setStoryPoints(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>

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

export default ModalNewTask;
