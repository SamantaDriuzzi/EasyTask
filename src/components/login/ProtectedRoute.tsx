"use client";
import { useAuth } from "../../contextLogin/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ProtectedRoute = ({ children }: any) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return children;
};

export default ProtectedRoute;

//debo tomar en cuenta aqui en este archivo en donde deberia envolver la ruta que debo proteger con este componente puede ser el dasboard u otro archivo donde se muestr los datos y le de la bienveinida a el usuario
