import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

const page = async (props: Props) => {
  const cookie = await cookies()
  const token = cookie.get("access_token");
  console.log(token?.value);
  if (token) {
    redirect ("/feed")
  } else {
    redirect("/login")
  }

}

export default page
