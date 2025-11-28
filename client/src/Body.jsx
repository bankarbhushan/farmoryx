import React from 'react'
import Sidebar from './components/layout/sidebar/Sidebar'
import {Outlet} from 'react-router-dom'

const Body = () => {
  return (
    <div className="flex w-full min-h-screen bg-white">
      <Sidebar />
      <main className="flex-1 bg-[#F8FAF8] p-6 min-h-screen ml-[280px]">
        <Outlet />
      </main>
    </div>
  )
}

export default Body
