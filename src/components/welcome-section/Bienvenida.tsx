import Navbar from "@/app/navigation/navbar";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const WelcomeSection = () => {
  return (
    <>
      <div className="bg-gradient-lineal min-h-screen top-0 w-full">
        <section className="flex flex-col items-center text-center">
          <div className=" mt-20 flex flex-col md:flex-row items-center justify-between w-full max-w-6xl mx-auto px-8">
            <div className="text-left md:w-1/2">
              <h1 className="text-4xl font-bold mb-4 text-white">
                ¡Descubre la forma mas colaborativa de gestionar tus tareas!
              </h1>
              <p className="text-2xl mb-4 text-white">
                Transforma tu manera de trabajar priorizando tu bienestar y
                mejorando tu rendimiento en el mundo laboral o personal.
              </p>
            </div>

            <div className="md:w-1/2 flex justify-center">
              <Image
                src="/sectionWelcome/gatosColaboradores.svg"
                width={600}
                height={600}
                alt="Gatos organizando sus tareas en una tableta"
                className="max-w-full"
              />
            </div>
          </div>
          <Link href="/register" className="mb-20 mt-2">
            <button className="bg-color-button hover:bg-color8  text-black font-bold py-2 px-8 rounded text-xl w-60">
              Registrarse
            </button>
          </Link>
        </section>
      </div>
    </>
  );
};

export default WelcomeSection;
