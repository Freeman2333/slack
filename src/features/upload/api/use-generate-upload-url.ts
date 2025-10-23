import { useMutation } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";

export const useGenerateUploadUrl = () => {
  const mutation = useMutation({
    mutationFn: useConvexMutation(api.upload.generateUploadUrl),
    onError: (error) => {
      toast.error(error.message || "Failed to generate upload URL.");
    },
  });
  return mutation;
};
