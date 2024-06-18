import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:3000'); // Asegúrate de que el puerto coincida con el del backend

export default socket;
