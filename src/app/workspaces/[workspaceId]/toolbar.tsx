"use client";

import { useState } from "react";
import { Info, Search } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useGetChannels } from "@/features/channels/api/use-get-channels";
import { useGetMembers } from "@/features/members/api/use-get-members";

const Toolbar = () => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();

  const { workspace } = useGetWorkspace({ id: workspaceId });
  const { channels } = useGetChannels({
    id: workspaceId,
  });
  const { members } = useGetMembers({
    id: workspaceId,
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleChannelSelect = (channelId: string) => {
    router.push(`/workspaces/${workspaceId}/channels/${channelId}`);
    setIsOpen(false);
  };

  const handleMemberSelect = (memberId: string) => {
    router.push(`/workspaces/${workspaceId}/members/${memberId}`);
    setIsOpen(false);
  };

  return (
    <div className="flex bg-brand h-10 p-1.5">
      <div className="flex-1"></div>
      <div className="flex-1 min-w-[280px] max-[642px]">
        <Button
          variant="transparent"
          size="iconSm"
          className="w-full bg-accent/25 h-7 justify-start px-2 hover:bg-accent/25"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Search />
          <span className="text-xs">Search {workspace?.name}</span>
        </Button>
      </div>
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput placeholder="Search for channels and members..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Channels">
            {channels?.map((channel) => (
              <CommandItem
                key={channel._id}
                onSelect={() => handleChannelSelect(channel._id)}
              >
                <span># {channel.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Members">
            {members?.map((member) => (
              <CommandItem
                onSelect={() => handleMemberSelect(member._id)}
                key={member._id}
              >
                {member.user.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
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
