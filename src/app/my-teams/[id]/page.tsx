"use client"
import ChatButton from "@/components/ChatButton";
"use client";
import { getMyTeams } from "@/helpers/teams/get";
import { Team } from "@/utils/types/interface-team";
import { useRouter } from "next/navigation";
import React from "react";

// eslint-disable-next-line @next/next/no-async-client-component
const MyTeams = async ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const teams = await getMyTeams(params.id);

  const handleInfoTeam = (team_id: string | null) => {
    router.push(`/info-team/${team_id}`);
  };

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
              <h3 className="text-xl font-bold mb-4  text-gray-700">
                ERES LIDER:
              </h3>
              {teams ? (
                teams.leaderTeams.map((team: Team) => (
                  <div key={team.team_id}>
                    <div className="mb-4 p-4 bg-color2 text-black rounded-md hover:scale-105 transition-transform cursor-pointer">
                      <h4 className="font-bold">Nombre: {team.team_name}</h4>
                      <p>Descripción: {team.description}</p>
                      <p>
                        Fecha de finalización:{" "}
                        {new Date(team.finish_date).toLocaleDateString()}
                      </p>
                      <button
                        onClick={() => handleInfoTeam(team.team_id)}
                        className="bg-color8 text-black px-4 py-2 rounded"
                      >
                        Ver detalles
                      </button>
                    </div>
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
              <h3 className="text-xl font-bold mb-4 text-gray-700">
                ERES COLABORADOR:
              </h3>
              {teams ? (
                teams.collaboratorTeams.map((team: Team) => (
                  <div key={team.team_id}>
                    <div className="mb-4 p-4 bg-color3 text-black rounded-md hover:scale-105 transition-transform cursor-pointer">
                      <h4 className="font-bold">Nombre: {team.team_name}</h4>
                      <p>Descripción: {team.description}</p>
                      <p>
                        Fecha de finalización:{" "}
                        {new Date(team.finish_date).toLocaleDateString()}
                      </p>
                      <button
                        onClick={() => handleInfoTeam(team.team_id)}
                        className="bg-color8 text-black px-4 py-2 rounded"
                      >
                        Ver detalles
                      </button>
                    </div>
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
