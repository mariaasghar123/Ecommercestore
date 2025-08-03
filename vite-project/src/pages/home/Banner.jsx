import React from 'react'

export default function Banner() {
  return (
    <div className="relative bg-orange-50 h-20 w-[85rem] overflow-hidden mx-auto">
  {/* Background content */}
  <div className="absolute right-0 translate-x-10 flex justify-center items-center opacity-90 pl-10">
    <p className="text-orange-400 text-8xl opacity-30 relative -translate-y-6 font-bold inset-0 pb-5">% 50</p>
    <img src="/media/images/promo.png.png" alt="" className=" h-auto ml-4" />
  </div>

  {/* Foreground content goes here */}
  <div className="relative z-10 mt-3  pl-5 h-full">
    <p className="text-xl font-bold text-orange-700">In store or online your health & safety is our top priority</p>
    <p className="text-sm text-gray-500">The only supermarket that makes your life easier, makes you enjoy life and makes it better</p>

  </div>
</div>
  )
}
