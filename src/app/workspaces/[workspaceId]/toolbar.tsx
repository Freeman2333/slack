"use client";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { Info, Search } from "lucide-react";

const Toolbar = () => {
  const workspaceId = useWorkspaceId();

  const { isLoading, workspace } = useGetWorkspace({ id: workspaceId });

  return (
    <div className="flex bg-brand h-10 p-1.5">
      <div className="flex-1"></div>
      <div className="flex-1 min-w-[280px] max-[642px]">
        <Button
          variant="transparent"
          size="iconSm"
          className="w-full bg-accent/25 h-7 justify-start px-2"
        >
          <Search />
          <span className="text-xs">Search {workspace?.name}</span>
        </Button>
      </div>
      <div className="flex-1 flex justify-end">
        <Hint>
          <Button variant="transparent" className="h-7" size="iconSm">
            <Info className="size-5 text-white" />
          </Button>
        </Hint>
      </div>
    </div>
  );
};

export default Toolbar;
