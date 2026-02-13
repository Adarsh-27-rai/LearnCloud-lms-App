import React from 'react'

const sidebar = () => {
  return (
    <div>
      <div className="w-[20vw] h-screen bg-blue-950 shadow-xl p-6 hidden md:block relative">
        <h2 className="text-2xl font-bold mb-8 text-slate-200">Learn<span className="text-2xl font-bold mb-8 text-[rgb(124,209,255)]">Sphere</span></h2>
        <nav className="space-y-4">
          <button className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition w-full text-left">📊 Dashboard</button>
          <button className="px-4 py-2 rounded-xl hover:bg-blue-200/50 hover:bg-opacity-50 transition w-full text-left bg-transparent text-white">📚 Courses</button>
          <button className="px-4 py-2 rounded-xl hover:bg-blue-200/50 hover:bg-opacity-50 transition w-full text-left bg-transparent text-white">📝 Time Table</button>
          <button className="px-4 py-2 rounded-xl hover:bg-blue-200/50 hover:bg-opacity-50 transition w-full text-left bg-transparent text-white">⚙️ Queries</button>
        </nav>
        <button className="px-4 transition rounded-xl w-52 py-2 mt-10 bg-red-500 hover:bg-red-600 absolute bottom-8 text-white text-lg cursor-pointer">Logout</button>
      </div>
    </div>
  )
}

export default sidebar
