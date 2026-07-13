import { Button } from '@/components/ui/button';
import { useCreateReaction } from '@/hooks/use-create-reaction';
import { ReactionType } from '@/lib/types';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import React from 'react'

type Props = {
    parentId: string;
}

const ReactionComponent = ({parentId}: Props) => {
    const  {error, handleReaction, loading} = useCreateReaction()

    const handleSubmit = (reaction: ReactionType) => {
        handleReaction(reaction, parentId)
    }
  return (
    <div className="flex">
      <Button
        onClick={() => handleSubmit(ReactionType.LIKE)}
        disabled={loading}
        className="bg-transparent text-textGray hover:text-primary hover:bg-transparent flex gap-2.5 items-center flex-1"
      >
        <ThumbsUp />
        <span className="hidden md:block">Like</span>
      </Button>
      <Button
        onClick={() => handleSubmit(ReactionType.UNLIKE)}
        disabled={loading}
        className="bg-transparent text-textGray hover:text-primary hover:bg-transparent flex gap-2.5 items-center flex-1"
      >
        <ThumbsDown />
        <span className="hidden md:block">Disike</span>
      </Button>
    </div>
  );
}

export default ReactionComponent