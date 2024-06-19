import { User } from "./interface-user";

export interface Team {
  team_id: string;
  team_name: string;
  description: string;
  created_date: Date;
  finish_date: Date;
  invitation_code: string;
  team_leader: User;
  team_users: User[];
  sprints: null;
  tasks: string[];
  deletedAt: Date | null;
}

export interface TeamCrate {
  team_name: string;
  description: string;
  created_date: Date;
  finish_date: Date;
}
export interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  inviteCode: string;
}
export interface JoinTeam {
  userid: string | null;
  code: string;
}
export interface ModalTeam {
  isVisible: boolean;
  onClose: () => void;
  team_name: string;
}
