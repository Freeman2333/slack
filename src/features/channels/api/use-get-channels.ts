import { useQuery } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";

interface UseGetChannelsProps {
  id: Id<"workspaces">;
}

export const useGetChannels = ({ id }: UseGetChannelsProps) => {
  const channels = useQuery(api.channels.get, { workspaceId: id });
  const isLoading = channels === undefined;

  return {
    channels,
    isLoading,
  };
};
