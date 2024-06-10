"use client";

import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const initialTasks = {
  open: [{ id: "1", content: "Proyecto/software" }],
  inProgress: [],
  testing: [],
  done: [],
};

type Task = { id: string; content: string };

const Dashboard = () => {
  const [sprints, setSprints] = useState<string[]>([
    "SPRINT 1",
    "SPRINT 2",
    "SPRINT 3",
  ]);
  const [newSprint, setNewSprint] = useState<string>("");
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<{
    open: Task[];
    inProgress: Task[];
    testing: Task[];
    done: Task[];
  }>(initialTasks);

  const handleAddSprint = () => {
    if (newSprint.trim()) {
      setSprints([...sprints, newSprint.trim()]);
      setNewSprint("");
    }
  };

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
      <div className="bg-[#B4B3EA] py-10">
        <h1 className="text-2xl font-bold text-left text-black ml-6 mt-14">
          Tablero
        </h1>
      </div>

      <div className="flex flex-row p-6">
        <div className="w-1/5 bg-white border border-gray-300 rounded-lg shadow-md p-4 mr-4">
          <h2 className="text-lg font-bold mb-4">Nuevo Sprint</h2>
          <input
            type="text"
            value={newSprint}
            onChange={(e) => setNewSprint(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            placeholder="Nombre del sprint"
          />
          <button
            onClick={handleAddSprint}
            className="w-full bg-[#329FA6] hover:bg-[#267d84] text-white font-bold py-2 px-4 rounded-lg"
          >
            AGREGAR
          </button>
          <div className="mt-6">
            {sprints.map((sprint, index) => (
              <div
                key={index}
                className="py-2 px-4 mb-2 bg-[#329FA6] text-white rounded-lg cursor-pointer"
              >
                {sprint}
              </div>
            ))}
          </div>
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

export default Dashboard;
