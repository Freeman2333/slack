import { useQuery } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";

interface UseGetMessageProps {
  messageId: Id<"messages">;
}

export const useGetMessage = ({ messageId }: UseGetMessageProps) => {
  const message = useQuery(api.messages.getById, { id: messageId });
  const isLoading = message === undefined;

  return {
    message,
    isLoading,
  };
};
