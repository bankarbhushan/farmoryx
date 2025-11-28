import React, {useState} from 'react'
import {NavLink} from 'react-router-dom'
import {
  FaBars,
  FaHome,
  FaFileInvoice,
  FaLeaf,
  FaUsers,
  FaUserTie,
  FaClipboardList,
  FaHandshake,
} from 'react-icons/fa'

const Sidebar = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex justify-between items-center p-4 bg-white shadow-sm fixed top-[73px] left-0 w-full z-50">
        <h1 className="text-xl font-semibold text-[#16C79A]">FarmoryX</h1>
        <FaBars
          size={26}
          className="cursor-pointer text-[#16C79A]"
          onClick={() => setOpen(!open)}
        />
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-[73px] left-0 
          ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          md:translate-x-0
          transition-transform duration-300
          w-[280px] h-[calc(100vh-73px)]
          bg-[#FAFAFB] border-r border-[#E6E9EA]
          p-4 overflow-y-auto z-40
        `}
      >
        <nav>
          <ul className="space-y-2">
            <MenuItem label="Welcome" to="/dashbord/greet" icon={<FaHandshake />} />
            <MenuItem label="Dashboard" to="/dashbord/dashboard" icon={<FaHome />} />
            <MenuItem label="Bill" to="/dashbord/bill" icon={<FaFileInvoice />} />
            <MenuItem
              label="Bill List"
              to="/dashbord/billlist"
              icon={<FaClipboardList />}
            />
            <MenuItem label="Farmer List" to="/dashbord/farmerlist" icon={<FaUsers />} />
            <MenuItem
              label="Merchant List"
              to="/dashbord/merchantlist"
              icon={<FaUserTie />}
            />
            <MenuItem label="Veg List" to="/dashbord/veglist" icon={<FaLeaf />} />
          </ul>
        </nav>
      </aside>

      {/* Dark background overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  )
}

const MenuItem = ({label, to, icon}) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({isActive}) =>
          `cursor-pointer px-4 py-2 rounded-md font-semibold flex items-center gap-3 
          transition-all duration-200
          ${
            isActive ? 'text-[#17CF91] bg-[#17CF911A]' : 'text-gray-700 hover:bg-gray-200'
          }`
        }
      >
        <span className="text-xl">{icon}</span>
        {label}
      </NavLink>
    </li>
  )
}

export default Sidebar
