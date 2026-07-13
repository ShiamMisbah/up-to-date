"use client"

import { getComment, getPost, getReply } from "@/app/services/post.service";
import { Post } from "@/lib/types";
import { useEffect, useState } from "react";

export const useGetReplies = (parentId: string, commentId: string) => {
  const [replies, setReplies] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGetReply = async (parentId: string, commentId: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await getReply(page, 20, parentId, commentId);
      if (page === 1) {
        setReplies(res.comments);
      } else {
        setReplies((prev) => [...prev, ...res.comments]);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetReply(parentId, commentId);
  }, [page, parentId, commentId]);

  return { replies, loading, error, setPage };
};
