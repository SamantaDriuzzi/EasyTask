"use client";
import ModalNewSprint from "@/components/modals/modalNewSprint";
import { useAuth } from "@/contextLogin/AuthContext";
import { postNewSprint } from "@/helpers/sprint/post";
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Sprint, SprintData } from "../../utils/types/interface-sprint";
import { getAllSprintByTeam } from "@/helpers/sprint/get";

const initialTasks = {
  open: [],
  inProgress: [],
  testing: [],
  done: [],
};

type Task = { id: string; content: string };

const Board = () => {
  // const { teamID } = useAuth();
  const [teamID, setTeamID] = useState<string | null>(
    "39781c57-b0bc-4c74-bb90-23dd88a145e9"
  );
  const [sprints, setSprints] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [idSprint, setIdSprint] = useState<string>("");

  useEffect(() => {
    const fetchSprints = async () => {
      if (teamID) {
        try {
          const sprintData = await getAllSprintByTeam(teamID);
          console.log(
            "sprint data al hacer getAllSprintByTeam🎈🎈",
            sprintData
          );
          setSprints(sprintData.map((sprint: Sprint) => sprint.name));
          console.log("Son todos los sprint en Sprints🎢🧵", sprints);
        } catch (error) {
          console.log("error para obtener sprints", error);
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
          goal,
          status: "In progress",
        });
        console.log("Nuevo Sprint:", newSprint);
        setSprints([...sprints, newSprint.name]);
        setModalVisible(false);
      } catch (error) {
        console.error("Error creating sprint:", error);
      }
    } else {
      console.error("Team ID is not available");
    }
  };

  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<{
    open: Task[];
    inProgress: Task[];
    testing: Task[];
    done: Task[];
  }>(initialTasks);

  const handleAddTask = () => {
    if (newTask.trim()) {
      const newTaskObj: Task = {
        id: Date.now().toString(),
        content: newTask.trim(),
      };
      setTasks({
        ...tasks,
        open: [...tasks.open, newTaskObj],
      });
      setNewTask("");
    }
  };

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
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveSprint}
      />
      <div className="bg-[#B4B3EA] py-10">
        <h1 className="text-2xl font-bold text-left text-black ml-6 mt-14">
          Tablero
        </h1>
      </div>

      <div className="flex flex-row p-6">
        <div className="w-1/5 bg-white border border-gray-300 rounded-lg shadow-md p-4 mr-4">
          <h2 className="text-lg font-bold mb-4">Sprints</h2>

          <div className="mt-6">
            {sprints.map((sprint, index) => (
              <button
                key={index}
                className="py-2 px-4 mb-2 bg-[#329FA6] text-white rounded-lg cursor-pointer"
              >
                {sprint}
              </button>
            ))}
          </div>
          <button
            onClick={() => setModalVisible(true)}
            className="w-full bg-color3 hover:bg-color4 text-white font-bold py-2 px-4 rounded-lg mb-4"
          >
            AGREGAR
          </button>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.entries(tasks).map(([columnId, columnTasks]) => (
            <div
              key={columnId}
              className="w-1/5 bg-white border border-gray-300 rounded-lg shadow-md p-4 flex flex-col mx-2"
            >
              <h2 className="text-center text-lg font-bold mb-2">
                {columnId.toUpperCase().replace("_", " ")}
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
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white p-4 rounded-md shadow-md mb-4"
                          >
                            <p>{task.content}</p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    {columnId === "open" && (
                      <div className="mt-4">
                        <input
                          type="text"
                          value={newTask}
                          onChange={(e) => setNewTask(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md mb-2"
                          placeholder="Nueva tarea"
                        />
                        <button
                          onClick={handleAddTask}
                          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg"
                        >
                          + AGREGAR
                        </button>
                      </div>
                    )}
                    {columnId !== "open" && (
                      <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg">
                        + AGREGAR
                      </button>
                    )}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
};

export default Board;
