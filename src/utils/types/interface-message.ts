import { User } from './interface-user'; // Asegúrate de importar la interfaz del usuario

export interface Message {
  id: number;
  content: string;
  sender: User;
  receiver: User;
  createdAt: Date;
  read: boolean;
}
