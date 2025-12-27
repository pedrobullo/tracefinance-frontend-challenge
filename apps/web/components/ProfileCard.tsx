"use client";

import { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

import { ProfileMenu } from "./ProfileMenu";

interface ProfileCardProps {
  companyName: string;
  userName: string;
  initials: string;
}

export function ProfileCard({
  companyName,
  userName,
  initials,
}: ProfileCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative cursor-pointer">
      <ProfileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <button
        type="button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex w-full items-center justify-between bg-fixed-level-three px-6 py-6 transition-colors hover:bg-fixed-level-two"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-action-brand-secondary-hover">
            <span className="text-200-medium text-fixed-black">{initials}</span>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-100-medium text-fixed-primary">
              {companyName}
            </span>
            <span className="text-100-light text-tertiary">{userName}</span>
          </div>
        </div>
        {isMenuOpen ? (
          <ChevronUpIcon className="h-5 w-5 text-fixed-primary transition-transform" />
        ) : (
          <ChevronDownIcon className="h-5 w-5 text-fixed-primary transition-transform" />
        )}
      </button>
    </div>
  );
}
