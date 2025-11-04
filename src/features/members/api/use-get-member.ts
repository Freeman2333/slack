import { useQuery } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";

interface UseGetChannelProps {
  memberId: Id<"members">;
}

export const useGetMember = ({ memberId }: UseGetChannelProps) => {
  const member = useQuery(api.members.getById, { id: memberId });
  const isLoading = member === undefined;

  return {
    member,
    isLoading,
  };
};
