"use client";

import { useGetChannel } from "@/features/channels/api/use-get-channel";
import { ChannelHeader } from "./header";
import { useChannelId } from "@/features/channels/hooks/use-workspace-id";
import { Loader } from "lucide-react";
import { ChatInput } from "./chat-input";

const ChannelPage = () => {
  const channelId = useChannelId();

  const { channel, isLoading } = useGetChannel({ channelId });

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );

  return (
    <div className="flex flex-col h-full">
      <ChannelHeader channelName={channel?.name} />
      <div className="flex-1"></div>
      <ChatInput placeholder={`Message # ${channel?.name}`} />
    </div>
  );
};

export default ChannelPage;
