"use client";
import dynamic from "next/dynamic";
import React, { FC, useCallback, useEffect, useState } from "react";
import { Task, TaskData } from "@/utils/types/interface-task";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { getCollaboratorsByTeamId } from "@/helpers/teams/get";
import { Collaborator } from "@/utils/types/interface-user";

interface ModalNewTaskProps {
  isVisible: { isOpen: boolean; selectedTask: Task | null };
  onClose: () => void;
  onSave: (task: TaskData, taskId: string | null) => void;
  idTeam: string;
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
  idTeam,
}) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [status, setStatus] = useState("open");
  const [priority, setPriority] = useState<number>(1);
  const [story_points, setStoryPoints] = useState<number>(1);
  const [collaboratorList, setCollaboratorList] = useState<Collaborator[]>([]);
  const [userOwner, setUserOwner] = useState<string>(
    isVisible?.selectedTask?.user_owner
      ? isVisible.selectedTask.user_owner.user_id
      : ""
  );
  const { selectedTask } = isVisible;

  useEffect(() => {
    const fetchCollaborators = async () => {
      if (!collaboratorList.length) {
        const collaborators = await getCollaboratorsByTeamId(idTeam);
        if (Array.isArray(collaborators)) {
          setCollaboratorList(collaborators);
        }
      }
    };
    fetchCollaborators();
  }, [idTeam, collaboratorList]);

  const handleTaskToEdit = useCallback(async () => {
    if (selectedTask?.task_id) {
      setTaskName(selectedTask.name);
      setTaskDescription(selectedTask.description);
      setStatus(selectedTask.status);
      setPriority(selectedTask.priority);
      setStoryPoints(selectedTask.story_points);
    }
  }, [selectedTask]);

  useEffect(() => {
    handleTaskToEdit();
  }, [handleTaskToEdit]);

  const handleSave = () => {
    if (taskName) {
      const newTask: TaskData = {
        name: taskName,
        description: taskDescription,
        status,
        priority,
        story_points,
        user_owner: userOwner.length ? userOwner : null,
      };
      onSave(newTask, selectedTask?.task_id || null);
    }
  };

  const setCollaboratorId = (collaboratorId: string) => {
    setUserOwner(collaboratorId);
  };

  if (!isVisible.isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-color10 p-6 rounded-lg shadow-lg max-w-3xl w-full">
        <div className="flex flex-row">
          <div className="flex flex-col w-2/3 pr-4">
            <h2 className="text-xl font-bold mb-4">Crear nueva tarea</h2>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4 bg-transparent placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nombre de la tarea"
            />
            <ReactQuill
              value={taskDescription}
              onChange={setTaskDescription}
              className="mb-4 bg-transparent"
              placeholder="Descripción de la tarea"
            />
          </div>
          <div className="flex flex-col w-1/3 space-y-4">
            <div className="flex flex-col">
              <label className="block mb-2 font-semibold" htmlFor="status">
                Estado:
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md bg-transparent placeholder-gray-500 focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.entries(statusOptions).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="priority" className="block mb-2 font-semibold">
                Prioridad:
              </label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-md bg-transparent placeholder-gray-500 focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="story_points"
                className="block mb-2 font-semibold"
              >
                Puntuación:
              </label>
              <select
                id="story_points"
                value={story_points}
                onChange={(e) => setStoryPoints(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-md bg-transparent placeholder-gray-500 focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              <label
                htmlFor="collaborators"
                className="block mb-2 font-semibold"
              >
                Asignado:
              </label>
              <select
                id="collaborators"
                onChange={(event) => setCollaboratorId(event.target.value)}
                className="bg-color5 text-gray-100 hover:text-white hover:underline transition duration-300"
                defaultValue={userOwner}
              >
                <option value="">Sin asignar</option>
                {collaboratorList.map((collaborator: Collaborator) => (
                  <option
                    key={collaborator.user_id}
                    value={collaborator.user_id}
                    selected={collaborator.user_id === userOwner}
                  >
                    {collaborator.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded w-1/4 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700"
          >
            Cerrar
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded w-1/2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalNewTask;
