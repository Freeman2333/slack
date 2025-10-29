import { useMutation } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";

export const useToggleReaction = () => {
  const mutation = useMutation({
    mutationFn: useConvexMutation(api.reactions.toggle),
    onError: (error) => {
      toast.error(error.message || "Failed to leave reaction.");
    },
  });
  return mutation;
};
