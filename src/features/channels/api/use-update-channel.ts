import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import { api } from "../../../../convex/_generated/api";

export const useUpdateChannel = () => {
  const mutation = useMutation({
    mutationFn: useConvexMutation(api.channels.update),
    onSuccess: () => {
      toast.success("Channel updated.");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update channel.");
    },
  });
  return mutation;
};
