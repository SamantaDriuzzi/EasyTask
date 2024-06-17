"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Chatbot = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const playSound = () => {
    const audio = new Audio("/sounds/notification.wav");
    audio.play();
  };

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput("");
      playSound(); //aqui se activa y reproduce el sonido cuando se envia un mensaje
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="w-full bg-[#B4B3EA] py-4">
        <h2 className="text-2xl font-bold text-left text-black ml-6 mt-20">
          ¡Charla con los miembros de tu equipo!
        </h2>
      </div>
      <main className="w-full max-w-8xl flex flex-col items-center mt-4 px-4">
        <div className="w-full flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/3 bg-[#6C63FF] p-4 rounded-lg flex flex-col items-center mb-4 lg:mb-0">
            <Image
              src="/catchatbot.svg"
              alt="Chatbot"
              width={200}
              height={100}
            />
            <h3 className="text-white mt-4 text-center">
              Envía un mensaje a un compañero de trabajo
            </h3>
            <ul className="mt-4 w-full">
              <li className="bg-white p-2 my-2 rounded-md flex items-center">
                <div className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-2">
                  <FontAwesomeIcon icon={faUser} />
                  <span></span>
                </div>
                Nickname
              </li>
              <li className="bg-white p-2 my-2 rounded-md flex items-center">
                <div className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-2">
                  <FontAwesomeIcon icon={faUser} />
                  <span></span>
                </div>
                Nickname
              </li>
              <li className="bg-white p-2 my-2 rounded-md flex items-center">
                <div className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-2">
                  <FontAwesomeIcon icon={faUser} />
                  <span></span>
                </div>
                Nickname
              </li>
            </ul>
          </div>
          <div className="w-full lg:w-2/3 bg-[#e7e7ee] p-4 rounded-lg ml-8 flex flex-col">
            <div className="flex items-center bg-[#4A48A4] p-2 rounded-md mb-3">
              <div className="bg-black text-white w-10 h-10 rounded-full flex items-center justify-center mr-4">
                <FontAwesomeIcon icon={faUser} />
                <span></span>
              </div>
              <span className="text-xl text-white">Nickname</span>
            </div>
            <div className="flex-grow bg-white p-4 rounded-md overflow-y-auto">
              {messages.map((message, index) => (
                <div key={index} className="p-4 my-2 bg-gray-100 rounded-md">
                  {message}
                </div>
              ))}
            </div>
            <div className="flex mt-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-grow p-3 border border-gray-300 rounded-md"
              />
              <button
                onClick={handleSend}
                className="bg-[#6C63FF] text-white p-2 rounded-full ml-2 flex items-center justify-center w-12 h-12"
              >
                <Image src="/send3.png" alt="Send" width={30} height={30} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chatbot;
