import React from 'react'

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-3 border-b bg-white">
      
      <div className="flex items-center gap-6">
        <h2 className="text-xl font-semibold">Trackly</h2>
        <ul className="flex gap-4">
          <li className="cursor-pointer hover:text-blue-500">Dashboard</li>
        </ul>
      </div>

      <div>
        <button className="px-4 py-1.5 border rounded-md hover:bg-gray-300 hover:cursor-pointer">
          Login
        </button>
      </div>

    </nav>
  );
}


export default Navbar
