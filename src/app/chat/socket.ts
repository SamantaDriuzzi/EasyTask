import { io } from "socket.io-client";

// Conectar con el servidor de socket
const socket = io("http://localhost:3000", {
  reconnection: true,  // Habilita la reconexión automática
  reconnectionDelay: 1000,  // Retardo inicial de reconexión en milisegundos
  reconnectionAttempts: Infinity,  // Número máximo de intentos de reconexión (Infinity para intentos infinitos)
});

// Manejar eventos de conexión
socket.on("connect", () => {
  console.log("Connected to server:", socket.id);
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

// Manejar eventos de reconexión
socket.on("reconnect", (attemptNumber) => {
  console.log("Reconnected to server after attempt number", attemptNumber);
});

socket.on("reconnect_error", (error) => {
  console.log("Reconnection error:", error.message);
});

export default socket;
