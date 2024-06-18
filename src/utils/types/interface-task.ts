"tasks";
import { User } from "./interface-user";

export interface Task {
  task_id: string;
  name: string;
  description: string;
  created: string;
  deadline: string;
  status: string;
  priority: number;
  story_points: number;
  collaborators: User[];
  user_owner: User;
}

export interface TaskData {
  name: string;
  description: string;
  status: string;
  priority: number;
  story_points: number;
  user_owner: string | null;
}
