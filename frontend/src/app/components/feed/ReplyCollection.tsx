import { useGetReplies } from '@/hooks/use-get-reply';
import React from 'react'
import ErrorPage from '../ErrorPage';
import LoadingPage from '../LoadingPage';
import CommentCard from './CommentCard';

type Props = {
  parentId: string;
  commentId: string
};

const ReplyCollection = ({ parentId, commentId }: Props) => {
  const { replies, loading, error } = useGetReplies(parentId, commentId);
  if (error) return <ErrorPage errorMessage={error} />;
  if (loading) return <LoadingPage />;
  return (
    <div className="w-full max-w-159 flex flex-col gap-5">
      {replies && replies.length > 0 ? (
        replies.map((reply) => <CommentCard key={reply._id} post={reply} isReply={true} />)
      ) : (
        <div className="p-3 rounded-lg bg-textGrayFade w-full max-w-159 flex justify-center item-center">
          No Comments
        </div>
      )}
    </div>
  );
};

export default ReplyCollection