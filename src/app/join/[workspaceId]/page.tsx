"use client";

import { Button } from "@/components/ui/button";
import { useGetWorkspaceInfo } from "@/features/workspaces/api/use-get-workspace-info";
import { useJoinWorkspace } from "@/features/workspaces/api/use-join-workspace";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import VerificationInput from "react-verification-input";

const JoinWorkspacePage = () => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();

  const { mutateAsync: joinWorkspace, isPending } = useJoinWorkspace();
  const { workspaceInfo, isLoading } = useGetWorkspaceInfo({ workspaceId });

  const handleJoin = async (joinCode: string) => {
    await joinWorkspace({ joinCode, workspaceId });
    router.replace(`/workspaces/${workspaceId}`);
  };

  useEffect(() => {
    if (workspaceInfo?.isMember) {
      router.replace(`/workspaces/${workspaceId}`);
    }
  }, [router, workspaceId, workspaceInfo?.isMember]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <Image
        src="/logo.svg"
        alt="Logo"
        width={60}
        height={60}
        className="mb-6"
      />
      <div className="flex flex-col gap-y-2 items-center mb-2">
        <h1 className="text-2xl font-bold">
          Join {workspaceInfo?.workspaceName}
        </h1>
        <p className="text-muted-foreground text-md">
          Enter the workspace code to join
        </p>
      </div>
      <VerificationInput
        length={6}
        onComplete={handleJoin}
        classNames={{
          container: cn(
            "flex gap-x-2 mb-4",
            isPending && "opacity-50 cursor-not-allowed"
          ),
          character:
            "uppercase h-auto rounded-md border border-ray-300 flex items-center justify-center text-lg font-medium text-gray-500",
          characterInactive: "bg-muted",
          characterSelected: "bg-white text-black",
          characterFilled: "bg-white text-black",
        }}
      />
      <Button variant="outline" size="lg" asChild>
        <Link href="/">Home</Link>
      </Button>
    </div>
  );
};

export default JoinWorkspacePage;
