export interface User {
  user_id: string;
  token: string;
  name: string;
  created: Date;
  last_login: Date;
  status: boolean;
  profilePicture: string;
  tasks: string[];
  teams: string[];
  deletedAt: Date;
  credentials: {
    id: number;
    nickname: string;
    email: string;
    password: string;
    user: string;
  };
}
