import { useAuthActions } from "@convex-dev/auth/react";

import { useCurrentUser } from "../api/use-current-user";
import { Loader, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const UserButton = () => {
  const { user, isLoading } = useCurrentUser();

  const { signOut } = useAuthActions();

  if (!user) return null;

  const avatarFallback = user.name?.charAt(0).toUpperCase() ?? "U";

  if (isLoading)
    return <Loader className="size-4 animate-spin text-muted-foreground" />;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="size-10 rounded-md hover:opacity-75 transition bg-sky-500">
          <AvatarImage src={user.image} alt={user.name} />
          <AvatarFallback className="bg-sky-500 text-white">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" side="right" className="w-60">
        <DropdownMenuItem onClick={signOut} className="h-10">
          <LogOut className="size-4 mr-2" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
