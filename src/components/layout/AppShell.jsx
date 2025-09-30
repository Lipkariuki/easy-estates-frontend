import React from 'react'
import { Outlet } from 'react-router-dom'
import BottomNav from './BottomNav'

const AppShell = () => (
  <div className="min-h-screen flex flex-col">
    <div className="flex-1">
      <Outlet />
    </div>
    <BottomNav />
  </div>
)

export default AppShell
