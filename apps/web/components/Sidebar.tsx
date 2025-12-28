"use client";

import Image from "next/image";
import type { ReactNode } from "react";

const LOGO_WIDTH = 165;
const LOGO_HEIGHT = 22;

export interface SidebarProps {
  children: ReactNode;
  className?: string;
}

export function Sidebar({ children, className = "" }: SidebarProps) {
  return (
    <aside
      className={`flex h-full w-80 flex-col bg-fixed-level-one ${className}`}
    >
      <div className="flex flex-col gap-10 px-6 pt-10">
        <Image
          src="/logo.svg"
          alt="Trace Finance"
          width={LOGO_WIDTH}
          height={LOGO_HEIGHT}
          className="object-contain"
          priority
        />
      </div>
      {children}
    </aside>
  );
}
