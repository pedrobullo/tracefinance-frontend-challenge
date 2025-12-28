"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

import { Typography } from "@repo/ui";
import { getInitials } from "@/utils/user";

import { ProfileMenu } from "./ProfileMenu";

interface ProfileCardProps {
  companyName: string;
  userName: string;
  userAvatar?: string;
}

export function ProfileCard({
  companyName,
  userName,
  userAvatar,
}: ProfileCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const initials = useMemo(() => getInitials(userName), [userName]);

  return (
    <div className="relative cursor-pointer">
      <ProfileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <button
        type="button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex w-full items-center justify-between bg-fixed-level-three px-6 py-6 transition-colors hover:bg-fixed-level-two"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-action-brand-secondary-hover">
            {userAvatar ? (
              <Image
                src={userAvatar}
                alt={userName}
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            ) : (
              <Typography variant="200-medium" color="black">
                {initials}
              </Typography>
            )}
          </div>
          <div className="flex flex-col items-start">
            <Typography variant="100-medium" color="fixed-primary">
              {userName}
            </Typography>
            <Typography variant="100-light" color="fixed-tertiary">
              {companyName}
            </Typography>
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
