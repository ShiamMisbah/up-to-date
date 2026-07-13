import { LoginResponse } from "@/app/services/auth.services";
import { createReaction } from "@/app/services/reaction.service";
import { ReactionType } from "@/lib/types";
import { useState } from "react";

export const useCreateReaction = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleReaction = async (data: ReactionType, parentId: string) => {
    const userData: LoginResponse = JSON.parse(
      localStorage.getItem("userData")!,
    );
    setLoading(true);
    setError("");
    try {
      const response = await createReaction(
        {
          reaction: data,
          userId: userData.id,
          userName: userData.firstName,
        },
        parentId,
      );
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
    error, loading, handleReaction
  }
};
