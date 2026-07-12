import { Button } from '@/components/ui/button';
import { Post } from '@/lib/types';
import { getTimeAgo } from '@/lib/utils';
import { EllipsisVertical, MessageCircleMore, ThumbsDown, ThumbsUp } from 'lucide-react';
import React from 'react'
import CommentForm from './CommentForm';

type Props = {
    post: Post
}

const PostCard = ({post}: Props) => {
    console.log(post)
  return (
    <div className="bg-white w-full p-6 rounded-sm flex flex-col gap-5">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h4 className="text-[16px]">{post.userName}</h4>
          <h5 className="text-sm text-textGray">
            <span>{getTimeAgo(post.createdAt)}</span> .{" "}
            <span>{post.privacyStatus}</span>{" "}
          </h5>
        </div>
        <Button className="h-12 w-12 bg-transparent text-textGray hover:bg-transparent hover:text-primary">
          <EllipsisVertical size={60} />
        </Button>
      </div>
      <div className="text-sm">{post.mainText}</div>
      <div className="flex gap-5 text-xs justify-end items-center">
        <div>
          {post.commentList.length}{" "}
          <span className="text-textGray">Comments</span>
        </div>
        <div>
          {post.reactionList.length}{" "}
          <span className="text-textGray">Reactions</span>
        </div>
      </div>
      <div className="flex justify-evenly items-center bg-fadeSkyBlue rounded-sm p-2 gap-15">
        <Button className="bg-transparent text-textGray hover:text-primary hover:bg-transparent flex gap-2.5 items-center flex-1">
          <ThumbsUp />
          <span className="hidden md:block">Like</span>
        </Button>
        <Button className="bg-transparent text-textGray hover:text-primary hover:bg-transparent flex gap-2.5 items-center flex-1">
          <ThumbsDown />
          <span className="hidden md:block">Disike</span>
        </Button>
        <Button className="bg-transparent text-textGray hover:text-primary hover:bg-transparent flex gap-2.5 items-center flex-1">
          <MessageCircleMore />
          <span className="hidden md:block">Comment</span>
        </Button>
      </div>
      <div>
        <CommentForm parentId={post._id} />
      </div>
      <div>Comment View</div>
    </div>
  );
}

export default PostCard