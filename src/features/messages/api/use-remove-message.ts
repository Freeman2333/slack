import { useMutation } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";

export const useRemoveMessage = () => {
  const mutation = useMutation({
    mutationFn: useConvexMutation(api.messages.remove),
    onSuccess: () => {
      toast.success("Message removed.");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to remove message.");
    },
  });
  return mutation;
};
