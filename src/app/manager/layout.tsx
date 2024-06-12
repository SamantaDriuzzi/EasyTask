"use client";
import React from "react";
import Sidebar from "@/components/Sidebar";

const ManagerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-6 mt-16">{children}</div>
    </div>
  );
};

export default ManagerLayout;
