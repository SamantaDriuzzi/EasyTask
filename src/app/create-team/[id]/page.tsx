"use client";
import React, { useState, useEffect } from "react";
import { TeamCrate } from "@/utils/types/interface-team";
import { postCreateTeam } from "@/helpers/teams/post";
import Image from "next/image";
import { getUserById } from "@/helpers/users/get";
import { User } from "@/utils/types/interface-user";
import ModalInviteCode from "@/components/modals/modalInviteCode";
import Swal from "sweetalert2";
import { useAuth } from "@/contextLogin/AuthContext";
import { useRouter } from "next/navigation";
import ChatButton from "@/components/ChatButton";

const CreateTeam = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { validateUserSession } = useAuth();
  useEffect(() => {
    const userSession = validateUserSession();
    if (!userSession) {
      router.push("/login");
    }
  }, [validateUserSession, router]);

  const [userId, setUserId] = useState<string | null>("");
  const [user, setUser] = useState<User | null>(null);
  const [teamData, setTeamData] = useState<TeamCrate>({
    team_name: "",
    description: "",
    created_date: new Date(),
    finish_date: new Date(),
  });
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [inviteCode, setInviteCode] = useState<string>("");
  const [showInviteCode, setShowInviteCode] = useState(false);

  useEffect(() => {
    setUserId(params.id);
  }, [params.id]);

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getUserById(params.id);
      setUser(fetchedUser);
    };

    fetchUser();
  }, [params.id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTeamData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTeamData((prevState) => ({
      ...prevState,
      [name]: new Date(value),
    }));
  };

  const openModal = () => {
    if (showInviteCode) {
      setModalVisible(true);
    }
  };

  const closeModal = () => setModalVisible(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!userId) {
      Swal.fire({
        icon: "warning",
        title: "La identificación de usuario no está disponible",
      });
      return;
    }
    try {
      const response = await postCreateTeam(params.id, teamData);
      if (response && response.team_name && response.team_id) {
        const invitationCode = response.invitation_code;
        setInviteCode(invitationCode);
        setTeamData({
          team_name: "",
          description: "",
          created_date: new Date(),
          finish_date: new Date(),
        });
        Swal.fire({
          icon: "success",
          title: "Equipo creado correctamente"
        });
        setShowInviteCode(true);
        openModal();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al crear el equipo"
        });
      }
    } catch (error) {
      console.error("Error al crear el equipo:", error);
    }
  };

  return (
    <div>
      <div className="bg-[#B4B3EA] py-10">
        <h2 className="text-2xl font-bold text-left text-black ml-6 mt-14">
          ¡Crea un equipo!
        </h2>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow py-10">
        <div className="bg-white border border-gray-300 rounded-lg shadow-md p-10 w-full max-w-6xl">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <div className="w-24 h-24 rounded-full flex items-center justify-center text-white font-semibold">
                  <Image
                    src="/homeImg/crearEquipoHome.svg"
                    alt="Mano de gato saludando"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="ml-4">
                  <div className="block text-sm font-medium text-gray-700">
                    Al crear un equipo se te asignará como lider
                  </div>
                  <div className="mt-1 w-full p-2 border border-color7 rounded-md">
                    Lider: {user ? user.name.toLocaleUpperCase() : null}
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="team_name"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre de equipo/proyecto
              </label>
              <input
                id="team_name"
                name="team_name"
                type="text"
                value={teamData.team_name.toLocaleUpperCase()}
                onChange={handleChange}
                className="mt-1 w-1/3 p-2 border border-color7 rounded-md"
              />
            </div>
            <div className="flex justify-between mb-6">
              <div className="text-left">
                <div className="block text-lg font-medium text-gray-700">
                  CREACIÓN:{" "}
                  {teamData.created_date
                    ? teamData.created_date.toLocaleDateString()
                    : ""}
                </div>
              </div>
              <div className="text-right">
                <div className="block text-lg font-medium text-gray-700">
                  FINALIZACIÓN:
                </div>
                <input
                  id="finish_date"
                  name="finish_date"
                  type="date"
                  value={teamData.finish_date.toISOString().split("T")[0]}
                  onChange={handleDateChange}
                  className="block w-full p-2 border-gray-300 rounded-md text-lg font-medium text-gray-700"
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                DESCRIPCIÓN:
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Descripción del proyecto"
                value={teamData.description}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md mt-1 resize-none bg-notebook-lines"
                rows={4}
              />
            </div>
            <div className="flex justify-center mt-8 gap-10">
              <button
                type="submit"
                className="bg-[#329FA6] hover:bg-[#267d84] text-white font-bold py-3 px-6 rounded-lg"
              >
                CREAR EQUIPO
              </button>
              <button
                type="button"
                disabled={!showInviteCode}
                onClick={openModal}
                className="bg-[#329FA6] hover:bg-[#267d84] text-white font-bold py-3 px-6 rounded-lg"
              >
                INVITACIÓN
              </button>
            </div>
          </form>

          <ModalInviteCode
            isVisible={isModalVisible}
            onClose={closeModal}
            inviteCode={inviteCode}
          />
          <ChatButton />
        </div>
      </div>
    </div>
  );
};

export default CreateTeam;
