"use client"

import { useGetPosts } from '@/hooks/use-get-posts'
import React from 'react'
import PostCard from './PostCard'

type Props = {}

const PostCollection = (props: Props) => {
    const {error, loading, posts, setPage} = useGetPosts()
    // console.log(posts)

  return <div className="w-full max-w-159 flex flex-col gap-5 pb-30">
    {posts.length > 0 ? (
        posts.map((post) => <PostCard post={post} />)
    ) : (<div></div>)}
    
  </div>;
}

export default PostCollection