import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import { ReactNode } from "react";
import { FaCaretDown } from "react-icons/fa";
import { useToggle } from "react-use";

interface WorkspaceSectionProps {
  children: ReactNode;
  label?: string;
  hint?: string;
  onNew?: () => void;
}

export const WorkspaceSection = ({
  label,
  children,
  hint,
  onNew,
}: WorkspaceSectionProps) => {
  const [on, toggle] = useToggle(true);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-start group px-3">
        <Button variant="transparent" onClick={toggle} className="p-0.5 size-6">
          <FaCaretDown
            className={cn(
              "size-4 transition-transform text-sidebarTextColor",
              !on && "-rotate-90"
            )}
          />
        </Button>
        <Button
          variant="transparent"
          className="px-1.5 h-[28px] text-sidebarTextColor"
        >
          <span className="truncate">{label}</span>
        </Button>
        {onNew && (
          <Hint label={hint}>
            <Button
              variant="transparent"
              size="iconSm"
              className="p-0.5 size-6 opacity-0 group-hover:opacity-100 ml-auto"
              onClick={onNew}
            >
              <PlusIcon className="size-8 text-sidebarTextColor" />
            </Button>
          </Hint>
        )}
      </div>
      {on && <div className="flex flex-col mt-2 gap-1">{children}</div>}
    </div>
  );
};
