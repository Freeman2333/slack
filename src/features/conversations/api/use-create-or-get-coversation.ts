import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import { api } from "../../../../convex/_generated/api";

export const useCreateOrGetConversation = () => {
  const mutation = useMutation({
    mutationFn: useConvexMutation(api.conversations.createOrGet),
    onError: (error) => {
      toast.error(error.message || "Failed to create coversation.");
    },
  });
  return mutation;
};
