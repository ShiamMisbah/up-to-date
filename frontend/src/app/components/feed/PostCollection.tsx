"use client"

import { useGetPosts } from '@/hooks/use-get-posts'
import React from 'react'
import PostCard from './PostCard'
import { Button } from '@/components/ui/button'

type Props = {}

const PostCollection = (props: Props) => {
    const {error, loading, hasMore, posts, setPage} = useGetPosts()

  return (
    <div className="w-full max-w-159 flex flex-col items-center gap-5 pb-30">
      {posts.length > 0 ? (
        posts.map((post) => <PostCard key={post._id} post={post} />)
      ) : (
        <div></div>
      )}
      <div>
        {hasMore && (
          <Button
            disabled={loading}
            onClick={() => setPage((prev) => prev + 1)}
            className="self-center"
          >
            {loading ? "Loading..." : "Load More"}
          </Button>
        )}
      </div>
    </div>
  );
}

export default PostCollection