import { User } from "./interface-user";

export interface IDonation {
  donation_id: string;
  amount: number | string;
  date: string;
  user: User;
}
