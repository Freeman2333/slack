import { useMutation } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";

export const useUpdateMessage = () => {
  const mutation = useMutation({
    mutationFn: useConvexMutation(api.messages.update),
    onError: (error) => {
      toast.error(error.message || "Failed to update message.");
    },
  });
  return mutation;
};
