import { useMutation } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";

export const useUpdateWorkspace = () => {
  const mutation = useMutation({
    mutationFn: useConvexMutation(api.workspaces.update),
    onSuccess: () => {
      toast.success("Workspace updated.");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update workspace.");
    },
  });
  return mutation;
};
