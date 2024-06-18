import { Task } from "./interface-task";

export interface SprintData {
  name: string;
  goal: string | null;
  status: string;
}

export interface Sprint {
  sprint_id: string;
  name: string;
  description: string;
  created: string;
  finish_date: string;
  tasks: Task[];
  deletedAt: string;
}
