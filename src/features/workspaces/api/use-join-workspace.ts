import { useMutation } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";

export const useJoinWorkspace = () => {
  const mutation = useMutation({
    mutationFn: useConvexMutation(api.workspaces.join),
    onSuccess: () => {
      toast.success("Welcome! You have joined the workspace.");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to join workspace.");
    },
  });
  return mutation;
};
