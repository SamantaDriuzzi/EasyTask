import { Message } from '../../utils/types/interface-message';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getMessages = async (senderId: string, receiverId: string): Promise<Message[]> => {
  const response = await fetch(`${API_URL}/messages/${senderId}/${receiverId}`);
  if (!response.ok) {
    throw new Error('Error fetching messages');
  }
  return response.json();
};

const sendMessage = async (senderId: string, receiverId: string, content: string): Promise<Message> => {
  const response = await fetch(`${API_URL}/messages/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ senderId, receiverId, content }),
  });

  if (!response.ok) {
    throw new Error('Error sending message');
  }
  return response.json();
};

export { getMessages, sendMessage };
