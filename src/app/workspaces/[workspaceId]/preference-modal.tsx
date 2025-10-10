import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";
import { TrashIcon } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { workspaceSchema } from "@/features/workspaces/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useUpdateWorkspace } from "@/features/workspaces/api/use-update-workspace";
import { useDeleteWorkspace } from "@/features/workspaces/api/use-delete-workspace";

interface PreferenceModalProps {
  workspaceName: string;
  isOpen: boolean;
  setPreferenceModalIsOpen: (isOpen: boolean) => void;
}

export const PreferenceModal = ({
  workspaceName,
  isOpen,
  setPreferenceModalIsOpen,
}: PreferenceModalProps) => {
  const router = useRouter();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "This action is irreversible"
  );

  const workspaceId = useWorkspaceId();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { mutateAsync: updateWorkspace, isPending } = useUpdateWorkspace();
  const { mutateAsync: deleteWorkspace } = useDeleteWorkspace();

  const form = useForm<z.infer<typeof workspaceSchema>>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: workspaceName,
    },
  });

  const onSubmit = async (values: z.infer<typeof workspaceSchema>) => {
    await updateWorkspace({
      id: workspaceId,
      name: values.name,
    });

    setIsEditModalOpen(false);
  };

  const handleDeleteWorkspace = async () => {
    const ok = await confirm();

    if (!ok) return;

    deleteWorkspace({ id: workspaceId });
    router.replace("/workspaces");
    setPreferenceModalIsOpen(false);
  };

  return (
    <>
      <ConfirmDialog />
      <Dialog open={isOpen} onOpenChange={setPreferenceModalIsOpen}>
        <DialogContent className="bg-gray-50 p-0">
          <DialogHeader className="border-b p-4 w-full bg-white ">
            <DialogTitle>{workspaceName}</DialogTitle>
          </DialogHeader>
          <div className="px-4 pb-4 flex flex-col gap-3">
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
              <DialogTrigger asChild>
                <div className="flex justify-between border bg-white rounded-lg p-4 cursor-pointer hover:bg-gray-50 items-start">
                  <div className="flex flex-col ">
                    <p className="text-sm font-bold">Workspace name</p>
                    <p className="text-xs">{workspaceName}</p>
                  </div>
                  <p className="font-semibold text-sm hover:underline text-link">
                    Edit
                  </p>
                </div>
              </DialogTrigger>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle>Rename this workspace</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col space-y-4"
                  >
                    <FormField
                      name="name"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} placeholder="Workspace name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <DialogFooter className="self-end">
                      <DialogClose asChild>
                        <Button
                          variant="outline"
                          className="mr-2"
                          disabled={false}
                        >
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button type="submit" disabled={isPending}>
                        Save
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
            <button
              onClick={() => handleDeleteWorkspace()}
              className="text-rose-600 rounded-lg py-2 px-4 bg-white border text-start text-sm font-semibold flex gap-x-2
          hover:bg-gray-50 items-center justify-start w-full
          focus-visible:outline-none focus-visible:ring-0 focus:outline-none focus:ring-0
        "
            >
              <TrashIcon className="size-4" />
              Delete workspace
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
