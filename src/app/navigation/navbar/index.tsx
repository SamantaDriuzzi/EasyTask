import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className=" w-full h-30 bg-color7 fixed top-0 p-4 z-20">
      <div className="flex justify-between items-center">
        <Link href="/" className="flex">
          <Image src="/logo.svg" alt="logo" width={36} height={26} />
          <Image src="/EasyTasks.svg" alt="AppName" width={100} height={100} />
        </Link>

        <nav className="flex space-x-8">
          <a
            href="/register"
            className="hover:text-gray-200 transition duration-300"
          >
            Comenzar
          </a>
          <a
            href="#section-about"
            className="hover:text-gray-200 transition duration-300"
          >
            Nosotros
          </a>
          <a
            href="#section-donations"
            className="hover:text-gray-200 transition duration-300"
          >
            Donaciones
          </a>
        </nav>
        <Link href="/login">
          <button className="bg-white hover:bg-blue-light text-black font-bold py-2 px-4 rounded ml-4">
            INICIAR SESION
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
