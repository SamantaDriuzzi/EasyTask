"use client";

import { postNewSprint } from "@/helpers/sprint/post";
import React, { useEffect, useState } from "react";
import { getAllSprintByTeam } from "@/helpers/sprint/get";
import { getTasksById, getTasksBySprint } from "@/helpers/task/get";
import { Task, TaskData } from "@/utils/types/interface-task";
import ModalNewTask from "@/components/modals/modalNewTask";
import ModalNewSprint from "@/components/modals/modalNewSprint";
import { postNewTask } from "@/helpers/task/post";
import { putTask } from "@/helpers/task/put";
import { Sprint } from "@/utils/types/interface-sprint";
import { getTeamById } from "@/helpers/teams/get";
import { Team } from "@/utils/types/interface-team";
import { deleteTaskById } from "@/helpers/task/delete";

const initialTasks: {
  open: Task[];
  inProgress: Task[];
  testing: Task[];
  done: Task[];
} = {
  open: [],
  inProgress: [],
  testing: [],
  done: [],
};

const Board = ({ params }: { params: { idTeam: string } }) => {
  const [teamID, setTeamID] = useState<string | null>(null);
  useEffect(() => {
    setTeamID(params.idTeam);
  }, [params.idTeam]);
  const [team, setTeam] = useState<Team>();
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [idSprint, setIdSprint] = useState<string | null>(
    sprints[0]?.sprint_id || null
  );
  const [modalSprintVisible, setModalSprintVisible] = useState<boolean>(false);
  const [modalTaskVisible, setModalTaskVisible] = useState<{
    isOpen: boolean;
    selectedTask: Task | null;
  }>({ isOpen: false, selectedTask: null });
  const [selectedSprint, setSelectedSprint] = useState<string | null>(null);
  const [tasks, setTasks] = useState<{
    open: Task[];
    inProgress: Task[];
    testing: Task[];
    done: Task[];
  }>(initialTasks);

  useEffect(() => {
    if (teamID) {
      const fetchTeamInfo = async () => {
        try {
          const teamInfo = await getTeamById(teamID);
          setTeam(teamInfo);
        } catch (error) {
          console.error("Error fetching team info:", error);
        }
      };

      fetchTeamInfo();
    }
  }, [teamID]);

  useEffect(() => {
    const fetchSprints = async () => {
      if (teamID) {
        try {
          const sprintData = await getAllSprintByTeam(teamID);
          console.log(sprintData);
          if (Array.isArray(sprintData)) {
            setSprints(sprintData);
            if (sprintData.length > 0) {
              handleSprintClick(sprintData[0].sprint_id);
            }
          }
        } catch (error) {
          console.log("Error fetching sprints:", error);
        }
      }
    };
    fetchSprints();
  }, [teamID]);

  const handleSaveSprint = async (name: string, goal: string) => {
    if (teamID) {
      try {
        const newSprint = await postNewSprint(teamID, {
          name,
          goal: goal?.length ? goal : null,
          status: "inProgress",
        });
        setSprints([...sprints, newSprint]);
        setModalSprintVisible(false);
      } catch (error) {
        console.error("Error creating sprint:", error);
      }
    } else {
      console.error("Team ID is not available");
    }
  };

  const handleSprintClick = async (sprintId: string) => {
    setIdSprint(sprintId);

    try {
      const tasksData = await getTasksBySprint(sprintId);
      const organizedTasks = {
        open: tasksData.filter((task: Task) => task.status === "open"),
        inProgress: tasksData.filter(
          (task: Task) => task.status === "inProgress"
        ),
        testing: tasksData.filter((task: Task) => task.status === "testing"),
        done: tasksData.filter((task: Task) => task.status === "done"),
      };
      setTasks(organizedTasks);
      setSelectedSprint(sprintId);
    } catch (error) {
      console.error("Error fetching tasks for sprint:", sprintId, error);
    }
  };

  const createOrUpdateTask = (task: TaskData, taskId: string | null) => {
    if (taskId) {
      handleUpdateTask(taskId, task);
    } else {
      handleAddTask(task);
    }
  };

  const handleAddTask = async (task: TaskData) => {
    if (idSprint && teamID) {
      try {
        const newTask = await postNewTask(teamID, idSprint, task);
        const updatedTasks = {
          open: [...tasks.open],
          inProgress: [...tasks.inProgress],
          testing: [...tasks.testing],
          done: [...tasks.done],
        };

        if (newTask.status === "open") {
          updatedTasks.open.push(newTask);
        } else if (newTask.status === "inProgress") {
          updatedTasks.inProgress.push(newTask);
        } else if (newTask.status === "testing") {
          updatedTasks.testing.push(newTask);
        } else if (newTask.status === "done") {
          updatedTasks.done.push(newTask);
        }

        setTasks(updatedTasks);
        setModalTaskVisible({ isOpen: false, selectedTask: null });
      } catch (error) {
        console.error("Error creating task:", error);
      }
    } else {
      console.error("ID Sprint or Team ID is not available");
      setModalTaskVisible({ isOpen: false, selectedTask: null });
    }
  };

  const handleUpdateTask = async (task_id: string, task: TaskData) => {
    try {
      const updateTask = await putTask(task_id, task);

      const updatedArrayTasks = {
        open: tasks.open.filter((task) => task.task_id !== task_id),
        inProgress: tasks.inProgress.filter((task) => task.task_id !== task_id),
        testing: tasks.testing.filter((task) => task.task_id !== task_id),
        done: tasks.done.filter((task) => task.task_id !== task_id),
      };

      const updatedTask = await getTasksById(updateTask.task_id);

      if (updatedTask.status === "open") {
        updatedArrayTasks.open.push(updatedTask);
      } else if (updatedTask.status === "inProgress") {
        updatedArrayTasks.inProgress.push(updatedTask);
      } else if (updatedTask.status === "testing") {
        updatedArrayTasks.testing.push(updatedTask);
      } else if (updatedTask.status === "done") {
        updatedArrayTasks.done.push(updatedTask);
      }

      setTasks(updatedArrayTasks);
      setModalTaskVisible({ isOpen: false, selectedTask: null });
    } catch (error) {
      console.error("Error updating task:", error);
      setModalTaskVisible({ isOpen: false, selectedTask: null });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <ModalNewSprint
        isVisible={modalSprintVisible}
        onClose={() => setModalSprintVisible(false)}
        onSave={handleSaveSprint}
      />
      <ModalNewTask
        isVisible={modalTaskVisible}
        idTeam={params.idTeam}
        onClose={() =>
          setModalTaskVisible({ isOpen: false, selectedTask: null })
        }
        onSave={createOrUpdateTask}
      />

      <div className="bg-[#B4B3EA] py-8">
        <h1 className="text-2xl font-bold text-left text-black ml-6 mt-14">
          Tablero equipo: {team && team.team_name}
        </h1>
        <h3 className="font-semibold text-left text-black ml-6">
          Lider del equipo: {team && team.team_leader.name}
        </h3>
      </div>

      <div className="flex flex-row p-6 ">
        <div className="w-1/5 bg-white  bg-opacity-50 border border-gray-300 rounded-lg shadow-md p-4 mr-4">
          <h2 className="text-lg font-bold mb-4">Sprints</h2>
          <div className="mt-6 flex flex-col">
            {sprints.length > 0
              ? sprints.map((sprint) => (
                  <button
                    key={sprint.sprint_id}
                    onClick={() => handleSprintClick(sprint.sprint_id)}
                    className={`py-2 px-4 mb-2 rounded-lg cursor-pointer text-black ${
                      selectedSprint === sprint.sprint_id
                        ? "bg-color10"
                        : "bg-gray-300"
                    }`}
                  >
                    {sprint.name}
                  </button>
                ))
              : null}
          </div>
          <button
            onClick={() => setModalSprintVisible(true)}
            className="w-full mt-6 bg-color7 hover:bg-color1 text-black font-bold py-2 px-4 rounded-lg mb-4"
          >
            AGREGAR
          </button>
        </div>

        <div className="flex flex-row w-full justify-evenly">
          {tasks &&
            Object.entries(tasks).map(([columnId, columnTasks]) => (
              <div
                key={columnId}
                className="w-1/5 bg-color10 border border-gray-300 rounded-lg shadow-md p-4 flex flex-col"
              >
                <h2 className="text-center text-lg font-bold mb-2">
                  {columnId === "open"
                    ? "POR HACER"
                    : columnId === "inProgress"
                    ? "EN PROGRESO"
                    : columnId === "testing"
                    ? "EN PRUEBAS"
                    : "TERMINADO"}
                </h2>
                <div className="h-96 border border-gray-300 rounded-lg p-2 flex flex-col justify-start">
                  {columnTasks.map((task) => (
                    <div
                      key={task.task_id}
                      className="bg-white p-4 rounded-md shadow-md mb-4 cursor-pointer"
                      onClick={() =>
                        setModalTaskVisible({
                          isOpen: true,
                          selectedTask: task,
                        })
                      }
                    >
                      <p>{task.name}</p>
                    </div>
                  ))}
                  {columnId === "open" && (
                    <div className="mt-4">
                      <button
                        onClick={() =>
                          setModalTaskVisible({
                            isOpen: true,
                            selectedTask: null,
                          })
                        }
                        disabled={!selectedSprint}
                        className={`w-full ${
                          selectedSprint
                            ? "bg-gray-200 hover:bg-gray-300"
                            : "bg-gray-400 cursor-not-allowed"
                        } text-gray-700 font-bold py-2 px-4 rounded-lg`}
                      >
                        + AGREGAR
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Board;
