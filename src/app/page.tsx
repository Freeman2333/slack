"use client";

import { UserButton } from "@/features/auth/components/user-button";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 items-start">
      logged in
      <UserButton />
    </div>
  );
}
