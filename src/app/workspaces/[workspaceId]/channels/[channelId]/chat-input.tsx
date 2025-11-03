import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import Quill from "quill";
import { useCreateMessage } from "@/features/messages/api/use-create-message";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useChannelId } from "@/features/channels/hooks/use-workspace-id";
import { useGenerateUploadUrl } from "@/features/upload/api/use-generate-upload-url";
import { toast } from "sonner";
import { Id } from "../../../../../../convex/_generated/dataModel";

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

interface ChatInputProps {
  placeholder: string;
  parentMessageId?: Id<"messages">;
}

export const ChatInput = ({ placeholder, parentMessageId }: ChatInputProps) => {
  const editorRef = useRef<Quill | null>(null);
  const workspaceId = useWorkspaceId();
  const channelId = useChannelId();

  const [editorKey, setEditorKey] = useState(0);
  const [isPending, setIsPending] = useState(false);

  const { mutateAsync: createMessage } = useCreateMessage();
  const { mutateAsync: generateUploadUrl } = useGenerateUploadUrl();

  const handleSubmit = async ({
    body,
    image,
  }: {
    body: string;
    image: File | null;
  }) => {
    try {
      setIsPending(true);
      editorRef.current?.enable(false);
      let storageId;

      if (image) {
        const postUrl = await generateUploadUrl({});

        const result = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": image!.type },
          body: image,
        });

        if (!result.ok) {
          toast.error("Failed to upload image.");
        }

        const uploadResult = await result.json();
        storageId = uploadResult.storageId;
      }

      await createMessage({
        body,
        ...((image && { image: storageId }) || {}),
        channelId,
        workspaceId,
        parentMessageId,
      });
    } catch (error) {
      toast.error("Failed to send message.");
    } finally {
      setIsPending(false);
      setEditorKey((prev) => prev + 1);
    }
  };

  return (
    <div className="px-5 w-full">
      <Editor
        key={editorKey}
        placeholder={placeholder}
        onSubmit={handleSubmit}
        disabled={isPending}
        innerRef={editorRef}
      />
    </div>
  );
};
