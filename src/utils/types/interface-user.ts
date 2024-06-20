interface Credential {
  id: number;
  nickname: string;
  email: string;
  password: string;
  user: string;
}

export interface User {
  created: Date;
  credentials: Credential;
  deletedAt: Date;
  is_admin: boolean;
  last_login: Date;
  name: string;
  profilePicture: string;
  status: boolean;
  tasks: string[];
  teams: string[];
  token: string;
  user_id: string;
}

export interface Collaborator {
  name: string;
  user_id: string;
}
