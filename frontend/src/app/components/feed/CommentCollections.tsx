import { useGetComments } from "@/hooks/use-get-comments";
import React from "react";
import CommentCard from "./CommentCard";
import ErrorPage from "../ErrorPage";
import LoadingPage from "../LoadingPage";

type Props = {
  parentId: string;
};

const CommentCollections = ({ parentId }: Props) => {
  const { comments, loading, error, setPage } = useGetComments(parentId);
  if (error) return <ErrorPage errorMessage={error} />;
  if (loading) return <LoadingPage />;
  return (
    <div className="w-full max-w-159 flex flex-col gap-5">
      {comments && comments.length > 0 ? (
        <>
          {comments.map((comment) => (
            <CommentCard key={comment._id} post={comment} isReply={false} />
          ))}
          
        </>
      ) : (
        <div className="p-3 rounded-lg bg-textGrayFade w-full max-w-159 flex justify-center item-center">
          No Comments
        </div>
      )}
    </div>
  );
};

export default CommentCollections;
