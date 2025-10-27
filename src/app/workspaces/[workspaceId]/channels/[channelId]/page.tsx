"use client";

import { useGetChannel } from "@/features/channels/api/use-get-channel";
import { ChannelHeader } from "./header";
import { useChannelId } from "@/features/channels/hooks/use-workspace-id";
import { Loader } from "lucide-react";
import { ChatInput } from "./chat-input";
import { useGetMessages } from "@/features/messages/api/use-get-messages";
import { MessageList } from "@/components/message-list";

const ChannelPage = () => {
  const channelId = useChannelId();

  const { channel, isLoading } = useGetChannel({ channelId });
  const {
    results: messages,
    status,
    loadMore: loadMoreMessages,
  } = useGetMessages({ channelId });

  if (isLoading || status === "LoadingFirstPage")
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );

  return (
    <div className="flex flex-col h-full">
      <ChannelHeader channelName={channel?.name} />
      <MessageList
        channelName={channel?.name}
        channelCreationTime={channel?._creationTime}
        data={messages}
        loadMore={loadMoreMessages}
        isLoadingMore={status === "LoadingMore"}
        canLoadMore={status === "CanLoadMore"}
      />
      <ChatInput placeholder={`Message # ${channel?.name}`} />
    </div>
  );
};

export default ChannelPage;
