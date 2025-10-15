import { useQuery } from "convex/react";

import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface UseGetWorkspaceProps {
  workspaceId: Id<"workspaces">;
}

export const useGetWorkspaceInfo = ({ workspaceId }: UseGetWorkspaceProps) => {
  const workspaceInfo = useQuery(api.workspaces.getWorkspaceInfo, {
    id: workspaceId,
  });
  const isLoading = workspaceInfo === undefined;

  return {
    workspaceInfo,
    isLoading,
  };
};
