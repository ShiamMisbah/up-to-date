import { Button } from '@/components/ui/button';
import { Post } from '@/lib/types';
import { getTimeAgo } from '@/lib/utils';
import { EllipsisVertical, MessageCircleMore, ThumbsDown, ThumbsUp } from 'lucide-react';
import React, { useState } from 'react'
import CommentForm from './CommentForm';
import CommentCard from './CommentCard';
import CommentCollections from './CommentCollections';
import ReactionComponent from './ReactionComponent';
import Image from 'next/image';

type Props = {
    post: Post
}

const PostCard = ({post}: Props) => {
  const [showComments, setShowComments] = useState(false)
  const handleShowComment = () => {
    setShowComments(!showComments)
  }
  const currentUser = JSON.parse(localStorage.getItem("userData")!);
  const myReaction = post.reactionList.find(
    (reaction) => reaction.userId === currentUser.id,
  );
  let currentReaction: "like" | "unlike" | "" = "";
  if (myReaction) currentReaction = myReaction.reaction
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
      {post.image && (
        <img
          src={post.image}
          alt="Post"
          className="mt-4 w-full rounded-lg object-cover"
        />
      )}
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
      <div className="flex justify-between items-center bg-fadeSkyBlue rounded-sm p-2 gap-15">
        <ReactionComponent myReact={myReaction?.reaction} parentId={post._id} />
        <Button
          onClick={handleShowComment}
          className="bg-transparent text-textGray hover:text-primary hover:bg-transparent flex gap-2.5 items-center"
        >
          <MessageCircleMore />
          <span className="hidden md:block">Comment</span>
        </Button>
      </div>
      <div>
        <CommentForm parentId={post._id} />
      </div>
      <div>
        <h3 className="text-xs text-textGray font-bold mb-2">View Comments</h3>
        {showComments && <CommentCollections parentId={post._id} />}
      </div>
    </div>
  );
}

export default PostCard