import { useMutation } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";

export const useCreateWorkspace = () => {
  const mutation = useMutation({
    mutationFn: useConvexMutation(api.workspaces.create),
    onSuccess: () => {
      toast.success("Workspace created.");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create workspace.");
    },
  });
  return mutation;
};
