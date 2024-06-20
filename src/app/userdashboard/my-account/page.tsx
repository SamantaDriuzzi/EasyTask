/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHeart,
  faPen,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useAuth } from "@/contextLogin/AuthContext";
import { getUserById } from "@/helpers/users/get";
import { User } from "@/utils/types/interface-user";
import Swal from "sweetalert2";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface UserData {
  name: string;
  email: string;
  nickname: string;
}

const EditableField = ({
  label,
  value,
  isEditing,
  onEdit,
  onChange,
}: {
  label: string;
  value: string;
  isEditing: boolean;
  onEdit: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="mb-4">
    <label className="block text-gray-700">{label}:</label>
    {isEditing ? (
      <div className="flex items-center">
        <input
          type="text"
          value={value}
          onChange={onChange}
          className="flex-grow p-2 border border-gray-300 rounded-md"
        />
      </div>
    ) : (
      <div className="flex items-center">
        <p className="bg-gray-200 p-2 rounded-md flex-grow">{value}</p>
        <FontAwesomeIcon
          icon={faPen}
          className="ml-2 cursor-pointer"
          onClick={onEdit}
        />
      </div>
    )}
  </div>
);

const PageMyAccount = () => {
  const { userIdFromToken } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<{
    [key in keyof UserData]: boolean;
  }>({ name: false, email: false, nickname: false });
  const [formData, setFormData] = useState<UserData>({
    name: "",
    email: "",
    nickname: "",
  });

  useEffect(() => {
    const loadUserData = async () => {
      const userId = userIdFromToken();
      if (userId) {
        try {
          const user = await getUserById(userId);
          if (user) {
            setUser(user);
            setFormData({
              name: user.name || "👤",
              email: user.credentials.email || "email@email.com",
              nickname: user.credentials.nickname || "👤",
            });
            setProfileImage(user.profilePicture || null);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    loadUserData();
  }, [userIdFromToken]);

  const handleEdit = (field: keyof UserData) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = async () => {
    const userId = userIdFromToken();

    if (!userId) return;

    try {
      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const updatedUser = await response.json();
      if (response.status !== 200) {
        throw new Error("Error updating user data");
      }
      setUser(updatedUser);
      setIsEditing({ name: false, email: false, nickname: false });
      Swal.fire({
        icon: "success",
        title: "Datos actualizados con éxito!",
      });
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const userId = userIdFromToken();

    if (file && userId) {
      const formData = new FormData();
      formData.append("image", file);

      console.log("data antes de enviar foto:::::", formData);

      try {
        const response = await fetch(
          `${API_URL}/files/profilePicture?id=${userId}`,
          {
            method: "POST",
            body: formData,
          }
        );
        const result = await response.json();
        setProfileImage(result.url);
        Swal.fire({
          icon: "success",
          title: "Imagen subida con éxito!",
        });
      } catch (error) {
        console.error("Error uploading image:", error);

        Swal.fire({
          icon: "error",
          title: "Error al subir la imagen",
        });

      }
    } else {
      Swal.fire({
        icon: "error",
        title: "No se ha seleccionado una imagen o el ID de usuario no es válido",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <div className="w-full bg-[#B4B3EA] py-6">
        <h2 className="text-2xl font-bold text-left text-black ml-6 mt-14">
          <FontAwesomeIcon icon={faUser} className="mr-2" />
          Mi cuenta
        </h2>
      </div>
      <main className="w-full max-w-8xl flex mt-0">
        <aside className="w-1/4 bg-white p-4 rounded-lg shadow-md">
          <ul>
            <li className="flex items-center mb-4">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              <Link href="/userdashboard">Mi cuenta</Link>
            </li>
            <li className="flex items-center">
              <FontAwesomeIcon icon={faHeart} className="mr-2" />
              <Link href="/userdashboard/my-donations">Mis Donaciones</Link>
            </li>
          </ul>
        </aside>
        <section className="w-3/4 bg-white p-8 rounded-lg shadow-md ml-4">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-2 relative">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <FontAwesomeIcon icon={faUser} size="2x" />
              )}
              <label className="absolute bottom-0 left-20 bg-gray-500 text-white p-1 rounded-full cursor-pointer">
                <FontAwesomeIcon icon={faUpload} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
            <h3 className="text-xl font-bold mb-4">Mis datos:</h3>
            <div className="w-full max-w-sm">
              <EditableField
                label="Nombre"
                value={formData.name}
                isEditing={isEditing.name}
                onEdit={() => handleEdit("name")}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <div className="mb-4">
                <label className="block text-gray-700">Email:</label>
                <div className="flex items-center">
                  <input
                    disabled
                    value={formData.email}
                    className="flex-grow p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <EditableField
                label="Nickname"
                value={formData.nickname}
                isEditing={isEditing.nickname}
                onEdit={() => handleEdit("nickname")}
                onChange={(e) =>
                  setFormData({ ...formData, nickname: e.target.value })
                }
              />
              <div className="flex space-x-4">
                <Link href="/userdashboard/change-password">
                  <button className="bg-teal-500 text-white p-2 rounded-md hover:bg-violet-400 flex items-center">
                    Cambiar contraseña
                  </button>
                </Link>
                <button
                  className="bg-teal-500 text-white p-2 rounded-md hover:bg-violet-400"
                  onClick={handleSave}
                >
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PageMyAccount;
