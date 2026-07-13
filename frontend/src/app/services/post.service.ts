import { fetcher } from "@/lib/fetcher";
import { Post, PrivacyStatus } from "@/lib/types";
import { createPostSchema } from "@/schema/post.schema";
import { LoginResponse } from "./auth.services";

export interface createPostresponse {
  sucess: boolean;
  message: string;
}

export interface createPostPayloadSchema {
  mainText: string;
  userId: string;
  userName: string;
  privacyStatus: PrivacyStatus;
}

export interface createCommentPayloadSchema {
  mainText: string;
  userId: string;
  userName: string;
}

export interface getPostsResponse {
  posts: Post[];
  page: number;
  totalPages: number;
  total: number;
}

export interface getCommentsResponse {
  comments: Post[];
  page: number;
  totalPages: number;
  total: number;
}

export const createPost = (data: FormData) => {
  return fetcher<createPostresponse>("/content/", {
    method: "POST",
    body: data,
  });
};

export const getPost = (page: number, limit = 20) => {
  return fetcher<getPostsResponse>(`/content?page=${page}&limit=${limit}`);
};

export const createComment = (
  data: createCommentPayloadSchema,
  parentId: string,
) => {
  return fetcher<createPostresponse>(`/content/comment/${parentId}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getComment = (page: number, limit = 20, parentId: string) => {
  return fetcher<getCommentsResponse>(
    `/content/comment/${parentId}?page=${page}&limit=${limit}`,
  );
};

export const createReply = (
  data: createCommentPayloadSchema,
  parentId: string,
  commentId: String,
) => {
  return fetcher<createPostresponse>(
    `/content/comment/${parentId}/replies/${commentId}`,
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );
};

export const getReply = (page: number, limit = 20, parentId: string, commentId: string) => {
  return fetcher<getCommentsResponse>(
    `/content/comment/${parentId}/replies/${commentId}?page=${page}&limit=${limit}`,
  );
};