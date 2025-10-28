import { format, isToday, isYesterday } from "date-fns";
import dynamic from "next/dynamic";

import { Hint } from "./hint";
import { Doc, Id } from "../../convex/_generated/dataModel";
import { Thumbnail } from "./thumbnail";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Toolbar } from "./toolbar";

const Renderer = dynamic(() => import("@/components/renderer"), { ssr: false });

interface MessageProps {
  id: Id<"messages">;
  isCompact?: boolean;
  isEditing?: boolean;
  isAuthor: boolean;
  setEditingId: (id: Id<"messages"> | null) => void;
  body: Doc<"messages">["body"];
  createdAt: Doc<"messages">["_creationTime"];
  updatedAt: Doc<"messages">["updatedAt"];
  messageImage?: string | null;
  userName: string;
  userImage?: string;
}

const formatFullTime = (date: number) => {
  const dateObj = new Date(date);
  if (isToday(dateObj)) return "Today";
  else if (isYesterday(dateObj)) return "Yesterday";
  return format(dateObj, "PPP 'at' pppp");
};

export const Message = ({
  id,
  isCompact,
  body,
  createdAt,
  updatedAt,
  messageImage,
  userImage,
  userName,
  setEditingId,
  isEditing,
  isAuthor,
}: MessageProps) => {
  const avatarFallback = userName?.charAt(0).toUpperCase() ?? "U";

  if (isCompact)
    return (
      <div className="p-1.5 px-5 flex items-start group hover:bg-gray-100/60 gap-2">
        <Hint label={formatFullTime(createdAt)}>
          <button className="opacity-0 group-hover:opacity-100 text-muted-foreground text-xs w-[40px] leading-[22px] text-center hover:underline">
            {format(new Date(createdAt), "HH:mm")}
          </button>
        </Hint>
        <div className="flex flex-col">
          <Renderer body={body} />
          {messageImage && <Thumbnail imageUrl={messageImage} />}
          {updatedAt && (
            <span className="text-muted-foreground text-xs">(edited)</span>
          )}
        </div>
      </div>
    );
  return (
    <div className="relative group p-1.5 px-5 hover:bg-gray-100/60 flex items-start gap-2 text-sm">
      <button>
        <Avatar>
          <AvatarImage src={userImage} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
      </button>
      <div className="flex flex-col">
        <div className="flex gap-2 text-sm">
          <button
            onClick={() => null}
            className="font-bold hover:underline  text-primary"
          >
            {userName}
          </button>
          <Hint label={formatFullTime(createdAt)}>
            <button className="text-muted-foreground text-xs text-center hover:underline">
              {format(new Date(createdAt), "h:mm a")}
            </button>
          </Hint>
        </div>
        <Renderer body={body} />
        {messageImage && <Thumbnail imageUrl={messageImage} />}
        {updatedAt ? (
          <span className="text-xs text-muted-foreground">(edited)</span>
        ) : null}
      </div>
      {!isEditing && (
        <Toolbar
          isAuthor={isAuthor}
          isPending={false}
          hideThreadButton={false}
          onEdit={() => setEditingId(id)}
          onThread={() => null}
          onDelete={() => null}
          onReaction={() => null}
        />
      )}
    </div>
  );
};
