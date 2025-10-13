import { toast } from "sonner";
import { CopyIcon, RefreshCcw } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useResetJoinCode } from "@/features/workspaces/api/use-reset-joincode";

interface PreferenceModalProps {
  workspaceName: string;
  joinCode: string;
  isOpen: boolean;
  setPreferenceModalIsOpen: (isOpen: boolean) => void;
}

export const InviteModal = ({
  workspaceName,
  joinCode,
  isOpen,
  setPreferenceModalIsOpen,
}: PreferenceModalProps) => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "This will deactivate the current invite code and generate a new one"
  );

  const workspaceId = useWorkspaceId();

  const { mutateAsync, isPending } = useResetJoinCode();

  const handleResetJoinCode = async () => {
    const ok = await confirm();

    if (!ok) return;

    mutateAsync({ id: workspaceId });
  };

  const handleCopyInviteCode = () => {
    const fullInviteLink = `${window.location.origin}/workspaces/${workspaceId}/join/${joinCode}`;

    navigator.clipboard.writeText(fullInviteLink).then(() => {
      toast.success("Invite link copied!");
    });
  };

  return (
    <>
      <ConfirmDialog />
      <Dialog open={isOpen} onOpenChange={setPreferenceModalIsOpen}>
        <DialogContent className="bg-white">
          <DialogHeader className="p-4 w-full bg-white ">
            <DialogTitle>Invite people to {workspaceName}</DialogTitle>
            <DialogDescription>
              use the code below to invite people to your workspace
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 flex flex-col gap-3 justify-center items-center">
            <p className="text-4xl uppercase font-bold tracking-widest">
              {joinCode}
            </p>
            <Button variant="ghost" size="sm" onClick={handleCopyInviteCode}>
              Copy link
              <CopyIcon className="size-4" />
            </Button>
          </div>
          <div className="flex justify-between">
            <Button
              onClick={handleResetJoinCode}
              variant="outline"
              disabled={isPending}
            >
              New Code
              <RefreshCcw className="size-4 ml-2" />
            </Button>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
