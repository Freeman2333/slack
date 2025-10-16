import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import WorkspaceHeader from "./workspace-header";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import {
  AlertTriangle,
  HashIcon,
  Loader,
  MessageSquareText,
  SendHorizonal,
} from "lucide-react";
import { useCurrentMember } from "@/features/members/api/use-current-member";
import { SidebarItem } from "./sidebar-item";
import { WorkspaceSection } from "./workspace-section";
import { useGetChannels } from "@/features/channels/api/use-get-channels";
import { Channel } from "@/features/channels/types";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { MemberWithUser } from "@/features/members/types";
import { UserItem } from "./user-item";
import { useCreateChannelModal } from "@/features/channels/store/use-create-channel-modal";
import { useChannelId } from "@/features/channels/hooks/use-workspace-id";

export const WorkspaceSidebar = () => {
  const workspaceId = useWorkspaceId();
  const channelId = useChannelId();

  const { isLoading: isLoadingMember, member } = useCurrentMember(workspaceId);
  const { isLoading: isLoadingWorkspace, workspace } = useGetWorkspace({
    id: workspaceId,
  });
  const { isLoading: isLoadingChannels, channels } = useGetChannels({
    id: workspaceId,
  });
  const { isLoading: isLoadingMembers, members } = useGetMembers({
    id: workspaceId,
  });

  const [_isOpen, setIsChannelModalOpen] = useCreateChannelModal();

  if (
    isLoadingMember ||
    isLoadingWorkspace ||
    isLoadingChannels ||
    isLoadingMembers
  ) {
    return (
      <div className="h-full flex justify-center items-center text-white">
        <Loader className="size-5 animate-spin" />
      </div>
    );
  }

  if (!workspace || !member) {
    return (
      <div className="h-full flex flex-col justify-center items-center text-white">
        <AlertTriangle className="size-5 text-white" />
        <p className="text-white text-sm">Workspace not found</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col text-white py-1 px-3">
      <WorkspaceHeader workspace={workspace} />
      <div className="flex flex-col my-3">
        <SidebarItem label="Threads" icon={MessageSquareText} id="threads" />
        <SidebarItem label="Drafts & Sent" icon={SendHorizonal} id="drafts" />
      </div>
      <WorkspaceSection
        label="Channels"
        hint="New channel"
        onNew={
          member.role === "admin"
            ? () => setIsChannelModalOpen(true)
            : undefined
        }
      >
        {channels?.map((item: Channel) => (
          <SidebarItem
            key={item._id}
            label={item.name}
            id={item._id}
            icon={HashIcon}
            variant={item._id === channelId ? "active" : "default"}
          />
        ))}
      </WorkspaceSection>
      <WorkspaceSection label="Direct Messages">
        {members?.map((member: MemberWithUser) => (
          <UserItem
            key={member._id}
            name={member.user.name!}
            id={member._id}
            image={member.user.image}
          />
        ))}
      </WorkspaceSection>
    </div>
  );
};
