"use client";

import { useGetChannel } from "@/features/channels/api/use-get-channel";
import { ChannelHeader } from "./header";
import { useChannelId } from "@/features/channels/hooks/use-workspace-id";
import { Loader } from "lucide-react";

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
    <div>
      <ChannelHeader channelName={channel?.name} />
    </div>
  );
};

export default ChannelPage;
