"use client";
import { useAuth } from "@/contextLogin/AuthContext";

const LogoutButton = () => {
  const { handleSignOut } = useAuth() || { handleSignOut: () => {} };

  const handleLogout = async () => {
    try {
      await handleSignOut();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };
  return (
    <button
      onClick={handleLogout}
      className="bg-white hover:bg-color5 text-black hover:text-white font-bold py-2 px-4 rounded ml-4"
    >
      CERRAR SESION
    </button>
  );
};

export default LogoutButton;
