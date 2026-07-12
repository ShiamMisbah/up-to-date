"use client"

import { getPost } from "@/app/services/post.service";
import { Post } from "@/lib/types";
import { useEffect, useState } from "react";

export const useGetPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGetPost = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getPost(page);
      if (page === 1) {
        setPosts(res.posts);
      } else {
        setPosts((prev) => [...prev, ...res.posts]);
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
    handleGetPost()
  }, [page])

  return {posts, loading, error, setPage}
};
