import { fetcher } from "@/lib/fetcher";
import { PrivacyStatus } from "@/lib/types";
import { createPostSchema } from "@/schema/post.schema";
import { LoginResponse } from "./auth.services";

export interface createPostresponse {
    sucess: boolean,
    message: string;
}

export interface createPostPayloadSchema {
    mainText: string,
    userId: string,
    userName: string,
    privacyStatus: PrivacyStatus
}

export const createPost = (data: createPostPayloadSchema) => {
  return fetcher<createPostresponse>("/content/", {
    method: "POST",
    body: JSON.stringify(data),
  });
};