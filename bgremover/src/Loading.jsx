import React from 'react'
import "./index.css"

function Loading() {
  return (
    <>
    <div className='w-full h-full flex justify-center items-center flex-col gap-3'>
    <span class="loader"></span>
    <h1>Wait...</h1>
    </div>

    </>
  )
}

export default Loading