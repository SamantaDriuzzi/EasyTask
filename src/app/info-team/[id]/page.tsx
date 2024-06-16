import ChatButton from "@/components/ChatButton";
import { getTeamById } from "@/helpers/teams/get";
import { Team } from "@/utils/types/interface-team";
import { User } from "@/utils/types/interface-user";
import Image from "next/image";

const TeamDetails = async ({ params }: { params: { id: string } }) => {
  const team: Team = await getTeamById(params.id);
  const user: User = await getTeamById(params.id);

  return (
    <div className="">
      <div className="bg-[#B4B3EA] py-10">
        <h2 className="text-2xl font-bold text-left text-black ml-6 mt-14">
          Detalles del Equipo
        </h2>
      </div>
      {team ? (
        <div className="flex flex-col items-center justify-center flex-grow py-10">
          <div className="bg-white border border-gray-300 rounded-lg shadow-md p-10 w-full max-w-6xl">
            <div className="flex flex-col text-start w-[90%]">
              <div className="flex justify-between">
                <h2 className="text-xl font-bold text-left text-black ">
                  Nombre equipo/proyecto:{team.team_name}
                </h2>
                <div>
                  <h3 className="font-bold">
                    {new Date(team.finish_date).toLocaleDateString()}
                  </h3>
                  <h3 className="font-bold">
                    {new Date(team.created_date).toLocaleDateString()}
                  </h3>
                </div>
              </div>
              <h3 className="font-bold p-2 ">DESCRIPCIÓN:</h3>
              <div className="w-max-[80%]">{team.description}</div>
              <div>
                <h3 className="font-bold p-2">MIEMBROS:</h3>
                <div className="flex justify-evenly ">
                  <div className="flex flex-col justify-center items-center w-2/4">
                    <h3 className="font-bold p-2">Lider de equipo:</h3>
                    <Image
                      src={user.profilePicture}
                      alt="icono"
                      height={80}
                      width={80}
                      className="w-[80px] h-[80px] rounded-[50%]"
                    ></Image>
                    <h3 className="p-1">{team.team_leader}</h3>
                  </div>
                  <div className="flex flex-col justify-evenly flex-wrap items-center w-2/4">
                    <h3 className="font-bold p-2">
                      Colaboradores:{team.team_users}
                    </h3>
                    <Image
                      src={user.profilePicture}
                      alt="icono"
                      height={80}
                      width={80}
                      className="w-[80px] h-[80px] rounded-[50%]"
                    ></Image>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ChatButton />
        </div>
      ) : (
        <div className="mb-12 p-4 bg-white text-black rounded-md">
          <h4 className="font-bold">Aún no hay equipos por aquí</h4>
          <p></p>
        </div>
      )}
    </div>
  );
};
export default TeamDetails;
