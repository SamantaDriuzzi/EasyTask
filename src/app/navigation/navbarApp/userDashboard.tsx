"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contextLogin/AuthContext";
import { User } from "@/utils/types/interface-user";
import { getUserById } from "@/helpers/users/get";

const Dashboard = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [showOptions, setShowOptions] = useState(false);
  const [userData, setUserData] = useState<User>();
  const { userIdFromToken } = useAuth();
  const id = userIdFromToken();

  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        const fetchedUser = await getUserById(id);
        setUserData(fetchedUser);
      }
    };

    fetchUser();
  }, [id]);

  const { handleSignOut } = useAuth() || {
    handleSignOut: () => {},
  };

  const handleLogout = async () => {
    try {
      await handleSignOut();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handlePageChange = (page: string) => {
    router.push(`/${page}`);
    setShowOptions(false);
  };

  return (
    <>
      <div className="relative">
        <div
          onClick={toggleOptions}
          className="text-xl hover:bg-color4 text-center rounded-md shadow-lg w-[174px] hover:scale-105 hover:shadow-2xl transition-transform cursor-pointer"
        >
          Hi! {userData ? userData.name : null}
        </div>
        {showOptions && (
          <div className="absolute w-[175px] text-center flex flex-col gap-2 right-0 bg-color4 rounded-md shadow-lg z-40 p-2">
            {userData ? (
              <button
                className="text-white py-2 px-2 hover:scale-105 hover:shadow-2xl transition-transform cursor-pointer"
                onClick={() => handlePageChange("userdashboard")}
              >
                MI PERFIL
              </button>
            ) : null}
            {userData?.is_admin ? (
              <button
                className="text-white px-2 hover:scale-105 hover:shadow-2xl transition-transform cursor-pointer"
                onClick={() => handlePageChange("manager")}
              >
                PANEL ADMIN
              </button>
            ) : null}
            <button
              onClick={handleLogout}
              className="text-white py-2 px-2 hover:scale-105 hover:shadow-2xl transition-transform cursor-pointer"
            >
              CERRAR SESION
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
