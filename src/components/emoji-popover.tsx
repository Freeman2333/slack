import { useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "./ui/tooltip";

interface EmojiPopoverProps {
  onEmojiSelect: (emoji: any) => void;
  children: React.ReactNode;
  hint?: string;
}

export const EmojiPopover = ({
  onEmojiSelect,
  children,
  hint = "Emoji",
}: EmojiPopoverProps) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleSelect = (emoji: any) => {
    onEmojiSelect?.(emoji);
    setPopoverOpen(false);
    setTimeout(() => {
      setTooltipOpen(false);
    }, 500);
  };

  return (
    <TooltipProvider>
      <Tooltip
        open={tooltipOpen}
        onOpenChange={setTooltipOpen}
        delayDuration={50}
      >
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>{children}</PopoverTrigger>
          </TooltipTrigger>
          <PopoverContent className="p-0  border-none shadow-none">
            <Picker data={data} onEmojiSelect={handleSelect} />
          </PopoverContent>
        </Popover>
        <TooltipContent className="bg-black text-white border border-white/5">
          <p className="font-medium text-xs">{hint}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
