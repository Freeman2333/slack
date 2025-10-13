import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import { api } from "../../../../convex/_generated/api";

export const useCreateChannel = () => {
  const mutation = useMutation({
    mutationFn: useConvexMutation(api.channels.create),
    onSuccess: () => {
      toast.success("Channel created.");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create channel.");
    },
  });
  return mutation;
};
