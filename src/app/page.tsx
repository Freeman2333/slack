"use client";

import { useEffect, useMemo } from "react";

import { UserButton } from "@/features/auth/components/user-button";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useRouter } from "next/navigation";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";

export default function Home() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useCreateWorkspaceModal();

  const { workspaces, isLoading } = useGetWorkspaces();

  const workspaceId = useMemo(() => workspaces?.[0]?._id, [workspaces]);

  useEffect(() => {
    if (isLoading) return;

    if (workspaceId) {
      router.replace(`/workspaces/${workspaceId}`);
      setIsOpen(false);
    } else if (!isOpen) {
      setIsOpen(true);
    }
  }, [isLoading, isOpen, router, setIsOpen, workspaceId]);

  return (
    <div className="flex flex-col gap-4 items-start">
      logged in
      <UserButton />
    </div>
  );
}
