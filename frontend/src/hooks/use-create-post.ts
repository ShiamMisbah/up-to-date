import { LoginResponse } from "@/app/services/auth.services";
import { createComment, createPost } from "@/app/services/post.service";
import { createCommentSchema, createPostSchema } from "@/schema/post.schema";
import { useState } from "react";

export const useCreatePost = () => {
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState("");

        const handleCreatePost = async (data:createPostSchema) => {
            const userData: LoginResponse = JSON.parse(localStorage.getItem("userData")!);
            setLoading(true);
            setError("");

            try {
              const response = await createPost({
                ...data,
                userId: userData.id,
                userName: userData.firstName,
              });
              return response;
            } catch (error) {
              if (error instanceof Error) {
                setError(error.message);
              }

              throw error;
            } finally {
              setLoading(false);
            }
        }

        const handleCreateComment = async (
          data: createCommentSchema,
          parentId: string,
        ) => {
          const userData: LoginResponse = JSON.parse(
            localStorage.getItem("userData")!,
          );
          setLoading(true);
          setError("");

          try {
            const response = await createComment({
              ...data,
              userId: userData.id,
              userName: userData.firstName,
            }, parentId);
            return response;
          } catch (error) {
            if (error instanceof Error) {
              setError(error.message);
            }

            throw error;
          } finally {
            setLoading(false);
          }
        };
        return {
          loading,
          error,
          handleCreatePost,
          handleCreateComment
        };
}