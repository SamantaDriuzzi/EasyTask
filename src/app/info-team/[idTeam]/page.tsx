"use client";
import ModalInviteCode from "@/components/modals/modalInviteCode";
import { useAuth } from "@/contextLogin/AuthContext";
import { getTeamById } from "@/helpers/teams/get";
import { Team } from "@/utils/types/interface-team";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const InfoTeam = ({ params }: { params: { idTeam: string } }) => {
  const router = useRouter();
  const { validateUserSession } = useAuth();
  useEffect(() => {
    const userSession = validateUserSession();
    if (!userSession) {
      router.push("/login");
    }
  }, [validateUserSession, router]);
  useEffect(() => {
    const fetchTeamInfo = async () => {
      try {
        const teamInfo = await getTeamById(params.idTeam);
        setTeam(teamInfo);
      } catch (error) {
        console.error("Error fetching team info:", error);
      }
    };

    fetchTeamInfo();
  }, [params.idTeam]);

  const [team, setTeam] = useState<Team | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [inviteCode, setInviteCode] = useState<string>(
    team?.invitation_code || ""
  );
  useEffect(() => {
    setInviteCode(team?.invitation_code || "");
  }, [team?.invitation_code]);
  const [invitation, setInvitation] = useState<boolean>(false);
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleBoard = (team_id: string | null) => {
    router.push(`/board/${team_id}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="bg-[#B4B3EA] py-10">
        <h2 className="text-2xl font-bold text-left text-black ml-6 mt-14">
          Información
        </h2>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow py-8">
        <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6 w-full max-w-6xl">
          {team ? (
            <>
              <div className="flex justify-between mb-6">
                <h3 className="text-xl font-semibold">
                  NOMBRE DEL EQUIPO: {team.team_name}
                </h3>
                <div className="text-right">
                  <p>
                    CREACIÓN: {new Date(team.created_date).toLocaleString()}
                  </p>
                  <p>
                    FINALIZACIÓN: {new Date(team.finish_date).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="mb-8">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  DESCRIPCIÓN:
                </label>
                <div className="bg-notebook-lines p-2 border border-gray-300 rounded-md mt-3 resize-none text-center mx-auto w-10/12">
                  <p className="mb-3">{team.description}</p>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">MIEMBROS:</h4>
                <div className="flex items-center space-x-8">
                  <div className="flex flex-col items-center">
                    <span className="text-sm">Líder</span>
                    <div className="bg-[#329FA6] w-24 h-24 rounded-full flex items-center justify-center text-white font-semibold">
                      <span>{team.team_leader.name}</span>
                    </div>
                    <span className="mt-2">{team.team_leader.name}</span>
                  </div>
                  {team.team_users.map((user, index) => (
                    <div
                      key={user.user_id}
                      className="flex flex-col items-center"
                    >
                      <span className="text-sm">Colaborador {index + 1}</span>
                      <div className="bg-[#AF87EA] w-24 h-24 rounded-full flex items-center justify-center text-white font-semibold">
                        <span>{user.name}</span>
                      </div>
                      <span className="mt-2">{user.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <p>Cargando información del equipo...</p>
          )}
          <div className="flex justify-center mt-8 gap-16">
            <button
              onClick={() => handleBoard(params.idTeam)}
              className="bg-[#329FA6] hover:bg-[#267d84] text-white font-bold py-3 px-6 rounded-lg"
            >
              TABLERO
            </button>
            <button
              onClick={openModal}
              className="bg-[#329FA6] hover:bg-[#267d84] text-white font-bold py-3 px-6 rounded-lg"
            >
              INVITAR
            </button>
          </div>
          <ModalInviteCode
            isVisible={isModalVisible}
            onClose={closeModal}
            inviteCode={inviteCode}
          />
        </div>
      </div>
    </div>
  );
};

export default InfoTeam;
