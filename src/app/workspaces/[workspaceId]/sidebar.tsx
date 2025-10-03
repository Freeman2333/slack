"use client";

import { usePathname } from "next/navigation";
import { Bell, Home, MessagesSquare, MoreHorizontal } from "lucide-react";

import { SidebarButton } from "./sidebar-button";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { UserButton } from "@/features/auth/components/user-button";

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="h-full w-[70px] bg-brand flex flex-col items-center gap-y-4 pt-2 pb-4">
      <WorkspaceSwitcher />
      <SidebarButton
        label="Home"
        icon={Home}
        isActive={pathname.includes("/workspaces")}
      />
      <SidebarButton icon={MessagesSquare} label="DMs" />
      <SidebarButton icon={Bell} label="Activity" />
      <SidebarButton icon={MoreHorizontal} label="More" />
      <div className="mt-auto">
        <UserButton />
      </div>
    </div>
  );
};
