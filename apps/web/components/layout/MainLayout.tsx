"use client";

import type { ReactNode } from "react";
import { Sidebar } from "../Sidebar";
import { Header } from "../Header";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-auto bg-level-one p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
