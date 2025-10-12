import { Doc } from "../../../convex/_generated/dataModel";

export type MemberWithUser = Doc<"members"> & {
  user: Doc<"users">;
};
