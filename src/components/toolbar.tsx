import { MessageSquareTextIcon, Pencil, Smile, Trash } from "lucide-react";
import { EmojiPopover } from "./emoji-popover";
import { Button } from "./ui/button";
import { Hint } from "./hint";

interface ToolbarProps {
  isAuthor: boolean;
  isPending: boolean;
  hideThreadButton?: boolean;
  onEdit: () => void;
  onThread: () => void;
  onDelete: () => void;
  onReaction: (value: string) => void;
}

export const Toolbar = ({
  onReaction,
  hideThreadButton,
  isPending,
  isAuthor,
}: ToolbarProps) => {
  return (
    <div className="absolute flex top-0 right-5 opacity-0 group-hover:opacity-100 transition-opacity border rounded-md bg-white shadow-sm">
      <EmojiPopover
        hint="Add Reaction"
        onEmojiSelect={(emoji) => onReaction(emoji.native)}
      >
        <Button disabled={false} size="iconSm" variant="ghost">
          <Smile className="size-4" />
        </Button>
      </EmojiPopover>
      {!hideThreadButton && (
        <Hint label="Reply in thread">
          <Button size="iconSm" variant="ghost" disabled={isPending}>
            <MessageSquareTextIcon className="size-4" />
          </Button>
        </Hint>
      )}
      {isAuthor && (
        <Hint label="Edit message">
          <Button size="iconSm" variant="ghost" disabled={isPending}>
            <Pencil className="size-4" />
          </Button>
        </Hint>
      )}
      {isAuthor && (
        <Hint label="Delete message">
          <Button size="iconSm" variant="ghost" disabled={isPending}>
            <Trash className="size-4" />
          </Button>
        </Hint>
      )}
    </div>
  );
};
