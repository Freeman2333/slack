import { isToday, isYesterday, format } from "date-fns";

import { api } from "../../convex/_generated/api";

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

  const formatDateLabel = (dateStr: string) => {
    const date = new Date(dateStr);

    if (isToday(date)) return "Today";
    if (isYesterday(date)) return "Yesterday";

    return format(date, "EEEE, MMMM d");
  };

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
        </div>
      ))}
    </div>
  );
};
