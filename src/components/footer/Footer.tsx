/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import Logo from "../logo";

const Footer = () => {
  return (
    <footer className="bg-footer-gradient text-black py-10 px-8">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex flex-col">
          <h2 className="text-lg font-bold mb-4">Web</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/#section-about">Nosotros</Link>
            </li>
            <li>
              <Link href="/register">Comenzar</Link>
            </li>
            <li>
              <Link href="/">Donaciones</Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-center">
          <Link href="/">
            <Logo />
          </Link>
          <div className="flex  space-x-4">
            <Link href="https://facebook.com">
              <FaFacebook size={24} />
            </Link>
            <Link href="https://instagram.com">
              <FaInstagram size={24} />
            </Link>
            <Link href="https://linkedin.com">
              <FaLinkedin size={24} />
            </Link>
            <Link href="https://youtube.com">
              <FaYoutube size={24} />
            </Link>
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="text-lg font-bold mb-4">Contacto</h2>
          <ul>
            <li>
              <Link href="/">Haz un reclamo</Link>
            </li>
            <li>
              <Link href="/">Deja una Consulta</Link>
            </li>
            <li>
              <Link href="/">Enviar Sugerencias</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-4">
        <p className="text-sm">
          @2024 - EasyTasks. All rights reserved. Application made by students
          in the final stage of the bootcamp Henry -{" "}
          <span className="font-bold">Educational purposes</span>{" "}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
