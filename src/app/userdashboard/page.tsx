/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHeart,
  faPen,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const UserDashboard = () => {
  const [name, setName] = useState("👤");
  const [email, setEmail] = useState("easytasks@gmail.com");
  const [nickname, setNickname] = useState("👤");
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({
    name: false,
    email: false,
    nickname: false,
  });
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleEdit = (field: string) => {
    setIsEditing({ ...isEditing, [field]: !isEditing[field] });
  };

  const handleSave = (field: string) => {
    setIsEditing({ ...isEditing, [field]: false });
    //  lógica para guardar los cambios en el servidor.:)
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
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
              <Link href="#">Mi cuenta</Link>
            </li>
            <li className="flex items-center">
              <FontAwesomeIcon icon={faHeart} className="mr-2" />
              <Link href="#">Mis Donaciones</Link>
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
              <div className="mb-4">
                <label className="block text-gray-700">Nombre:</label>
                {isEditing.name ? (
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="flex-grow p-2 border border-gray-300 rounded-md"
                    />
                    <button
                      onClick={() => handleSave("name")}
                      className="ml-2 bg-blue-700 text-white p-2 rounded-md hover:bg-violet-400"
                    >
                      Guardar
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <p className="bg-gray-200 p-2 rounded-md flex-grow">
                      {name}
                    </p>
                    <FontAwesomeIcon
                      icon={faPen}
                      className="ml-2 cursor-pointer"
                      onClick={() => handleEdit("name")}
                    />
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Mail:</label>
                {isEditing.email ? (
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-grow p-2 border border-gray-300 rounded-md"
                    />
                    <button
                      onClick={() => handleSave("email")}
                      className="ml-2 bg-blue-700 text-white p-2 rounded-md hover:bg-violet-400"
                    >
                      Guardar
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <p className="bg-gray-200 p-2 rounded-md flex-grow">
                      {email}
                    </p>
                    <FontAwesomeIcon
                      icon={faPen}
                      className="ml-2 cursor-pointer"
                      onClick={() => handleEdit("email")}
                    />
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Nickname:</label>
                {isEditing.nickname ? (
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      className="flex-grow p-2 border border-gray-300 rounded-md"
                    />
                    <button
                      onClick={() => handleSave("nickname")}
                      className="ml-2 bg-blue-700 text-white p-2 rounded-md hover:bg-violet-400"
                    >
                      Guardar
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <p className="bg-gray-200 p-2 rounded-md flex-grow">
                      {nickname}
                    </p>
                    <FontAwesomeIcon
                      icon={faPen}
                      className="ml-2 cursor-pointer"
                      onClick={() => handleEdit("nickname")}
                    />
                  </div>
                )}
              </div>
              <button className="bg-teal-500 text-white p-2 rounded-md hover:bg-violet-400">
                Cambiar contraseña
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default UserDashboard;
