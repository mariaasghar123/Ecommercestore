import React from "react";

export default function Nopage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <img src="/media/images/404.png.png" alt="" className="" />
      <p className="font-bold text-6xl text-black">That Page Cant Be Found</p>
      <p className="w-1/4 text-gray-600 mt-5">
        It looks like nothing was found at this location. Maybe try to search
        for what you are looking for?
      </p>
      <button className="p-3 font-bold rounded bg-purple-700 text-white mt-5">
        Go To Homepage
      </button>
    </div>
  );
}
