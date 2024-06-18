"use client"
import ChatButton from "@/components/ChatButton";
import { getMyTeams } from "@/helpers/teams/get";
import { Team } from "@/utils/types/interface-team";
import React, { useEffect, useState } from "react";

const MyTeams = ({ params }: { params: { id: string } }) => {
  const [teams, setTeams] = useState<{ leaderTeams: Team[], collaboratorTeams: Team[] } | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const fetchedTeams = await getMyTeams(params.id);
        setTeams(fetchedTeams);
      } catch (error) {
        console.error("Error fetching teams:", error);
        setTeams({ leaderTeams: [], collaboratorTeams: [] }); // Set empty arrays or handle error state
      }
    };

    fetchTeams();
  }, [params.id]);

  return (
    <div className="">
      <div className="max-w-8xl mx-auto mt-20">
        <div className="bg-[#B4B3EA] p-3 rounded-md">
          <h2 className="text-3xl font-bold text-left mb-10 text-black">
            Mis Equipos
          </h2>
        </div>
        <div className="flex flex-wrap justify-between mt-4">
          <div className="w-full lg:w-1/2 p-2">
            <div className="bg-[#EDEDED] p-6 rounded-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-500">
                SOS LIDER
              </h3>
              {teams ? (
                teams.leaderTeams.map((team: Team) => (
                  <div
                    className="mb-4 p-4 bg-[#329FA6] text-white rounded-md"
                    key={team.team_id}
                  >
                    <h4 className="font-bold">Nombre: {team.team_name}</h4>
                    <p>Descripción: {team.description}</p>
                    <p>
                      {" "}
                      Fecha de finalización:{" "}
                      {new Date(team.finish_date).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <div className="mb-12 p-4 bg-white text-black rounded-md">
                  <h4 className="font-bold">Cargando equipos...</h4>
                  <p></p>
                </div>
              )}
            </div>
          </div>
          <div className="w-full lg:w-1/2 p-2">
            <div className="bg-[#EDEDED] p-5 rounded-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-500">
                ERES COLABORADOR
              </h3>
              {teams ? (
                teams.collaboratorTeams.map((team: Team) => (
                  <div
                    key={team.team_id}
                    className="mb-4 p-4 bg-white text-black rounded-md"
                  >
                    <h4 className="font-bold">Nombre: {team.team_name}</h4>
                    <p>Descripción: {team.description}</p>
                    <p>
                      {" "}
                      Fecha de finalización:{" "}
                      {new Date(team.finish_date).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <div className="mb-12 p-4 bg-white text-black rounded-md">
                  <h4 className="font-bold">Cargando equipos...</h4>
                  <p></p>
                </div>
              )}
            </div>
            <ChatButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTeams;
