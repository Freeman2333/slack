import { format, isToday, isYesterday } from "date-fns";
import dynamic from "next/dynamic";

import { Hint } from "./hint";
import { Doc, Id } from "../../convex/_generated/dataModel";
import { Thumbnail } from "./thumbnail";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Toolbar } from "./toolbar";
import { cn } from "@/lib/utils";
import { useUpdateMessage } from "@/features/messages/api/use-update-message";
import { useRemoveMessage } from "@/features/messages/api/use-remove-message";
import { useConfirm } from "@/hooks/use-confirm";
import { useToggleReaction } from "@/features/reactions/api/use-toggle-reaction";
import { Reactions } from "./reactions";

const Renderer = dynamic(() => import("@/components/renderer"), { ssr: false });
const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

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
  reactions: Array<
    Omit<Doc<"reactions">, "memberId"> & {
      count: number;
      memberIds: Id<"members">[];
    }
  >;
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
  reactions,
}: MessageProps) => {
  const avatarFallback = userName?.charAt(0).toUpperCase() ?? "U";
  const [ConfirmDialog, confirm] = useConfirm(
    "Delete message?",
    "This will remove the message permanently."
  );

  const { mutateAsync: updateMessage, isPending: isUpdatingMessage } =
    useUpdateMessage();
  const { mutateAsync: removeMessage, isPending: isRemovingMessage } =
    useRemoveMessage();
  const { mutateAsync: toggleReaction, isPending: isTogglingReaction } =
    useToggleReaction();

  const isPending =
    isUpdatingMessage || isRemovingMessage || isTogglingReaction;

  const handleSubmit = async ({ body }: { body: string }) => {
    await updateMessage({
      id,
      body,
    });

    setEditingId(null);
  };

  const handleRemove = async () => {
    const ok = await confirm();

    if (!ok) return;

    await removeMessage({ id });
  };

  const handleReaction = async (reaction: string) => {
    await toggleReaction({
      messageId: id,
      value: reaction,
    });
  };

  if (isCompact)
    return (
      <>
        <ConfirmDialog />
        <div
          className={cn(
            "relative p-1.5 px-5 flex items-start group hover:bg-gray-100/60 gap-2",
            isEditing && "bg-[#F2C74433] hover:bg-[#F2C74433]",
            isRemovingMessage &&
              "bg-rose-500/50 transform transition-all scale-y-0 origin-bottom duration-200"
          )}
        >
          <Hint label={formatFullTime(createdAt)}>
            <button className="opacity-0 group-hover:opacity-100 text-muted-foreground text-xs w-[40px] leading-[22px] text-center hover:underline">
              {format(new Date(createdAt), "HH:mm")}
            </button>
          </Hint>
          {isEditing ? (
            <div className="w-full h-full flex-1">
              <Editor
                onSubmit={handleSubmit}
                disabled={isUpdatingMessage || isRemovingMessage}
                defaultValue={JSON.parse(body)}
                onCancel={() => setEditingId(null)}
                variant="update"
              />
            </div>
          ) : (
            <div className="flex flex-col">
              <Renderer body={body} />
              {messageImage && <Thumbnail imageUrl={messageImage} />}
              {updatedAt && (
                <span className="text-muted-foreground text-xs">(edited)</span>
              )}
              <Reactions data={reactions} onReaction={handleReaction} />
            </div>
          )}
          {!isEditing && (
            <Toolbar
              isAuthor={isAuthor}
              isPending={isPending}
              hideThreadButton={false}
              onEdit={() => setEditingId(id)}
              onThread={() => null}
              onDelete={handleRemove}
              onReaction={handleReaction}
            />
          )}
        </div>
      </>
    );
  return (
    <div
      className={cn(
        "relative group p-1.5 px-5 hover:bg-gray-100/60 flex items-start gap-2 text-sm",
        isEditing && "bg-[#F2C74433] hover:bg-[#F2C74433]",
        isRemovingMessage &&
          "bg-rose-500/50 transform transition-all scale-y-0 origin-bottom duration-200"
      )}
    >
      <ConfirmDialog />
      <button>
        <Avatar>
          <AvatarImage src={userImage} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
      </button>
      <div className="flex flex-col w-full">
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
        {isEditing ? (
          <div className="w-full flex-1 my-2">
            <Editor
              onSubmit={handleSubmit}
              disabled={isUpdatingMessage || isRemovingMessage}
              defaultValue={JSON.parse(body)}
              onCancel={() => setEditingId(null)}
              variant="update"
            />
          </div>
        ) : (
          <Renderer body={body} />
        )}
        {messageImage && !isEditing && <Thumbnail imageUrl={messageImage} />}
        {updatedAt
          ? !isEditing && (
              <span className="text-xs text-muted-foreground">(edited)</span>
            )
          : null}
        <Reactions data={reactions} onReaction={handleReaction} />
      </div>
      {!isEditing && (
        <Toolbar
          isAuthor={isAuthor}
          isPending={isPending}
          hideThreadButton={false}
          onEdit={() => setEditingId(id)}
          onThread={() => null}
          onDelete={handleRemove}
          onReaction={handleReaction}
        />
      )}
    </div>
  );
};
