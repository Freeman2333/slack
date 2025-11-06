import { useParentMessageId } from "@/features/messages/store/use-parent-messageId";
import { Id } from "../../convex/_generated/dataModel";
import { useProfileMemberId } from "@/features/members/store/use-profile-memder-id";

export const usePanel = () => {
  const [parentMessageId, setParentMessageId] = useParentMessageId();
  const [profileMemberId, setProfileMemberId] = useProfileMemberId();

  const openMessage = (id: Id<"messages">) => {
    setParentMessageId(id);
    setProfileMemberId(null);
  };

  const openProfileMember = (id: Id<"members">) => {
    setProfileMemberId(id);
    setParentMessageId(null);
  };

  const closeProfileMember = () => {
    setProfileMemberId(null);
  };

  const closeMessage = () => {
    setParentMessageId(null);
  };

  return {
    parentMessageId: parentMessageId as Id<"messages"> | undefined,
    profileMemberId: profileMemberId as Id<"members"> | undefined,
    openProfileMember,
    closeProfileMember,
    openMessage,
    closeMessage,
  };
};
