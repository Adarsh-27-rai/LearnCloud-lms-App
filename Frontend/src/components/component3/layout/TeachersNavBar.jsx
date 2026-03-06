import React from 'react'

const TeachersNavBar = () => {
  return (
    <>
      <div className="sticky top-0 z-20 flex justify-between items-center px-8 h-16 bg-white border-b border-sky-100/80 shadow-sm">
        <h1 className="text-base font-black text-slate-800" style={{ fontFamily: "'Georgia', serif" }}>
          DashBoard
        </h1>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-linear-to-br from-sky-500 to-teal-400 flex items-center justify-center text-white text-xs font-black shadow-md shadow-sky-300">
            MS
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-slate-700 leading-tight">Mr. Smith</p>
            <p className="text-xs text-gray-400">Mathematics Dept.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default TeachersNavBar
