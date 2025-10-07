import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import WorkspaceHeader from "./workspace-header";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { AlertTriangle, Loader } from "lucide-react";
import { useCurrentMember } from "@/features/members/api/use-current-member";

export const WorkspaceSidebar = () => {
  const workspaceId = useWorkspaceId();

  const { isLoading: isLoadingMember, member } = useCurrentMember(workspaceId);
  const { isLoading: isLoadingWorkspace, workspace } = useGetWorkspace({
    id: workspaceId,
  });

  if (isLoadingMember || isLoadingWorkspace) {
    return (
      <div className="h-full flex justify-center items-center text-white">
        <Loader className="size-5 animate-spin" />
      </div>
    );
  }

  if (!workspace || !member) {
    return (
      <div className="h-full flex flex-col justify-center items-center text-white">
        <AlertTriangle className="size-5 text-white" />
        <p className="text-white text-sm">Workspace not found</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col text-white py-1 px-3">
      <WorkspaceHeader name={workspace?.name} />
    </div>
  );
};
