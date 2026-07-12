import { PrivacyStatus } from "@/lib/types";
import z from "zod";

export const createPostSchema = z.object({
  mainText: z.string().min(1, "Posts cannot be empty."),
  privacyStatus: z.enum(PrivacyStatus),
});

export type createPostSchema = z.infer<typeof createPostSchema>;

export const createCommentSchema = z.object({
  mainText: z.string().min(1, "Comments cannot be empty."),
});

export type createCommentSchema = z.infer<typeof createCommentSchema>;