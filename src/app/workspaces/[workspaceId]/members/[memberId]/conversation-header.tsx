import { ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface ConversationHeaderProps {
  memberName?: string;
  memberImage?: string;
  onOpenProfile: () => void;
}

export const ConversationHeader = ({
  memberName,
  memberImage,
  onOpenProfile,
}: ConversationHeaderProps) => {
  return (
    <div className="px-4 py-2 border-b">
      <Button
        onClick={onOpenProfile}
        className="font-bold text-lg flex"
        variant="ghost"
        size="sm"
      >
        <Avatar className="size-6">
          <AvatarImage src={memberImage} alt={memberName} />
          <AvatarFallback className="bg-sky-500 text-white">
            {memberName?.charAt(0).toUpperCase() ?? "U"}
          </AvatarFallback>
        </Avatar>
        <span>{memberName}</span>
        <ChevronDown className="size-5" />
      </Button>
    </div>
  );
};
