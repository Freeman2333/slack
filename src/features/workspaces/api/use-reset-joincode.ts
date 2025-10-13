import { useMutation } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";

export const useResetJoinCode = () => {
  const mutation = useMutation({
    mutationFn: useConvexMutation(api.workspaces.resetJoinCode),
    onSuccess: () => {
      toast.success("Invite code reset.");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to reset join code.");
    },
  });
  return mutation;
};
