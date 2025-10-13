import { z } from "zod";

export const channelSchema = z.object({
  name: z.string().min(1, "Channel name is required"),
});
