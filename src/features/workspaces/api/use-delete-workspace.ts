import { useMutation } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";

export const useDeleteWorkspace = () => {
  const mutation = useMutation({
    mutationFn: useConvexMutation(api.workspaces.remove),
    onSuccess: () => {
      toast.success("Workspace deleted.");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete workspace.");
    },
  });
  return mutation;
};
