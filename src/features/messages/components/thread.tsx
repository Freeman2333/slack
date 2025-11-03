import { Button } from "@/components/ui/button";
import { usePanel } from "@/hooks/use-panel";
import { AlertTriangle, Loader, XIcon } from "lucide-react";
import { useGetMessage } from "../api/use-get-message";
import { Id } from "../../../../convex/_generated/dataModel";
import { Message } from "@/components/message";
import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useState } from "react";
import { ChatInput } from "@/app/workspaces/[workspaceId]/channels/[channelId]/chat-input";
import { MessageList } from "@/components/message-list";
import { useGetMessages } from "../api/use-get-messages";

export const Thread = () => {
  const { closeMessage, parentMessageId } = usePanel();
  const workspaceId = useWorkspaceId();

  const { isLoading: isLoadingMessage, message } = useGetMessage({
    messageId: parentMessageId as Id<"messages">,
  });
  const { isLoading: isLoadingMember, member } = useCurrentMember(workspaceId);
  const {
    results: messages,
    status: messagesStatus,
    loadMore: loadMoreMessages,
  } = useGetMessages({
    parentMessageId: parentMessageId as Id<"messages">,
    channelId: message?.channelId,
  });

  const isLoading =
    isLoadingMessage ||
    isLoadingMember ||
    messagesStatus === "LoadingFirstPage";

  const [editingId, setEditingId] = useState<Id<"messages"> | null>(null);

  if (isLoading) {
    return (
      <div className="h-full flex flex-col">
        <div className="flex justify-between h-[49px] px-4 py-2 border-b">
          <p className="text-lg font-bold">Thread</p>
          <Button onClick={closeMessage} size="iconSm" variant={"ghost"}>
            <XIcon className="size-5 stroke-[1.5]" />
          </Button>
        </div>
        <div className="flex items-center justify-center h-full">
          <Loader className="size-5 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (!message) {
    return (
      <div className="h-full flex flex-col">
        <div className="flex justify-between h-[49px] px-4 py-2 border-b">
          <p className="text-lg font-bold">Thread</p>
          <Button onClick={closeMessage} size="iconSm" variant={"ghost"}>
            <XIcon className="size-5 stroke-[1.5]" />
          </Button>
        </div>
        <div className="h-full flex flex-col gap-y-2 justify-center items-center text-muted-foreground">
          <AlertTriangle className="size-5 text-muted-foreground" />
          <p className="text-muted-foreground text-sm">Message not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between h-[49px] px-4 py-2 border-b">
        <p className="text-lg font-bold">Thread</p>
        <Button onClick={closeMessage} size="iconSm" variant={"ghost"}>
          <XIcon className="size-5 stroke-[1.5]" />
        </Button>
      </div>
      <div className="my-4 flex flex-col overflow-y-auto">
        <Message
          id={message._id}
          key={message._id}
          body={message.body}
          createdAt={message._creationTime}
          updatedAt={message.updatedAt}
          messageImage={message.image}
          userImage={message.user.image}
          userName={message.user.name!}
          isAuthor={message.memberId === member?._id}
          hideThreadButton
          isEditing={editingId === message._id}
          setEditingId={setEditingId}
          reactions={message.reactions}
        />
        {!!messages.length && (
          <div className="relative mt-2 mb-4 pl-1">
            <hr className="absolute top-1/2 left-0 right-0 border-gray-300" />
            <span className="bg-white relative p-2 text-xs text-muted-foreground">
              {messages.length} repl{messages.length === 1 ? "y" : "ies"}
            </span>
          </div>
        )}
        <MessageList
          variant="thread"
          data={messages}
          loadMore={loadMoreMessages}
          isLoadingMore={messagesStatus === "LoadingMore"}
          canLoadMore={messagesStatus === "CanLoadMore"}
        />
      </div>
      <ChatInput
        placeholder={`Reply to ${message.user.name}`}
        parentMessageId={parentMessageId}
      />
    </div>
  );
};
