import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}
export interface JwtPayload {
  sub: string;
  id: string;
  email: string;
  iat: number;
  exp: number;
}
