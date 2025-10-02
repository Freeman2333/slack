"use client";

import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

const WorkspaceIdPage = () => {
  const workspaceId = useWorkspaceId();

  const { isLoading, workspace } = useGetWorkspace({ id: workspaceId });

  return <div>Data: {JSON.stringify(workspace, null, 2)}</div>;
};

export default WorkspaceIdPage;
