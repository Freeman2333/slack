"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader, TriangleAlert } from "lucide-react";

import { useGetChannels } from "@/features/channels/api/use-get-channels";
import { useCreateChannelModal } from "@/features/channels/store/use-create-channel-modal";
import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

const WorkspaceIdPage = () => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();

  const { isLoading, workspace } = useGetWorkspace({ id: workspaceId });
  const { isLoading: isLoadingChannels, channels } = useGetChannels({
    id: workspaceId,
  });
  const { isLoading: isLoadingMember, member } = useCurrentMember(workspaceId);

  const [_isOpen, setIsChannelModalOpen] = useCreateChannelModal();

  const isAdmin = member?.role === "admin";
  const isAnyLoading = isLoading || isLoadingChannels || isLoadingMember;

  const channelId = channels?.[0]?._id;

  useEffect(() => {
    if (channelId) {
      router.replace(`/workspaces/${workspaceId}/channels/${channelId}`);
    }
    if (!channelId && isAdmin) {
      setIsChannelModalOpen(true);
    }
  }, [channelId, isAdmin, router, setIsChannelModalOpen, workspaceId]);

  if (isAnyLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!workspace) {
    return (
      <div className="flex flex-col items-center gap-2">
        <TriangleAlert className="size-6 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          No workspace found
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <TriangleAlert className="size-6 text-muted-foreground" />
      <span className="text-sm text-muted-foreground">No channel found</span>
    </div>
  );
};

export default WorkspaceIdPage;
