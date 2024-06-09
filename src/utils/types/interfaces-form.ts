// interfaces.ts
export interface FormFields {
  name: string;
  nickname: string;
  email: string;
  password: string;
}

export interface Errors {
  [key: string]: string;
}
export interface Login {
  email: string;
  password: string;
}
