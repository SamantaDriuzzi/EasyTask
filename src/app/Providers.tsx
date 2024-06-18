"use client";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/contextLogin/AuthContext";
import { DonorProvider } from "@/contextDonators";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
    <AuthProvider>
    <DonorProvider>{children}</DonorProvider>
    </AuthProvider>
  </SessionProvider>
  );
}
