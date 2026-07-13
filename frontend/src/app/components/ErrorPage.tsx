import React from 'react'

type Props = {
    errorMessage: string
}

const ErrorPage = ({ errorMessage }: Props) => {
  return <div className='w-full p-3.5 text-md bg-white rounded-md'>{errorMessage}</div>;
};

export default ErrorPage