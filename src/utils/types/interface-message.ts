import { User } from './interface-user'; // Asegúrate de importar la interfaz del usuario

export interface Message {
  id: number;
  sender: User;
  receiver: User;
  content: string;  
  createdAt: Date;
}
