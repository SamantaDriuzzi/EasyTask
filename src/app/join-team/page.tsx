"use client";
import Logo from "@/components/logo";
import ModalJoinTeam from "@/components/modals/modalJoinTeam";
import { useAuth } from "@/contextLogin/AuthContext";
import { postJoinTeam } from "@/helpers/teams/post";
import Image from "next/image";
import React, { useState } from "react";

const UneteAUnEquipoPage = () => {
  const [invitationCode, setInvitationCode] = useState("");
  const { userIdFromToken } = useAuth();
  const userId = userIdFromToken();
  const [teamName, setTeamName] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvitationCode(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const info = { userid: userId, code: invitationCode };
      const data = await postJoinTeam(info);
      if (data && data.team.team_id && data.team.team_name) {
        alert("Te sumaste al equipo ✅");
        setTeamName(data.team.team_name);
        openModal();
        setInvitationCode("");
      } else {
        alert("Hubo un error al unirse ❌");
      }
    } catch (error) {
      console.error("Error al unirse al equipo:", error);
    }
  };

  return (
    <div className="">
      <div className="bg-[#B4B3EA] py-12 flex flex-row">
        <h2 className="text-2xl font-bold text-left text-black ml-3 mt-14">
          ¡Únete a un equipo!
        </h2>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow py-10 ">
        <div className=" w-1/2 ">
          <Logo />
          <hr className=" bg-color1 w-50 mt-4 border-t-3 h-1 " />
          <h3 className="text-xl font-semibold mb-4 mt-4 text-center ">
            Ingresa el código de invitación:
          </h3>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <input
              type="text"
              placeholder="Código del equipo"
              value={invitationCode}
              onChange={handleInputChange}
              className="w-full p-3 mb-4 border border-gray-300 rounded-md"
            />
            <button
              type="submit"
              className="bg-color1 hover:bg-color3 text-white font-bold py-3 px-12 rounded-lg"
            >
              UNIRSE
            </button>
          </form>
          <ModalJoinTeam
            isVisible={isModalVisible}
            onClose={closeModal}
            team_name={teamName}
          />
        </div>
      </div>
    </div>
  );
};

export default UneteAUnEquipoPage;
