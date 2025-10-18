import { useMutation } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";

export const useDeleteChannel = () => {
  const mutation = useMutation({
    mutationFn: useConvexMutation(api.channels.remove),
    onSuccess: () => {
      toast.success("Channel deleted.");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete channel.");
    },
  });
  return mutation;
};
