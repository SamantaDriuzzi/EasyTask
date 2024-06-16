"use client";
import React, { useEffect, useState } from "react";
import { FaTrash, FaPlus, FaUsers } from "react-icons/fa";
import {
  getTeams,
  createTeam,
  deleteTeam,
  addCollaborator,
  removeCollaborator,
  searchUsersByName,
} from "@/helpers/api/teams";

interface User {
  user_id: string;
  name: string;
  email: string;
  profilePicture?: string;
}

interface Team {
  team_id: string;
  team_name: string;
  team_users: User[];
}

const TeamManagement = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamName, setTeamName] = useState("");
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [searchResults, setSearchResults] = useState<User[]>([]);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const allTeams = await getTeams();
      setTeams(allTeams);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  const handleAddTeam = async () => {
    if (teamName.trim()) {
      try {
        await createTeam({ team_name: teamName.trim() });
        setTeamName("");
        fetchTeams();
      } catch (error) {
        console.error("Error creating team:", error);
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTeam(id);
      fetchTeams();
    } catch (error) {
      console.error("Error deleting team:", error);
    }
  };

  const handleSearchUser = async () => {
    if (userName.trim()) {
      try {
        const users = await searchUsersByName(userName.trim());
        setSearchResults(users);
      } catch (error) {
        console.error("Error searching users:", error);
      }
    }
  };

  const handleAddCollaborator = async (userId: string) => {
    if (selectedTeamId) {
      try {
        await addCollaborator(selectedTeamId, userId);
        setUserName("");
        setSearchResults([]);
        fetchTeams();
      } catch (error) {
        console.error("Error adding member:", error);
      }
    }
  };

  const handleRemoveCollaborator = async (teamId: string, userId: string) => {
    try {
      await removeCollaborator(teamId, userId);
      fetchTeams();
    } catch (error: any) {
      console.error(`Error removing collaborator: ${error.message || error}`);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full mt-8">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <FaUsers className="mr-2" /> Equipos
      </h2>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Nombre del equipo"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={handleAddTeam}
          className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 ml-2"
        >
          <FaPlus />
        </button>
      </div>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Equipo</th>
            <th className="px-4 py-2">Colaborador</th>
            <th className="px-4 py-2">Acción</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.team_id} className="bg-gray-100">
              <td className="border px-4 py-2">{team.team_name}</td>
              <td className="border px-4 py-2">
                <ul>
                  {team.team_users.map((member) => (
                    <li key={member.user_id}>
                      {member.name} ({member.email})
                      <button
                        onClick={() =>
                          handleRemoveCollaborator(team.team_id, member.user_id)
                        }
                        className="text-red-100 hover:text-red-700 ml-2"
                      >
                        <FaTrash />
                      </button>
                    </li>
                  ))}
                </ul>
              </td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => handleDelete(team.team_id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
                <button
                  onClick={() => setSelectedTeamId(team.team_id)}
                  className="text-blue-500 hover:text-blue-700 ml-2"
                >
                  <FaPlus />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedTeamId && (
        <div className="mt-4">
          <h3 className="text-xl font-bold">Agregar colaborador al equipo</h3>
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Nombre del usuario"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="flex-grow p-2 border border-gray-300 rounded-md"
            />
            <button
              onClick={handleSearchUser}
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 ml-2"
            >
              Buscar
            </button>
          </div>
          {searchResults.length > 0 && (
            <ul>
              {searchResults.map((user) => (
                <li key={user.user_id}>
                  {user.name} ({user.email})
                  <button
                    onClick={() => handleAddCollaborator(user.user_id)}
                    className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 ml-2"
                  >
                    <FaPlus />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default TeamManagement;
