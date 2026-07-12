import PostCollection from '@/app/components/feed/PostCollection'
import PostForm from '@/app/components/feed/PostForm'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div className='bg-mainBg container mx-auto flex flex-col justify-center items-center px-3 gap-8'>
      <PostForm />
      <PostCollection />
    </div>
  )
}

export default page