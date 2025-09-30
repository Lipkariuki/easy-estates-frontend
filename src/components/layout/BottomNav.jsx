import React from 'react'
import { NavLink } from 'react-router-dom'

const tabs = [
  { to: '/home', label: 'Home', icon: '🏠' },
  { to: '/properties', label: 'Properties', icon: '🏢' },
  { to: '/tenants', label: 'Tenants', icon: '👥' },
  { to: '/maintenance', label: 'Maintenance', icon: '🛠️' },
  { to: '/payments', label: 'Payments', icon: '💳' },
]

const BottomNav = () => (
  <nav className="sticky bottom-0 inset-x-0 bg-[#0a2342]/80 backdrop-blur border-t border-white/10">
    <div className="mx-auto flex max-w-4xl justify-around py-3 text-xs text-teal-100/70">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 px-2 transition ${
              isActive ? 'text-[#158f68]' : 'hover:text-[#158f68]'
            }`
          }
        >
          <span className="text-xl">{tab.icon}</span>
          {tab.label}
        </NavLink>
      ))}
    </div>
  </nav>
)

export default BottomNav
