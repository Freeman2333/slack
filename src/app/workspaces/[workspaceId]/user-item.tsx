import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import Link from "next/link";
import { Id } from "../../../../convex/_generated/dataModel";

interface UserItemProps {
  name: string;
  image?: string;
  id: Id<"members">;
  variant?: VariantProps<typeof userItemVariants>["variant"];
}

const userItemVariants = cva(
  "w-full justify-start h-7 text-sm font-normal px-[18px] overflow-hidden",
  {
    variants: {
      variant: {
        default: "text-sidebarTextColor",
        active: "text-brand bg-white/90 hover:bg-white/90 hover:bg-white/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const UserItem = ({ name, image, variant, id }: UserItemProps) => {
  const workspaceId = useWorkspaceId();

  return (
    <Button className={cn(userItemVariants({ variant }))} variant="transparent">
      <Link
        href={`/workspaces/${workspaceId}/members/${id}`}
        className="flex gap-2 items-center w-full"
      >
        <Avatar className="size-5 rounded-md hover:opacity-75 transition bg-sky-500">
          <AvatarImage src={image} alt={name} />
          <AvatarFallback className="bg-sky-500 text-white">
            {name.charAt(0).toUpperCase() ?? "U"}
          </AvatarFallback>
        </Avatar>
        <span className="truncate">{name}</span>
      </Link>
    </Button>
  );
};
