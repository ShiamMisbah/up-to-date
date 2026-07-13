import { fetcher } from "@/lib/fetcher";
import { ReactionType } from "@/lib/types";

export interface createReactionResponse {
  sucess: boolean;
  message: string;
}

export interface createReactionPayloadSchema {
  reaction: ReactionType;
  userId: string;
  userName: string;
}

export const createReaction = (data: createReactionPayloadSchema, parentId: string) => {
  return fetcher<createReactionResponse>(`/reaction/${parentId}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};
