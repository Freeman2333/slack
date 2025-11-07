import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertTriangle, Loader, Mail, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePanel } from "@/hooks/use-panel";
import { useGetMember } from "../api/use-get-member";
import { Separator } from "@/components/ui/separator";

export const Profile = () => {
  const { closeProfileMember, profileMemberId } = usePanel();

  const { member, isLoading: isMemberLoading } = useGetMember({
    memberId: profileMemberId!,
  });

  if (isMemberLoading) {
    return (
      <div className="h-full flex flex-col">
        <div className="flex justify-between h-[49px] px-4 py-2 border-b">
          <p className="text-lg font-bold">Thread</p>
          <Button onClick={closeProfileMember} size="iconSm" variant={"ghost"}>
            <XIcon className="size-5 stroke-[1.5]" />
          </Button>
        </div>
        <div className="flex items-center justify-center h-full">
          <Loader className="size-5 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="h-full flex flex-col">
        <div className="flex justify-between h-[49px] px-4 py-2 border-b">
          <p className="text-lg font-bold">Profile</p>
          <Button onClick={closeProfileMember} size="iconSm" variant={"ghost"}>
            <XIcon className="size-5 stroke-[1.5]" />
          </Button>
        </div>
        <div className="h-full flex flex-col gap-y-2 justify-center items-center text-muted-foreground">
          <AlertTriangle className="size-5 text-muted-foreground" />
          <p className="text-muted-foreground text-sm">Member not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between h-[49px] px-4 py-2 border-b">
        <p className="text-lg font-bold">Thread</p>
        <Button onClick={closeProfileMember} size="iconSm" variant={"ghost"}>
          <XIcon className="size-5 stroke-[1.5]" />
        </Button>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-full flex flex-col items-start justify-center p-3">
          <Avatar className="h-[256px] w-[256px] m-auto mb-6">
            <AvatarImage src={member.user.image} alt={member.user.name} />
            <AvatarFallback className="text-8xl">
              {member.user.name?.charAt(0).toUpperCase() ?? "U"}
            </AvatarFallback>
          </Avatar>
          <p className="text-xl font-bold mt-4">{member.user.name}</p>
        </div>
        <Separator className="w-full" />
      </div>
      <div className="flex flex-col items-start p-3">
        <p className="text-sm font-semibold mb-4">Contact Information</p>
        <div className="flex gap-2 items-center">
          <div className="size-9 rounded-md bg-muted flex items-center justify-center">
            <Mail className="size-4" />
          </div>
          <div className="flex flex-col">
            <p className="text-xs text-muted-foreground font-bold">
              Email Address
            </p>
            <a
              href={`mailto:${member.user.email}`}
              className="text-link text-sm hover:underline "
            >
              {member.user.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
