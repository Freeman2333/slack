"use client";

import { useEffect, useState } from "react";
import z from "zod";
import { ChevronDown, TrashIcon } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { channelSchema } from "@/features/channels/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateChannel } from "@/features/channels/api/use-update-channel";
import { useChannelId } from "@/features/channels/hooks/use-workspace-id";
import { useConfirm } from "@/hooks/use-confirm";
import { useRouter } from "next/navigation";
import { useDeleteChannel } from "@/features/channels/api/use-delete-channel";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

interface ChannelHeaderProps {
  channelName?: string;
}

export const ChannelHeader = ({ channelName }: ChannelHeaderProps) => {
  const router = useRouter();
  const channelId = useChannelId();
  const workspaceId = useWorkspaceId();

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "This action is irreversible"
  );

  const [isEditChannelNameOpen, setIsEditChannelNameOpen] = useState(false);

  const { mutateAsync: updateChannel, isPending } = useUpdateChannel();
  const { mutateAsync: deleteChannel } = useDeleteChannel();

  const form = useForm<z.infer<typeof channelSchema>>({
    resolver: zodResolver(channelSchema),
    defaultValues: {
      name: channelName,
    },
  });

  const onSubmit = async (values: z.infer<typeof channelSchema>) => {
    await updateChannel({ ...values, channelId });
    setIsEditChannelNameOpen(false);
    form.reset();
  };

  const handleDeleteChannel = async () => {
    const ok = await confirm();

    if (!ok) return;

    deleteChannel({ id: channelId });
    router.replace(`/workspaces/${workspaceId}`);
  };

  useEffect(() => {
    form.reset({ name: channelName });
  }, [channelName, form]);

  return (
    <div className="px-4 py-2 border-b">
      <ConfirmDialog />
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" className="font-bold text-lg">
            <span># {channelName}</span>
            <ChevronDown className="size-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-gray-50 p-0">
          <DialogHeader className="border-b p-4 w-full bg-white rounded-md">
            <DialogTitle># {channelName}</DialogTitle>
          </DialogHeader>
          <div className="px-4 pb-4 flex flex-col gap-3">
            <Dialog
              open={isEditChannelNameOpen}
              onOpenChange={setIsEditChannelNameOpen}
            >
              <DialogTrigger asChild>
                <div className="flex justify-between border bg-white rounded-lg p-4 cursor-pointer hover:bg-gray-50 items-start">
                  <div className="flex flex-col ">
                    <p className="text-sm font-bold">Channel name</p>
                    <p className="text-xs"># {channelName}</p>
                  </div>
                  <p className="font-semibold text-sm hover:underline text-link">
                    Edit
                  </p>
                </div>
              </DialogTrigger>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle>Rename this channel</DialogTitle>
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
                            <Input {...field} placeholder="Channel name" />
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
                          onClick={() => form.reset()}
                          disabled={isPending}
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
              onClick={() => handleDeleteChannel()}
              className="text-rose-600 rounded-lg py-2 px-4 bg-white border text-start text-sm font-semibold flex gap-x-2
          hover:bg-gray-50 items-center justify-start w-full
          focus-visible:outline-none focus-visible:ring-0 focus:outline-none focus:ring-0
        "
            >
              <TrashIcon className="size-4" />
              Delete channel
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
