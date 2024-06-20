"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contextLogin/AuthContext";
import { Team } from "@/utils/types/interface-team";
import Dashboard from "./userDashboard";

const NavbarApp = () => {
  const router = useRouter();

  const { userIdFromToken, teams, fetchTeams } = useAuth();
  const id = userIdFromToken();

  const handleSelectChange = (event: { target: { value: any } }) => {
    const value = event.target.value;

    if (value === "myTeams") {
      handleMyTeams();
    } else if (value === "createTeam") {
      handleCreateTeam();
    } else if (value === "joinTeam") {
      handleJoinTeam();
    } else {
      handleTeamBoard(value);
    }
  };

  const handleMyTeams = () => {
    router.push(`/my-teams/${id}`);
  };
  const handleCreateTeam = () => {
    router.push(`/create-team/${id}`);
  };
  const handleJoinTeam = () => {
    router.push(`/join-team`);
  };
  const handleInfoTeam = () => {
    router.push(`/info-team/${id}`);
  };

  const handleTeamBoard = (teamId: string) => {
    router.push(`/board/${teamId}`);
  };

  return (
    <div className="w-full h-30 bg-color5 fixed top-0 p-4 z-20">
      <div className="flex flex-row justify-between items-center">
        <Link href="/home" className="flex">
          <Image src="/logo.svg" width={26} height={26} alt="logo" />
          <Image src="/EasyTasks.svg" alt="AppName" width={100} height={100} />
        </Link>
        <nav className="flex space-x-8">
          <Link
            href="/home"
            className="text-gray-100 hover:text-white hover:underline transition duration-300"
          >
            Inicio
          </Link>

          <select
            onClick={fetchTeams}
            onChange={(event) => handleTeamBoard(event.target.value)}
            className="bg-color5 text-gray-100 hover:text-white hover:underline transition duration-300"
            defaultValue=""
          >
            <option value="">Tablero</option>
            {teams.map((team: Team) => (
              <option key={team.team_id} value={team.team_id}>
                {team.team_name}
              </option>
            ))}
          </select>
          <select
            onChange={handleSelectChange}
            className="bg-color5 text-gray-100 hover:text-white hover:underline transition duration-300"
            defaultValue="Panel de Equipos"
          >
            <option value="createTeam">Crear un equipo</option>
            <option value="myTeams">Mis Equipos</option>
            <option value="joinTeam">Unirse a un equipo</option>
          </select>
          <Link
            href="/donations"
            className="text-gray-100 hover:text-white hover:underline transition duration-300"
          >
            Donaciones
          </Link>
        </nav>

        <Dashboard />
      </div>
    </div>
  );
};

export default NavbarApp;
