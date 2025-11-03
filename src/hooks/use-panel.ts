import { useParentMessageId } from "@/features/messages/store/use-parent-messageId";
import { Id } from "../../convex/_generated/dataModel";

export const usePanel = () => {
  const [parentMessageId, setParentMessageId] = useParentMessageId();

  const openMessage = (id: Id<"messages">) => {
    setParentMessageId(id);
  };

  const closeMessage = () => {
    setParentMessageId(null);
  };

  return {
    parentMessageId: parentMessageId as Id<"messages"> | undefined,
    openMessage,
    closeMessage,
  };
};
