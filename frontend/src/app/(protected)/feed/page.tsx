import PostForm from '@/app/components/forms/PostForm'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div className='bg-mainBg container mx-auto flex justify-center px-3'>
      <PostForm />
    </div>
  )
}

export default page