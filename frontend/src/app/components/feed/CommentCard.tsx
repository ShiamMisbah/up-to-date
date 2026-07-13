import { getTimeAgo, getTimeAgoShort } from '@/lib/utils';
import React, { useState } from 'react'
import CommentForm from './CommentForm';
import { Post } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { MessageCircleMore, ThumbsDown, ThumbsUp } from 'lucide-react';
import ReplyCollection from './ReplyCollection';
import ReactionComponent from './ReactionComponent';

type Props = {
  post: Post;
  isReply: boolean;
}

const CommentCard = ({post, isReply = false}: Props) => {
  const [showReplies, setShowReplies] = useState(false)
  const handleShowReply = () => {
    setShowReplies(!showReplies)
  }
  return (
    <div className="relative">
      <div className="bg-textGrayFade w-full px-3 py-5 rounded-lg flex flex-col gap-1">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <h4 className="text-sm font-bold">{post.userName}</h4>
          </div>
        </div>
        <div className="text-sm text-textGray">{post.mainText}</div>
      </div>
      {!isReply && (
        <div className="absolute md:max-w-[35%] flex gap-5 text-xs justify-end items-center bg-white rounded-full -translate-y-1/2 p-2 right-2 shadow-2xs">
          <div>
            {post.commentList.length}{" "}
            <span className="text-textGray">Replies</span>
          </div>
          <div>
            {post.reactionList.length}{" "}
            <span className="text-textGray">Reactions</span>
          </div>
        </div>
      )}
      <div className="flex my-2 justify-start items-center">
        <div className="flex">
          <ReactionComponent parentId={post._id} />
          <Button
            onClick={handleShowReply}
            className="bg-transparent text-textGray hover:text-primary hover:bg-transparent flex gap-2.5 items-center flex-1"
          >
            <MessageCircleMore />
            <span className="hidden md:block text-[12px]">Comment</span>
          </Button>
        </div>

        <div className="text-textGray">.{getTimeAgoShort(post.createdAt)}</div>
      </div>
      {post.parentId && (
        <div className="flex flex-col gap-5">
          {!isReply && (
            <div>
              <CommentForm parentId={post.parentId} commentId={post._id} />
            </div>
          )}

          <div>
            {!isReply && (
              <h3 className="text-xs text-textGray font-bold mb-2">
                View replies
              </h3>
            )}
            {showReplies && (
              <ReplyCollection parentId={post.parentId} commentId={post._id} />
            )}
          </div>
        </div>
      )}
      <hr className="my-6 border-t border-gray-300 dark:border-gray-700" />
    </div>
  );
}

export default CommentCard