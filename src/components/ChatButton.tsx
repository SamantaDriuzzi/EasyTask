"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ChatButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/chat");
  };

  return (
    <div
      className="fixed bottom-4 right-4 w-16 h-16 bg-[#4A48A4] rounded-full flex items-center justify-center cursor-pointer"
      onClick={handleClick}
    >
      <Image src="/chat2.png" alt="Chat" width={40} height={40} />
    </div>
  );
};

export default ChatButton;
