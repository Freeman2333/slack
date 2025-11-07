"use client";

import { useMemberId } from "@/features/members/hooks/use-member-id";
import { ConversationHeader } from "./conversation-header";
import { useGetMember } from "@/features/members/api/use-get-member";
import { AlertTriangle, Loader } from "lucide-react";
import { useCreateOrGetConversation } from "@/features/conversations/api/use-create-or-get-coversation";
import { useEffect } from "react";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { ChatInput } from "../../channels/[channelId]/chat-input";
import { useGetMessages } from "@/features/messages/api/use-get-messages";
import { MessageList } from "@/components/message-list";
import { usePanel } from "@/hooks/use-panel";

const MemberPage = () => {
  const memberId = useMemberId();
  const workspaceId = useWorkspaceId();
  const { openProfileMember } = usePanel();

  const { member, isLoading: isMemberLoading } = useGetMember({
    memberId,
  });

  const {
    mutate,
    data: conversationId,
    isPending: isCreatingOrGettingConversation,
  } = useCreateOrGetConversation();

  const {
    results: messages,
    status,
    loadMore: loadMoreMessages,
  } = useGetMessages({ conversationId });

  const onOpenProfile = () => {
    openProfileMember(memberId);
  };

  useEffect(() => {
    mutate({
      memberId,
      workspaceId,
    });
  }, [memberId, workspaceId, mutate]);

  if (
    isMemberLoading ||
    isCreatingOrGettingConversation ||
    status === "LoadingFirstPage"
  )
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );

  if (!member || !conversationId) {
    return (
      <div className="h-full flex flex-col gap-y-2 justify-center items-center text-muted-foreground">
        <AlertTriangle className="size-5 text-muted-foreground" />
        <p className="text-muted-foreground text-sm">Member not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <ConversationHeader
        memberName={member.user.name}
        memberImage={member.user.image}
        onOpenProfile={onOpenProfile}
      />
      <MessageList
        variant="conversation"
        data={messages}
        loadMore={loadMoreMessages}
        isLoadingMore={status === "LoadingMore"}
        canLoadMore={status === "CanLoadMore"}
        memberName={member.user.name}
        memberImage={member.user.image}
      />
      <ChatInput
        placeholder={`Message ${member.user.name}`}
        conversationId={conversationId}
      />
    </div>
  );
};

export default MemberPage;
