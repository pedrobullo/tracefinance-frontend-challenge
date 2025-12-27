"use client";

import Image from "next/image";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/outline";
import { NavItem } from "./NavItem";
import { ProfileCard } from "./ProfileCard";

const LOGO_WIDTH = 165;
const LOGO_HEIGHT = 22;

export function Sidebar() {
  return (
    <aside className="flex h-screen w-80 flex-col bg-fixed-level-one">
      <div className="flex flex-1 flex-col gap-10 px-6 pt-10">
        <Image
          src="/logo.svg"
          alt="Trace Finance"
          width={LOGO_WIDTH}
          height={LOGO_HEIGHT}
          className="object-contain"
          priority
        />
        <nav className="flex flex-col gap-1">
          <NavItem
            icon={<ArrowsRightLeftIcon className="h-6 w-6" />}
            translationKey="pages.transactions"
            isActive
          />
        </nav>
      </div>
      <ProfileCard companyName="Trace Finance" userName="Elon Musk" />
    </aside>
  );
}
