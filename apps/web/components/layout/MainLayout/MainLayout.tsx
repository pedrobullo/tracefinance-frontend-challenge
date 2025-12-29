"use client";

import type { ReactNode } from "react";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/outline";
import { Sidebar } from "../../Sidebar/Sidebar";
import { NavItem } from "../../NavItem/NavItem";
import { ProfileCard } from "../../ProfileCard/ProfileCard";
import { Header } from "../../Header/Header";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen w-full">
      <Sidebar className="h-screen">
        <div className="flex flex-1 flex-col px-6">
          <nav className="flex flex-col gap-1 mt-10">
            <NavItem
              icon={<ArrowsRightLeftIcon className="h-6 w-6" />}
              translationKey="pages.transactions"
              isActive
            />
          </nav>
        </div>
        <ProfileCard companyName="Trace Finance" userName="Elon Musk" />
      </Sidebar>
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-auto bg-level-one p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
