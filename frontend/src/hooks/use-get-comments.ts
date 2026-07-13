"use client"

import { getComment, getPost } from "@/app/services/post.service";
import { Post } from "@/lib/types";
import { useEffect, useState } from "react";

export const useGetComments = (parentId: string) => {
  const [comments, setComments] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGetComment = async (parentId: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await getComment(page, 20, parentId);
      if (page === 1) {
        setComments(res.comments);
      } else {
        setComments((prev) => [...prev, ...res.comments]);
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
    handleGetComment(parentId);
  }, [page, parentId]);

  return { comments, loading, error, setPage };
};
