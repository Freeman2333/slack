/* eslint-disable @next/next/no-img-element */
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";

interface ThumbnailProps {
  imageUrl: string;
}

export const Thumbnail = ({ imageUrl }: ThumbnailProps) => {
  if (!imageUrl) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="max-w-[360px] border rounded-lg my-2 cursor-zoom-in">
          <img
            src={imageUrl}
            alt="Message image"
            className="rounded-md object-cover size-full"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] p-0 border-none">
        <img
          src={imageUrl}
          alt="Thumbnail"
          className="w-full h-full 
          rounded-md object-cover w-full h-full
          "
        />
      </DialogContent>
    </Dialog>
  );
};
