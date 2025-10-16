import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { IconType } from "react-icons/lib";

interface SidebarItemProps {
  label: string;
  icon: LucideIcon | IconType;
  id: string;
  variant?: VariantProps<typeof sidebarItemVariants>["variant"];
}

const sidebarItemVariants = cva(
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

export const SidebarItem = ({
  label,
  icon: Icon,
  variant,
  id,
}: SidebarItemProps) => {
  const workspaceId = useWorkspaceId();

  return (
    <Button
      className={cn(sidebarItemVariants({ variant }))}
      variant="transparent"
    >
      <Link
        href={`/workspaces/${workspaceId}/channels/${id}`}
        className="flex gap-2 items-center w-full"
      >
        <Icon className="size-3.5" />
        <span className="truncate">{label}</span>
      </Link>
    </Button>
  );
};
