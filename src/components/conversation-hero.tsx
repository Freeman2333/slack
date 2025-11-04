import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface ConversationHeroProps {
  memberName?: string;
  memberImage?: string;
}

export const ConversationHero = ({
  memberName,
  memberImage,
}: ConversationHeroProps) => {
  return (
    <div className="mt-[88px] mx-5">
      <div className="flex gap-2 items-center mb-2">
        <Avatar className="size-12 rounded-md hover:opacity-75 transition bg-sky-500">
          <AvatarImage src={memberImage} alt={memberName} />
          <AvatarFallback className="bg-sky-500 text-white">
            {memberName?.charAt(0).toUpperCase() ?? "U"}
          </AvatarFallback>
        </Avatar>
        <p className="text-2xl font-bold"># {memberName}</p>
      </div>

      <p className="text-slate-800 mb-4">
        This conversation is between you and <strong>{memberName}</strong>
      </p>
    </div>
  );
};
