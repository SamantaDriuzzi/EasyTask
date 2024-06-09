import { useAuth } from "@/contextLogin/AuthContext";
import { getTeamLeaderById } from "@/helpers/teams/get";
import { getUserById } from "@/helpers/users/get";
import { Team } from "@/utils/types/interface-team";
import React from "react";

const MyTeams = async ({ params }: { params: { id: string } }) => {
  const user = await getUserById(params.id);
  const teams = await getTeamLeaderById(params.id);
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
                teams.map((team: Team) => (
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
                  <h4 className="font-bold">Aún no hay equipos por aquí</h4>
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
              {user ? (
                user.teams.map((team: Team) => (
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
                  <h4 className="font-bold">Aún no hay equipos por aquí</h4>
                  <p></p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTeams;
