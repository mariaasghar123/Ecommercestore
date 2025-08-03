import React from 'react'
import { Link } from 'react-router-dom'

export default function PageNotFound() {
  return (
    <div className='flex flex-col items-center justify-center h-screen text-center'>
      <img src="/media/images/Group 283.png" alt="" className=''/>
      <p className='font-bold text-6xl text-black'>Page not found</p>
      <p className='w-1/4 text-gray-600 mt-5'>The page you want to go is not currently available</p>
      <div className='flex gap-5'>
        <Link to="/">
      <button className='p-3 font-bold rounded bg-purple-700 text-white mt-5'>Go To Homepage</button>
        
        </Link>
      <button className='p-3 font-bold rounded bg-white text-white mt-5'>Back</button>

      </div>
      
    </div>
  )
}
