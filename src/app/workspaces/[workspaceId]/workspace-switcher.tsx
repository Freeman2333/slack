"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { Loader, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export const WorkspaceSwitcher = () => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const [_isOpen, setIsOpen] = useCreateWorkspaceModal();

  const { isLoading: isLoadingWorkspace, workspace: currentWorkspace } =
    useGetWorkspace({
      id: workspaceId,
    });
  const { workspaces } = useGetWorkspaces();

  const filteredWorkspaces = workspaces?.filter(
    (workspace) => workspace._id !== workspaceId
  );

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button className="size-9  bg-[#ABABAA] font-bold text-lg hover:bg-[#ABABAA]/80 text-slate-800 overflow-hidden">
          {isLoadingWorkspace ? (
            <Loader className="size-5 animate-spin shrink-0" />
          ) : (
            currentWorkspace?.name.charAt(0).toUpperCase()
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="start" className="w-60">
        <DropdownMenuItem className="cursor-pointer flex-col justify-start items-start capitalize">
          {currentWorkspace?.name}
          <span className="text-xs text-muted-foreground">
            Active workspace
          </span>
        </DropdownMenuItem>
        {filteredWorkspaces?.map((workspace) => (
          <DropdownMenuItem
            key={workspace._id}
            className="flex justify-start cursor-pointer"
            onClick={() => router.push(`/workspaces/${workspace._id}`)}
          >
            <div className="size-9 bg-[#616061] text-white rounded-md flex items-center justify-center text-lg font-bold">
              {workspace.name.charAt(0).toUpperCase() ?? "W"}
            </div>
            <span className="capitalize">{workspace.name}</span>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem
          onClick={() => setIsOpen(true)}
          className="flex justify-start items-center
          cursor-pointer"
        >
          <div className="size-9 text-slate-800 font-semibold text-lg bg-[#F2F2F2] rounded-md flex items-center justify-center">
            <Plus className="text-black" />
          </div>
          <span className="">Create New Workspace</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
