"use client";
import { useAuth } from "@/contextLogin/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Home = () => {
  const router = useRouter();
  const { userIdFromToken } = useAuth();
  const id = userIdFromToken();

  const handleMyTeams = () => {
    router.push(`/my-teams/${id}`);
  };
  const handleCreateTeam = () => {
    router.push(`/create-team/${id}`);
  };
  const handleJoinTeam = () => {
    router.push(`/join-team`);
  };

  return (
    <>
      <section className="flex flex-col justify-center items-center h-screen bg-gradient-to-b from-color5 via-grey to-white pt-96 sm:pt-0">
        <h1 className="text-2xl font-bold my-10 py-4">¿Qué quieres hacer?</h1>
        <div className="flex flex-col sm:flex-row">
          <button
            onClick={handleCreateTeam}
            className="flex flex-col items-center my-4 sm:mx-10 transition-transform duration-300 transform hover:scale-125"
          >
            <Image
              src="/homeImg/crearEquipoHome.svg"
              alt="icon"
              width={150}
              height={150}
            />
            <h2 className="my-4 hover:underline">CREAR UN EQUIPO</h2>
          </button>
          <button
            onClick={handleJoinTeam}
            className="flex flex-col items-center my-4 sm:mx-10 transition-transform duration-300 transform hover:scale-125"
          >
            <Image
              src="/homeImg/unirseEquipoHome.svg"
              alt="icon"
              width={150}
              height={150}
            />
            <h2 className="my-4 hover:underline">UNIRSE A UN EQUIPO</h2>
          </button>
          <button
            onClick={handleMyTeams}
            className="flex flex-col items-center my-4 sm:mx-10 transition-transform duration-300 transform hover:scale-125"
          >
            <Image
              src="/homeImg/miEquipoHome.svg"
              alt="icon"
              width={150}
              height={150}
            />
            <h2 className="my-4 hover:underline">MIS EQUIPOS</h2>
          </button>
        </div>
      </section>
    </>
  );
};
export default Home;
