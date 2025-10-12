import { useQuery } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";

interface UseGetMembersProps {
  id: Id<"workspaces">;
}

export const useGetMembers = ({ id }: UseGetMembersProps) => {
  const members = useQuery(api.members.get, { workspaceId: id });
  const isLoading = members === undefined;

  return {
    members,
    isLoading,
  };
};
