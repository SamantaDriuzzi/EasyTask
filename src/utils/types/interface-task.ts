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
}

export interface TaskData {
  name: string;
  description: string;
  status: string;
  priority: number;
  story_points: number;
}
