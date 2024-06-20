"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowCircleLeft, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Image from "next/image";
import Logo from "@/components/logo";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const schema = yup.object().shape({
  email: yup
    .string()
    .email("The email is not valid")
    .required("This field is required"),
  password: yup.string().required("This field is required"),
});

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const router = useRouter();
  const handleBackClick = () => {
    router.push("/");
  };

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch(`${API_URL}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Hubo un problema al iniciar sesión");
      }

      const result = await response.json();
      const { token } = result;
      localStorage.setItem("userSession", JSON.stringify({ token: token }));
      Swal.fire({
        icon: "success",
        title: "Ingresaste con éxito!"
      });
      setTimeout(() => {
        router.push("/home");
      }, 1000);
    } catch (error: any) {
      setLoginError(error.message || "Incorrect Credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#5F98DF] via-[#9679C6] to-[#4A48A4]">
      <div className="w-full max-w-md p-6 space-y-4 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <Logo />
        </div>
        {loginError && (
          <p className="mt-2 text-sm text-red-600">{loginError}</p>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <div className="mt-1 relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className={`block w-full px-3 py-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
              >
                <Image
                  src={
                    showPassword
                      ? "/login/OjosAbiertos.svg"
                      : "/login/OjosCerrados.svg"
                  }
                  alt="Hide and Show password"
                  width={24}
                  height={24}
                />
              </span>
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#329FA6] hover:bg-[#267d84] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Iniciar sesión
            </button>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">O</span>
          </div>
          <div>
            <button
              onClick={() => signIn("google", { callbackUrl: "/home" })}
              type="button"
              className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FaGoogle className="mr-2" /> Ingresar con Google
            </button>
          </div>
          <div className="text-center text-sm text-gray-600">
            <span>¿No estás registrado? </span>
            <Link
              href="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Registrarse aquí
            </Link>
          </div>
        </form>
        <div className="flex justify-center mt-4">
          <button
            onClick={handleBackClick}
            className="w-1/4 lg:w-1/4 bg-color3 hover:bg-color-button-hover text-black text-md font-bold py-2 px-4 rounded-lg flex items-center justify-center"
          >
            <FaArrowCircleLeft className="mr-2" /> Salir
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
