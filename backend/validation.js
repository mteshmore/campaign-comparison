
import { z } from "zod";

export const compareSchema = z.object({
  campaignIds: z
    .array(z.union([z.string().min(1), z.number()]))
    .min(2, { message: "Select at least 2 campaigns." })
    .max(4, { message: "Select no more than 4 campaigns." })
});