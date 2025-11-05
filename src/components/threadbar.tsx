import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ChevronRight } from "lucide-react";

interface ThreadbarProps {
  onClick?: () => void;
  authorName?: string;
  authorImage?: string;
  threadCount?: number;
  threadTimestamp?: number;
}

const Threadbar = ({
  onClick,
  authorName,
  authorImage,
  threadCount,
  threadTimestamp,
}: ThreadbarProps) => {
  if (!threadCount || threadCount === 0) {
    return null;
  }

  return (
    <button
      onClick={onClick}
      className="flex items-center p-1 mt-1 gap-2 group/thread-bar max-w-[600px] hover:bg-white rounded-sm border border-transparent hover:border-border transition w-full"
    >
      <Avatar className="size-6 rounded-sm ">
        <AvatarImage src={authorImage} alt={authorName} />
        <AvatarFallback className="bg-sky-500 text-white">
          {authorName?.charAt(0).toUpperCase() ?? "U"}
        </AvatarFallback>
      </Avatar>
      <span className="text-xs font-semibold text-link  hover:underline">
        {threadCount} {threadCount === 1 ? "reply" : "replies"}
      </span>
      <span className="text-xs text-muted-foreground group-hover/thread-bar:hidden">
        Last reply {threadTimestamp ? formatDistanceToNow(threadTimestamp) : ""}
      </span>
      <span className="text-xs text-muted-foreground group-hover/thread-bar:block hidden">
        View thread
      </span>
      <ChevronRight className="ml-auto size-4 text-muted-foreground group-hover/thread-bar:block hidden" />
    </button>
  );
};

export default Threadbar;
