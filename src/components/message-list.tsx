import { useState } from "react";
import { isToday, isYesterday, format, differenceInMinutes } from "date-fns";

import { api } from "../../convex/_generated/api";
import { Message } from "./message";
import { ChannelHero } from "./channel-hero";
import { Id } from "../../convex/_generated/dataModel";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useCurrentMember } from "@/features/members/api/use-current-member";

interface MessageListProps {
  memberName?: string;
  memberImage?: string;
  channelName?: string;
  channelCreationTime?: number;
  variant?: "channel" | "thread" | "conversation";
  data?: (typeof api.messages.get._returnType)["page"];
  canLoadMore: boolean;
  isLoadingMore: boolean;
  loadMore: () => void;
}

const TIME_THRESHOLD = 5;

const formatDateLabel = (dateStr: string) => {
  const date = new Date(dateStr);

  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";

  return format(date, "EEEE, MMMM d");
};

export const MessageList = ({
  canLoadMore,
  isLoadingMore,
  channelCreationTime,
  channelName,
  data,
  memberImage,
  memberName,
  variant = "channel",
  loadMore,
}: MessageListProps) => {
  const workspaceId = useWorkspaceId();

  const { member } = useCurrentMember(workspaceId);

  const [editingId, setEditingId] = useState<Id<"messages"> | null>(null);

  const groupedMessages = data?.reduce(
    (groups, message) => {
      const date = new Date(message._creationTime);
      const dateKey = format(date, "yyyy-MM-dd");

      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].unshift(message);
      return groups;
    },
    {} as Record<string, typeof data>
  );

  return (
    <div className="flex-1 flex flex-col-reverse pb-4 overflow-y-auto messages-scrollbar">
      {Object.entries(groupedMessages || {}).map(([dateKey, messages]) => (
        <div key={dateKey}>
          <div className="text-center my-2 relative">
            <hr className="absolute top-1/2 left-0 right-0 border-t border-gray-300" />
            <span className="relative bg-white px-4 py-1 border border-gray-300 rounded-full text-xs shadow-sm font-medium">
              {formatDateLabel(dateKey)}
            </span>
          </div>
          {messages.map((message, index) => {
            const prevMessage = messages[index - 1];

            const isCompact =
              prevMessage &&
              prevMessage.user?._id === message.user?._id &&
              differenceInMinutes(
                new Date(message._creationTime),
                new Date(prevMessage._creationTime)
              ) < TIME_THRESHOLD;

            return (
              <Message
                id={message._id}
                key={message._id}
                body={message.body}
                createdAt={message._creationTime}
                updatedAt={message.updatedAt}
                messageImage={message.image}
                userImage={message.user.image}
                userName={message.user.name!}
                isCompact={isCompact}
                isAuthor={message.memberId === member?._id}
                isEditing={editingId === message._id}
                setEditingId={setEditingId}
                reactions={message.reactions}
              />
            );
          })}
        </div>
      ))}
      {variant === "channel" && channelName && channelCreationTime && (
        <ChannelHero name={channelName} creationTime={channelCreationTime} />
      )}
    </div>
  );
};
