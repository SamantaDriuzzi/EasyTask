// socket.js (o donde tengas configurado Socket.IO)
import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: Infinity,
});

export default socket;
