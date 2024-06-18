"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import socket from "./socket";
import { useAuth } from "@/contextLogin/AuthContext";
import styles from "./styles.css"; // Asegúrate de tener este archivo CSS en tu proyecto
import { User } from "@/utils/types/interface-user";
import { Message } from "@/utils/types/interface-message";
import { getAmiwis, getUserById } from "@/helpers/chat/get";
import { getMessages, sendMessage } from "@/helpers/chat/messages";

const Chat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [selectedFriend, setSelectedFriend] = useState<User | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [amiwis, setAmiwis] = useState<User[]>([]);
    const { userIdFromToken } = useAuth();
    const id = userIdFromToken();

    useEffect(() => {
        const fetchUser = async () => {
            if (id) {
                const fetchedUser = await getUserById(id);
                setUser(fetchedUser);
                const fetchedAmiwis = await getAmiwis(id);
                setAmiwis(fetchedAmiwis);
            }
        };
        fetchUser();
    }, [id]);

    useEffect(() => {
        const handleMessage = (message: Message) => {
            console.log("Message received:", message);
            setMessages((prevMessages) => [message, ...prevMessages]);
        };

        socket.on("message", handleMessage);

        return () => {
            socket.off("message", handleMessage);
        };
    }, []);

    useEffect(() => {
        console.log("Current messages state:", messages);
    }, [messages]);

    useEffect(() => {
        const fetchMessages = async () => {
            if (selectedFriend) {
                const fetchedMessages = await getMessages(selectedFriend.user_id);
                setMessages(fetchedMessages);
            }
        };
        fetchMessages();
    }, [selectedFriend]);

    const handleSend = async () => {
        if (input.trim() && user && selectedFriend) {
            // Envía el mensaje al servidor
            const message = await sendMessage(user.user_id, selectedFriend.user_id, input);
            // Añade el mensaje al estado local para visualizarlo inmediatamente
            setMessages((prevMessages) => [...prevMessages, message]);
            setInput("");
            // Emite el mensaje a través del socket
            socket.emit("sendMessage", {
                senderId: user.user_id,
                receiverId: selectedFriend.user_id,
                content: input,
            });
        }
    };

    const handleFriendClick = (friend: User) => {
        setSelectedFriend(friend);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSend();
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="w-full bg-[#B4B3EA] py-4">
                <h2 className="text-2xl font-bold text-left text-black ml-6 mt-20">
                    ¡Charla con los miembros de tu equipo!
                </h2>
            </div>
            <main className="w-full max-w-8xl flex flex-col items-center mt-4 px-4 h-full">
                <div className="w-full flex flex-col lg:flex-row h-full">
                    <div className="w-full lg:w-1/3 bg-[#6C63FF] p-4 rounded-lg flex flex-col items-center mb-4 lg:mb-0">
                        <Image src="/catchat.svg" alt="Chat" width={200} height={100} />
                        <h3 className="text-white mt-4 text-center">Envía un mensaje a un compañero de trabajo</h3>
                        <ul className="mt-4 w-full">
                            {amiwis.map((friend) => (
                                <li
                                    key={friend.user_id}
                                    className="bg-white p-2 my-2 rounded-md flex items-center cursor-pointer"
                                    onClick={() => handleFriendClick(friend)}
                                >
                                    <div className="relative w-8 h-8 rounded-full overflow-hidden flex items-center justify-center mr-2">
                                        {friend.profilePicture ? (
                                            <Image
                                                src={friend.profilePicture}
                                                alt={friend.name}
                                                layout="fill"
                                                objectFit="cover"
                                            />
                                        ) : (
                                            <div className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center">
                                                <span>{friend.name[0]}</span>
                                            </div>
                                        )}
                                    </div>
                                    <span>{friend.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {selectedFriend && (
                        <div
                            className={`w-full lg:w-2/3 bg-[#e7e7ee] p-4 rounded-lg ml-8 flex flex-col ${styles["chat-container"]}`}
                        >
                            <div
                                className={`flex items-center bg-[#4A48A4] p-2 rounded-md mb-3 ${styles["friend-info"]}`}
                            >
                                <div className="relative w-10 h-10 rounded-full overflow-hidden flex items-center justify-center mr-4">
                                    {selectedFriend.profilePicture ? (
                                        <Image
                                            src={selectedFriend.profilePicture}
                                            alt={selectedFriend.name}
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    ) : (
                                        <div className="bg-black text-white w-10 h-10 rounded-full flex items-center justify-center">
                                            <span>{selectedFriend.name[0]}</span>
                                        </div>
                                    )}
                                </div>
                                <span className="text-xl text-white">{selectedFriend.name}</span>
                            </div>
                            <div
                                className={`flex-grow bg-white p-4 rounded-md overflow-y-auto ${styles["chat-messages"]}`}
                            >
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`p-4 my-2 rounded-md ${
                                            message.sender.user_id === user?.user_id
                                                ? "bg-blue-100 self-end"
                                                : "bg-gray-100 self-start"
                                        }`}
                                    >
                                        {message.content}
                                    </div>
                                ))}
                            </div>
                            <div className={`flex mt-4 ${styles["chat-input"]}`}>
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
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
                    )}
                </div>
            </main>
        </div>
    );
};

export default Chat;
