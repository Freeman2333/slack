import { useState } from "react";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Settings, SquarePen } from "lucide-react";
import { PreferenceModal } from "./preference-modal";

interface WorkspaceHeaderProps {
  name: string;
}

const WorkspaceHeader = ({ name }: WorkspaceHeaderProps) => {
  const [preferenceModalIsOpen, setPreferenceModalIsOpen] = useState(false);

  return (
    <>
      <PreferenceModal
        workspaceName={name}
        isOpen={preferenceModalIsOpen}
        setPreferenceModalIsOpen={setPreferenceModalIsOpen}
      />
      <div className="flex items-center">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button className="font-bold text-lg" variant="transparent">
              {name}
              <ChevronDown className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="start" className="w-60">
            <DropdownMenuItem className="cursor-pointer flex justify-start items-start capitalize">
              <div className="size-9 bg-[#616061] text-white rounded-md flex items-center justify-center text-lg font-bold">
                {name?.charAt(0)?.toUpperCase() ?? "W"}
              </div>
              <div className="flex flex-col justify-start items-start">
                <span className="font-bold">{name}</span>
                <span className="text-xs text-muted-foreground">
                  Active workspace
                </span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer flex-col justify-start items-start">
              Invite people to {name}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer flex-col justify-start items-start"
              onClick={() => setPreferenceModalIsOpen(true)}
            >
              Preference
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="ml-auto">
          <Hint>
            <Button variant="transparent" className="h-7" size="iconSm">
              <Settings className="size-5 text-white" />
            </Button>
          </Hint>
          <Hint>
            <Button variant="transparent" className="h-7" size="iconSm">
              <SquarePen className="size-5 text-white" />
            </Button>
          </Hint>
        </div>
      </div>
    </>
  );
};

export default WorkspaceHeader;
