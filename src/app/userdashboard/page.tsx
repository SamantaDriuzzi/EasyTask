/* eslint-disable @next/next/no-img-element */
"use client";
import SidebarUser from "@/components/SidebarUser/SidebarUser";

const UserDashboardHome = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <SidebarUser />
      <main className="flex-1 p-10 text-center">
        <div className="bg-[#B4B3EA] py-2 shadow-md w-full text-center">
          <h2 className="text-2xl font-semibold text-black mt-6">
            ¡Bienvenido!
          </h2>
          <p className="text-xl text-black">Dashboard del Usuario</p>
        </div>
        <section className="bg-[#B4B3EA] p-6 rounded-md shadow-md w-full flex justify-center items-center">
          <img
            src="/dashboard-user/dashboardAdmin1.svg"
            alt="Dashboard Admin"
            className="max-w-full h-auto"
          />
        </section>
      </main>
    </div>
  );
};

export default UserDashboardHome;
