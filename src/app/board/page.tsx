"use client";

import { useAuth } from "@/contextLogin/AuthContext";
import { postNewSprint } from "@/helpers/sprint/post";
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Sprint, SprintData } from "../../utils/types/interface-sprint";
import { getAllSprintByTeam } from "@/helpers/sprint/get";
import { getTasksBySprint } from "@/helpers/task/get";
import { Task, TaskData } from "@/utils/types/interface-task";
import ModalNewTask from "@/components/modals/modalNewTask";
import ModalNewSprint from "@/components/modals/modalNewSprint";
import { postNewTask } from "@/helpers/task/post";

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

const Board = () => {
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsBrowser(true);
    }
  }, []);

  const [teamID, setTeamID] = useState<string | null>(
    "86c4aef1-c387-4273-90df-91fd77731021"
  );

  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [idSprint, setIdSprint] = useState<string | null>(null);
  const [modalSprintVisible, setModalSprintVisible] = useState<boolean>(false);
  const [modalTaskVisible, setModalTaskVisible] = useState<boolean>(false);
  const [selectedSprint, setSelectedSprint] = useState<string | null>(null);
  const [tasks, setTasks] = useState<{
    open: Task[];
    inProgress: Task[];
    testing: Task[];
    done: Task[];
  }>(initialTasks);
  const [newTask, setNewTask] = useState<string>("");

  // ------------ TRAER TODOS LOS SPRINT DEL EQUIPO ---------------------
  useEffect(() => {
    const fetchSprints = async () => {
      if (teamID) {
        try {
          const sprintData = await getAllSprintByTeam(teamID);
          setSprints(sprintData);
        } catch (error) {
          console.log("error para obtener sprints", error);
        }
      }
    };
    fetchSprints();
  }, [teamID]);
  //----------------- CREAR SPRINT -----------------------------------------------------
  const handleSaveSprint = async (name: string, goal: string) => {
    if (teamID) {
      try {
        const newSprint = await postNewSprint(teamID, {
          name,
          goal,
          status: "In progress",
        });
        setSprints([...sprints, newSprint]);
        setModalSprintVisible(false);
        console.log(newSprint);
      } catch (error) {
        console.error("Error creating sprint:", error);
      }
    } else {
      console.error("Team ID is not available");
    }
  };
  //-------------CLICK EN UN SPRINT---------------------------
  const handleSprintClick = async (sprintId: string) => {
    try {
      setIdSprint(sprintId);
      const tasksData = await getTasksBySprint(sprintId);
      const organizedTasks = {
        open: tasksData.filter((task: Task) => task.status === "open"),
        inProgress: tasksData.filter(
          (task: Task) => task.status === "inprogress"
        ),
        testing: tasksData.filter((task: Task) => task.status === "testing"),
        done: tasksData.filter((task: Task) => task.status === "done"),
      };
      setTasks(organizedTasks);
      setSelectedSprint(sprintId);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  //------- AGREGAR TAREA -------------------------------------
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

        // Colocar la nueva tarea en la columna correspondiente
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
      } catch (error) {
        console.error("Error creating task:", error);
      }
    } else {
      console.error("ID Sprint | Team ID is not available");
    }
  };
  //---------- CLICK EN TAREA ----------------------------------------

  const handleTaskClick = async (sprintId: string) => {
    try {
      setIdSprint(sprintId);
      const tasksData = await getTasksBySprint(sprintId);
      const organizedTasks = {
        open: tasksData.filter((task: Task) => task.status === "open"),
        inProgress: tasksData.filter(
          (task: Task) => task.status === "inprogress"
        ),
        testing: tasksData.filter((task: Task) => task.status === "testing"),
        done: tasksData.filter((task: Task) => task.status === "done"),
      };
      setTasks(organizedTasks);
      setSelectedSprint(sprintId);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  //------------------------------------------------------------------
  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const column = tasks[source.droppableId as keyof typeof tasks];
      const [removed] = column.splice(source.index, 1);
      column.splice(destination.index, 0, removed);
      setTasks({
        ...tasks,
        [source.droppableId as keyof typeof tasks]: column,
      });
    } else {
      const sourceColumn = tasks[source.droppableId as keyof typeof tasks];
      const destinationColumn =
        tasks[destination.droppableId as keyof typeof tasks];
      const [removed] = sourceColumn.splice(source.index, 1);
      destinationColumn.splice(destination.index, 0, removed);
      setTasks({
        ...tasks,
        [source.droppableId as keyof typeof tasks]: sourceColumn,
        [destination.droppableId as keyof typeof tasks]: destinationColumn,
      });
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
        onClose={() => setModalTaskVisible(false)}
        onSave={handleAddTask}
      />
      <div className="bg-[#B4B3EA] py-10">
        <h1 className="text-2xl font-bold text-left text-black ml-6 mt-14">
          Tablero
        </h1>
      </div>

      <div className="flex flex-row p-6">
        <div className="w-1/5 bg-white border border-gray-300 rounded-lg shadow-md p-4 mr-4">
          <h2 className="text-lg font-bold mb-4">Sprints</h2>
          <div className="mt-6 flex flex-col">
            {sprints.length > 0
              ? sprints.map((sprint) => (
                  <button
                    key={sprint.sprint_id}
                    onClick={() => handleSprintClick(sprint.sprint_id)}
                    className={`py-2 px-4 mb-2 rounded-lg cursor-pointer text-white ${
                      selectedSprint === sprint.sprint_id
                        ? "bg-blue-500"
                        : "bg-[#329FA6]"
                    }`}
                  >
                    {sprint.name}
                  </button>
                ))
              : null}
          </div>
          <button
            onClick={() => setModalSprintVisible(true)}
            className="w-full bg-color3 hover:bg-color4 text-black font-bold py-2 px-4 rounded-lg mb-4"
          >
            AGREGAR
          </button>
        </div>
        {isBrowser ? (
          <DragDropContext onDragEnd={onDragEnd}>
            {tasks &&
              Object.entries(tasks).map(([columnId, columnTasks]) => (
                <div
                  key={columnId}
                  className="w-1/5 bg-white border border-gray-300 rounded-lg shadow-md p-4 flex flex-col mx-2"
                >
                  <h2 className="text-center text-lg font-bold mb-2">
                    {columnId.toUpperCase()}
                  </h2>
                  <Droppable droppableId={columnId}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="h-96 border border-gray-300 rounded-lg p-2 flex flex-col justify-between"
                      >
                        {columnTasks.map((task, index) => (
                          <Draggable
                            key={task.task_id}
                            draggableId={task.task_id}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="bg-white p-4 rounded-md shadow-md mb-4"
                              >
                                <p>{task.name}</p>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                        {columnId === "open" && (
                          <div className="mt-4">
                            <button
                              onClick={() => setModalTaskVisible(true)}
                              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg"
                            >
                              + AGREGAR
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </Droppable>
                </div>
              ))}
          </DragDropContext>
        ) : null}
      </div>
    </div>
  );
};

export default Board;
