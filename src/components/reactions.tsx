import { Id, Doc } from "../../convex/_generated/dataModel";
import { EmojiPopover } from "./emoji-popover";
import { Hint } from "./hint";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useCurrentMember } from "@/features/members/api/use-current-member";
import { cn } from "@/lib/utils";
import { MdOutlineAddReaction } from "react-icons/md";

interface ReactionsProps {
  data: Array<
    Omit<Doc<"reactions">, "memberId"> & {
      count: number;
      memberIds: Id<"members">[];
    }
  >;
  onReaction: (value: string) => void;
}

export const Reactions = ({ data, onReaction }: ReactionsProps) => {
  const workspaceId = useWorkspaceId();
  const { member } = useCurrentMember(workspaceId);

  if (data.length === 0 || !member?._id) {
    return null;
  }

  return (
    <div className="flex gap-1 my-2">
      {data.map((reaction) => (
        <Hint
          key={reaction._id}
          label={`${reaction.count} ${reaction.count > 1 ? "people" : "person"} reacted`}
        >
          <button
            onClick={() => onReaction(reaction.value)}
            className={cn(
              "h-6 px-2 rounded-full bg-slate-200/70 border border-transparent text-slate-800 flex items-center gap-x-1",
              member &&
                reaction.memberIds.includes(member?._id) &&
                "bg-blue-100/70 border-blue-500 text-blue-500"
            )}
          >
            <span>{reaction.value}</span>
            <span
              className={cn(
                "text-xs text-muted-foreground font-semibold",
                member &&
                  reaction.memberIds.includes(member?._id) &&
                  "text-blue-500"
              )}
            >
              {reaction.count}
            </span>
          </button>
        </Hint>
      ))}
      <EmojiPopover
        onEmojiSelect={(emoji) => {
          onReaction(emoji.native);
        }}
        hint="Add Reaction"
      >
        <button className="h-7 px-3 rounded-full bg-slate-200/70 border border-transparent text-slate-800 hover:border-slate-500 flex items-center gap-x-1">
          <MdOutlineAddReaction />
        </button>
      </EmojiPopover>
    </div>
  );
};
